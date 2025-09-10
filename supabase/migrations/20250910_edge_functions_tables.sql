-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_analytics table
CREATE TABLE IF NOT EXISTS chat_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_text TEXT,
  response_text TEXT,
  response_time_ms INTEGER,
  user_id TEXT,
  session_id TEXT,
  client_ip TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_created_at ON chat_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_session_id ON chat_analytics(session_id);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_submissions
CREATE POLICY "Enable insert for all users" ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read for service role" ON contact_submissions
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Create policies for chat_analytics
CREATE POLICY "Enable insert for all users" ON chat_analytics
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read for service role" ON chat_analytics
  FOR SELECT
  USING (auth.role() = 'service_role');
