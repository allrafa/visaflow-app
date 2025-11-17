/**
 * Script to apply the created_by_id migration to tasks table
 * This adds author tracking to tasks
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function applyMigration() {
  console.log('🚀 Applying created_by_id migration to tasks table...\n');

  try {
    // Step 1: Add the column
    console.log('1️⃣  Adding created_by_id column to tasks table...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE tasks ADD COLUMN IF NOT EXISTS created_by_id VARCHAR(255);
    `);
    console.log('✅ Column added successfully\n');

    // Step 2: Add foreign key constraint
    console.log('2️⃣  Adding foreign key constraint...');
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'tasks_created_by_fkey'
        ) THEN
          ALTER TABLE tasks
            ADD CONSTRAINT tasks_created_by_fkey
            FOREIGN KEY (created_by_id)
            REFERENCES users(id)
            ON DELETE SET NULL;
        END IF;
      END $$;
    `);
    console.log('✅ Foreign key constraint added\n');

    // Step 3: Populate existing tasks with process owner
    console.log('3️⃣  Populating existing tasks with process owner...');
    const result = await prisma.$executeRawUnsafe(`
      UPDATE tasks
      SET created_by_id = (
        SELECT user_id FROM processes WHERE processes.id = tasks.process_id
      )
      WHERE created_by_id IS NULL;
    `);
    console.log(`✅ Updated ${result} existing tasks\n`);

    // Step 4: Add index for performance
    console.log('4️⃣  Creating index on created_by_id...');
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS tasks_created_by_id_idx ON tasks(created_by_id);
    `);
    console.log('✅ Index created successfully\n');

    // Step 5: Verify the migration
    console.log('5️⃣  Verifying migration...');
    const verification = await prisma.$queryRawUnsafe<any[]>(`
      SELECT
        column_name,
        data_type,
        is_nullable
      FROM information_schema.columns
      WHERE table_name = 'tasks'
      AND column_name = 'created_by_id';
    `);

    if (verification.length > 0) {
      console.log('✅ Migration verified successfully');
      console.log('📊 Column details:', verification[0]);
    } else {
      console.log('❌ Column not found - migration may have failed');
    }

    // Step 6: Check how many tasks now have authors
    const stats = await prisma.$queryRawUnsafe<any[]>(`
      SELECT
        COUNT(*) as total_tasks,
        COUNT(created_by_id) as tasks_with_author,
        COUNT(*) - COUNT(created_by_id) as tasks_without_author
      FROM tasks;
    `);

    console.log('\n📊 Migration Statistics:');
    console.log(`   Total tasks: ${stats[0].total_tasks}`);
    console.log(`   Tasks with author: ${stats[0].tasks_with_author}`);
    console.log(`   Tasks without author: ${stats[0].tasks_without_author}`);

    console.log('\n✅ Migration completed successfully!');
    console.log('\n🎉 You can now use the author field in tasks!');

  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);

    // Check if the error is because column already exists
    if (error.message.includes('already exists')) {
      console.log('\n💡 Column may already exist. Verifying...');

      const verification = await prisma.$queryRawUnsafe<any[]>(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'tasks'
        AND column_name = 'created_by_id';
      `);

      if (verification.length > 0) {
        console.log('✅ Column exists! Migration may have been applied previously.');
      }
    } else {
      throw error;
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
applyMigration()
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
