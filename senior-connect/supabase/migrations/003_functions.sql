-- Database functions for Senior Connect

-- Function to search seniors with full-text search
CREATE OR REPLACE FUNCTION search_seniors(
  search_query TEXT DEFAULT NULL,
  filter_sektorer sektor[] DEFAULT NULL,
  filter_postnummer TEXT DEFAULT NULL,
  filter_min_timer INT DEFAULT NULL,
  filter_max_timer INT DEFAULT NULL,
  sort_by TEXT DEFAULT 'relevance',
  page_size INT DEFAULT 20,
  page_offset INT DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  navn TEXT,
  bio TEXT,
  postnummer TEXT,
  kommune TEXT,
  sektorer sektor[],
  kompetanser TEXT[],
  tilgjengelig_fra DATE,
  onsket_timer_per_uke INT,
  er_aktiv BOOLEAN,
  godkjent BOOLEAN,
  created_at TIMESTAMPTZ,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.navn,
    s.bio,
    s.postnummer,
    s.kommune,
    s.sektorer,
    s.kompetanser,
    s.tilgjengelig_fra,
    s.onsket_timer_per_uke,
    s.er_aktiv,
    s.godkjent,
    s.created_at,
    CASE
      WHEN search_query IS NOT NULL AND search_query != ''
      THEN ts_rank(s.search_vector, plainto_tsquery('norwegian', search_query))
      ELSE 0.0
    END::REAL AS rank
  FROM seniors s
  WHERE s.er_aktiv = true
    AND s.godkjent = true
    AND (search_query IS NULL OR search_query = '' OR s.search_vector @@ plainto_tsquery('norwegian', search_query))
    AND (filter_sektorer IS NULL OR s.sektorer && filter_sektorer)
    AND (filter_postnummer IS NULL OR s.postnummer LIKE filter_postnummer || '%')
    AND (filter_min_timer IS NULL OR s.onsket_timer_per_uke >= filter_min_timer)
    AND (filter_max_timer IS NULL OR s.onsket_timer_per_uke <= filter_max_timer)
  ORDER BY
    CASE WHEN sort_by = 'relevance' AND search_query IS NOT NULL AND search_query != ''
      THEN ts_rank(s.search_vector, plainto_tsquery('norwegian', search_query))
      ELSE 0
    END DESC,
    CASE WHEN sort_by = 'newest' THEN extract(epoch FROM s.created_at) ELSE 0 END DESC,
    CASE WHEN sort_by = 'availability' THEN s.onsket_timer_per_uke ELSE 0 END DESC,
    s.created_at DESC
  LIMIT page_size
  OFFSET page_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to count search results
CREATE OR REPLACE FUNCTION count_search_seniors(
  search_query TEXT DEFAULT NULL,
  filter_sektorer sektor[] DEFAULT NULL,
  filter_postnummer TEXT DEFAULT NULL,
  filter_min_timer INT DEFAULT NULL,
  filter_max_timer INT DEFAULT NULL
)
RETURNS BIGINT AS $$
BEGIN
  RETURN (
    SELECT count(*)
    FROM seniors s
    WHERE s.er_aktiv = true
      AND s.godkjent = true
      AND (search_query IS NULL OR search_query = '' OR s.search_vector @@ plainto_tsquery('norwegian', search_query))
      AND (filter_sektorer IS NULL OR s.sektorer && filter_sektorer)
      AND (filter_postnummer IS NULL OR s.postnummer LIKE filter_postnummer || '%')
      AND (filter_min_timer IS NULL OR s.onsket_timer_per_uke >= filter_min_timer)
      AND (filter_max_timer IS NULL OR s.onsket_timer_per_uke <= filter_max_timer)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a match (with contact limit check)
CREATE OR REPLACE FUNCTION create_match(
  p_employer_id UUID,
  p_senior_id UUID,
  p_melding TEXT
)
RETURNS UUID AS $$
DECLARE
  v_match_id UUID;
  v_kontakter_brukt INT;
  v_kontakter_maks INT;
  v_sub_status subscription_status;
BEGIN
  -- Check employer subscription and contact limits
  SELECT kontakter_brukt_denne_mnd, kontakter_maks_per_mnd, subscription_status
  INTO v_kontakter_brukt, v_kontakter_maks, v_sub_status
  FROM employers WHERE id = p_employer_id;

  IF v_sub_status != 'active' THEN
    RAISE EXCEPTION 'Ingen aktivt abonnement';
  END IF;

  IF v_kontakter_brukt >= v_kontakter_maks THEN
    RAISE EXCEPTION 'Kontaktgrense nådd for denne måneden';
  END IF;

  -- Create the match
  INSERT INTO matches (employer_id, senior_id, melding)
  VALUES (p_employer_id, p_senior_id, p_melding)
  RETURNING id INTO v_match_id;

  -- Increment contact counter
  UPDATE employers SET kontakter_brukt_denne_mnd = kontakter_brukt_denne_mnd + 1
  WHERE id = p_employer_id;

  RETURN v_match_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to expire old matches (called by cron)
CREATE OR REPLACE FUNCTION expire_old_matches()
RETURNS INT AS $$
DECLARE
  v_count INT;
BEGIN
  UPDATE matches
  SET status = 'expired', responded_at = now()
  WHERE status = 'sent'
    AND created_at < now() - INTERVAL '14 days';

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin KPI function
CREATE OR REPLACE FUNCTION get_admin_kpis()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'total_seniors', (SELECT count(*) FROM seniors),
    'active_seniors', (SELECT count(*) FROM seniors WHERE er_aktiv = true AND godkjent = true),
    'pending_seniors', (SELECT count(*) FROM seniors WHERE godkjent = false),
    'total_employers', (SELECT count(*) FROM employers),
    'active_subscriptions', (SELECT count(*) FROM employers WHERE subscription_status = 'active'),
    'matches_this_week', (SELECT count(*) FROM matches WHERE created_at > now() - INTERVAL '7 days'),
    'matches_this_month', (SELECT count(*) FROM matches WHERE created_at > now() - INTERVAL '30 days'),
    'accepted_matches', (SELECT count(*) FROM matches WHERE status = 'accepted'),
    'match_rate', (
      SELECT CASE WHEN count(*) > 0
        THEN round(count(*) FILTER (WHERE status = 'accepted')::numeric / count(*)::numeric * 100, 1)
        ELSE 0
      END FROM matches
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
