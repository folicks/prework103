import { createClient } from '@supabase/supabase-js';

const URL = 'https://omzehkpftacrseszsubn.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9temVoa3BmdGFjcnNlc3pzdWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NzUzNTMsImV4cCI6MjA3MTU1MTM1M30.oRCu58GIyUZOMjj7zS_zYGUgWEQaL-2dXuiUguDBXOE';
export const supabase = createClient(URL, API_KEY);
