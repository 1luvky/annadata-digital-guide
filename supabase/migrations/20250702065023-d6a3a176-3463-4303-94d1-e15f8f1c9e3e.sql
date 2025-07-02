
-- Create users table for basic user management
CREATE TABLE public.users (
  user_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone_number TEXT UNIQUE,
  preferred_language TEXT DEFAULT 'English',
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interaction_logs table for analytics and debugging
CREATE TABLE public.interaction_logs (
  interaction_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(user_id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'disease_query', 'market_query', 'scheme_query', 'general_chat'
  input_method TEXT NOT NULL, -- 'text', 'voice', 'image'
  input_content TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create media_files table for image/audio upload history
CREATE TABLE public.media_files (
  media_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(user_id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  uploaded_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  type TEXT NOT NULL CHECK (type IN ('image', 'audio'))
);

-- Add Row Level Security (RLS) to protect user data
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interaction_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- Create policies for users table (users can only see their own data)
CREATE POLICY "Users can view their own profile" 
  ON public.users 
  FOR SELECT 
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Users can update their own profile" 
  ON public.users 
  FOR UPDATE 
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Users can insert their own profile" 
  ON public.users 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid()::uuid);

-- Create policies for interaction_logs table
CREATE POLICY "Users can view their own interaction logs" 
  ON public.interaction_logs 
  FOR SELECT 
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Users can insert their own interaction logs" 
  ON public.interaction_logs 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid()::uuid);

-- Create policies for media_files table
CREATE POLICY "Users can view their own media files" 
  ON public.media_files 
  FOR SELECT 
  USING (user_id = auth.uid()::uuid);

CREATE POLICY "Users can insert their own media files" 
  ON public.media_files 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid()::uuid);

CREATE POLICY "Users can delete their own media files" 
  ON public.media_files 
  FOR DELETE 
  USING (user_id = auth.uid()::uuid);

-- Create indexes for better performance
CREATE INDEX idx_interaction_logs_user_id ON public.interaction_logs(user_id);
CREATE INDEX idx_interaction_logs_timestamp ON public.interaction_logs(timestamp);
CREATE INDEX idx_media_files_user_id ON public.media_files(user_id);
CREATE INDEX idx_users_phone_number ON public.users(phone_number);
