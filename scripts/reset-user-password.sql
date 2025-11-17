-- Reset password for user iamrafaelraio@gmail.com
-- Execute this in Supabase SQL Editor

-- Option 1: Update password directly (hash will be generated automatically)
-- Replace 'YOUR_NEW_PASSWORD' with the actual password you want

UPDATE auth.users
SET 
  encrypted_password = crypt('YOUR_NEW_PASSWORD', gen_salt('bf')),
  updated_at = now()
WHERE email = 'iamrafaelraio@gmail.com';

-- Verify the update
SELECT id, email, updated_at, last_sign_in_at
FROM auth.users
WHERE email = 'iamrafaelraio@gmail.com';
