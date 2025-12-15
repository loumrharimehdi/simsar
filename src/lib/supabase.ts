import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = 'https://clfbjezwpjjfuervbzit.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZmJqZXp3cGpqZnVlcnZieml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MTI2MjksImV4cCI6MjA4MDA4ODYyOX0.CGuTWu3FQMQPBpF5rqe67JJD1ZSgFwbdqEP2Mu7Xfew'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
