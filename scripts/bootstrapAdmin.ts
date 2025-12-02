import { createClient } from '@supabase/supabase-js';

async function bootstrapAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (!supabaseUrl || !supabaseServiceKey || !adminEmail || !adminPassword) {
    console.error('Missing required environment variables');
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE, ADMIN_EMAIL, ADMIN_INITIAL_PASSWORD');
    process.exit(1);
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    console.log(`Bootstrapping admin user: ${adminEmail}`);

    // Check if user already exists
    const { data: users } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = users.users.find(u => u.email === adminEmail);

    let userId = existingUser?.id;

    if (!userId) {
      console.log('Creating new admin user...');
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: { role: 'admin' }
      });

      if (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
      }

      userId = data.user.id;
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Upsert profile with admin privileges
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        email: adminEmail,
        full_name: 'Admin',
        is_admin: true
      });

    if (profileError) {
      console.error('Error updating profile:', profileError);
      process.exit(1);
    }

    console.log('✅ Admin bootstrap completed successfully!');
    console.log(`Admin user: ${adminEmail}`);
    console.log('⚠️  IMPORTANT: Please rotate the ADMIN_INITIAL_PASSWORD and remove this script after use.');

  } catch (error) {
    console.error('Bootstrap failed:', error);
    process.exit(1);
  }
}

bootstrapAdmin();