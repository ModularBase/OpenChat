import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://iaqwthuvrdmkchnmjehe.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhcXd0aHV2cmRta2Nobm1qZWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MzgxMjEsImV4cCI6MjA0MjMxNDEyMX0.CD4rpN4vHwbiy8B0iSH55mNMEKBvVMpXwGu_AF7Evxw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
