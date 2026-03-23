-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE seniors ENABLE ROW LEVEL SECURITY;
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_views ENABLE ROW LEVEL SECURITY;

-- Profiles: users see own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Seniors: own profile full access, employers see active+approved
CREATE POLICY "Seniors manage own profile"
  ON seniors FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Employers can view active approved seniors"
  ON seniors FOR SELECT USING (
    er_aktiv = true AND godkjent = true
    AND EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('employer', 'admin')
    )
  );
CREATE POLICY "Admins full access to seniors"
  ON seniors FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Employers: own profile full access
CREATE POLICY "Employers manage own profile"
  ON employers FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Admins full access to employers"
  ON employers FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Matches: involved parties only
CREATE POLICY "Employers can create matches"
  ON matches FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM employers WHERE id = employer_id AND user_id = auth.uid())
  );
CREATE POLICY "Involved parties can view matches"
  ON matches FOR SELECT USING (
    EXISTS (SELECT 1 FROM employers WHERE id = employer_id AND user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM seniors WHERE id = senior_id AND user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Seniors can respond to matches"
  ON matches FOR UPDATE USING (
    EXISTS (SELECT 1 FROM seniors WHERE id = senior_id AND user_id = auth.uid())
  ) WITH CHECK (
    status IN ('accepted', 'rejected')
  );

-- Profile views: employers log, admins read
CREATE POLICY "Employers can log views"
  ON profile_views FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM employers WHERE id = employer_id AND user_id = auth.uid())
  );
CREATE POLICY "Admins can view all"
  ON profile_views FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
