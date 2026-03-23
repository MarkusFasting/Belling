-- Senior Connect MVP - Initial Schema
-- Enums
CREATE TYPE user_role AS ENUM ('senior', 'employer', 'admin');
CREATE TYPE match_status AS ENUM ('sent', 'accepted', 'rejected', 'expired');
CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled', 'none');
CREATE TYPE sektor AS ENUM (
  'helse', 'bygg_anlegg', 'it_teknologi', 'utdanning',
  'offentlig_admin', 'finans', 'transport', 'industri',
  'handel', 'annet'
);

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seniors
CREATE TABLE seniors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  navn TEXT NOT NULL,
  telefon TEXT,
  epost TEXT NOT NULL,
  postnummer TEXT NOT NULL,
  kommune TEXT,
  bio TEXT,
  sektorer sektor[] NOT NULL DEFAULT '{}',
  kompetanser TEXT[] NOT NULL DEFAULT '{}',
  tilgjengelig_fra DATE,
  onsket_timer_per_uke INT,
  cv_url TEXT,
  er_aktiv BOOLEAN DEFAULT true,
  godkjent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('norwegian', coalesce(navn, '')), 'A') ||
    setweight(to_tsvector('norwegian', coalesce(bio, '')), 'B') ||
    setweight(to_tsvector('norwegian', coalesce(array_to_string(kompetanser, ' '), '')), 'A')
  ) STORED
);

CREATE INDEX idx_seniors_search ON seniors USING GIN (search_vector);
CREATE INDEX idx_seniors_sektorer ON seniors USING GIN (sektorer);
CREATE INDEX idx_seniors_postnummer ON seniors (postnummer);
CREATE INDEX idx_seniors_aktiv ON seniors (er_aktiv) WHERE er_aktiv = true;

-- Employers
CREATE TABLE employers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  org_nr TEXT NOT NULL UNIQUE,
  firmanavn TEXT NOT NULL,
  kontaktperson TEXT NOT NULL,
  epost TEXT NOT NULL,
  telefon TEXT,
  postnummer TEXT,
  sektor sektor,
  antall_ansatte INT,
  stripe_customer_id TEXT,
  subscription_status subscription_status DEFAULT 'none',
  subscription_id TEXT,
  kontakter_brukt_denne_mnd INT DEFAULT 0,
  kontakter_maks_per_mnd INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_employers_org_nr ON employers (org_nr);
CREATE INDEX idx_employers_stripe ON employers (stripe_customer_id);

-- Matches (core transaction)
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
  senior_id UUID NOT NULL REFERENCES seniors(id) ON DELETE CASCADE,
  status match_status DEFAULT 'sent',
  melding TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  responded_at TIMESTAMPTZ,
  UNIQUE(employer_id, senior_id)
);

CREATE INDEX idx_matches_employer ON matches (employer_id);
CREATE INDEX idx_matches_senior ON matches (senior_id);
CREATE INDEX idx_matches_status ON matches (status);

-- Profile views (analytics)
CREATE TABLE profile_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
  senior_id UUID NOT NULL REFERENCES seniors(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT now()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER seniors_updated_at BEFORE UPDATE ON seniors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER employers_updated_at BEFORE UPDATE ON employers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Monthly contact counter reset function
CREATE OR REPLACE FUNCTION reset_monthly_contacts()
RETURNS void AS $$
BEGIN
  UPDATE employers SET kontakter_brukt_denne_mnd = 0;
END;
$$ LANGUAGE plpgsql;
