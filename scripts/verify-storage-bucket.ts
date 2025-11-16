/**
 * Script to verify and create Supabase Storage bucket if needed
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function verifyAndCreateBucket() {
  console.log('🔍 Checking Supabase Storage bucket "uploads"...\n');

  try {
    // List all buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('❌ Error listing buckets:', listError.message);
      process.exit(1);
    }

    // Check if 'uploads' bucket exists
    const uploadsBucket = buckets?.find((bucket) => bucket.name === 'uploads');

    if (uploadsBucket) {
      console.log('✅ Bucket "uploads" already exists');
      console.log('   ID:', uploadsBucket.id);
      console.log('   Public:', uploadsBucket.public);
      console.log('   Created:', uploadsBucket.created_at);
      console.log('\n📊 Bucket configuration:');
      console.log('   - File size limit:', uploadsBucket.file_size_limit ? `${uploadsBucket.file_size_limit} bytes (${(uploadsBucket.file_size_limit / 1024 / 1024).toFixed(2)} MB)` : 'Not set');
      console.log('   - Allowed MIME types:', uploadsBucket.allowed_mime_types || 'All types allowed');
      return;
    }

    // Bucket doesn't exist, try to create it
    console.log('⚠️  Bucket "uploads" does not exist. Creating...\n');

    const { data: newBucket, error: createError } = await supabase.storage.createBucket('uploads', {
      public: false,
      fileSizeLimit: 10 * 1024 * 1024, // 10MB
      allowedMimeTypes: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/png',
        'image/jpeg',
      ],
    });

    if (createError) {
      console.error('❌ Error creating bucket:', createError.message);
      console.log('\n📝 Please create the bucket manually in Supabase Dashboard:');
      console.log('   1. Go to: https://supabase.com/dashboard/project/[project-id]/storage/buckets');
      console.log('   2. Click "New bucket"');
      console.log('   3. Name: uploads');
      console.log('   4. Public: false');
      console.log('   5. File size limit: 10485760 (10MB)');
      console.log('   6. Allowed MIME types: PDF, DOCX, PNG, JPG');
      process.exit(1);
    }

    console.log('✅ Bucket "uploads" created successfully!');
    console.log('   ID:', newBucket.name);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

async function testUploadAccess() {
  console.log('\n🧪 Testing upload access...\n');

  try {
    // Try to list files in the bucket (should return empty or files)
    const { data, error } = await supabase.storage.from('uploads').list();

    if (error) {
      console.error('❌ Error accessing bucket:', error.message);
      return false;
    }

    console.log('✅ Can access uploads bucket');
    console.log(`   Files in bucket: ${data?.length || 0}`);
    return true;
  } catch (error) {
    console.error('❌ Unexpected error testing access:', error);
    return false;
  }
}

async function main() {
  console.log('🚀 Supabase Storage Bucket Verification\n');
  console.log('   Project:', SUPABASE_URL);
  console.log('');

  await verifyAndCreateBucket();
  await testUploadAccess();

  console.log('\n✨ Verification complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. Apply storage policies migration: npx tsx scripts/apply-supabase-migrations.ts 006_setup_storage_bucket.sql');
  console.log('   2. Test file upload in the application');
}

main();
