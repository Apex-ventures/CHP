import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kuwtdnxhrzybbwklahxa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1d3Rkbnhocnp5YmJ3a2xhaHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMTY5NDMsImV4cCI6MjA1Nzg5Mjk0M30.HWygPK9sXBDWyVy92EdkmH0cCvKr0fHKHH9GiTroGkA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
