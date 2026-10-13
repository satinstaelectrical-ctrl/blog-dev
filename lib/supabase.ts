import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xmygpybejzwnspcodwss.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhteWdweWJlanp3bnNwY29kd3NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NDY5NjIsImV4cCI6MjEwNzQyMjk2Mn0.VyWTI4fk3XWwLYcNxSHcq5LGAoPEoXtOynklmCriu9Y';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhteWdweWJlanp3bnNwY29kd3NzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTg0Njk2MiwiZXhwIjoyMTA3NDIyOTYyfQ.-_PBWQsLzJ3IWGRgHgrGb7wsgd4mO9dmVjuv6zovDXc';

// Client public pour les interactions côté lecteur et navigation publique
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client d'administration côté serveur avec privilèges service_role
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
