import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function applyMigration() {
  try {
    console.log('🔧 Applying migration: Add created_by_id to tasks...\n');

    // 1. Skip UNDER_REVIEW enum (requires superuser permissions)
    console.log('ℹ️  Skipping UNDER_REVIEW enum (will work in code only)');

    // 2. Add created_by_id column
    await prisma.$executeRawUnsafe(`
      ALTER TABLE tasks ADD COLUMN IF NOT EXISTS created_by_id VARCHAR(255);
    `);
    console.log('✅ Added created_by_id column to tasks table');

    // 3. Add foreign key constraint
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE tasks
          ADD CONSTRAINT tasks_created_by_fkey
          FOREIGN KEY (created_by_id)
          REFERENCES users(id)
          ON DELETE SET NULL;
      `);
      console.log('✅ Added foreign key constraint');
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Foreign key constraint already exists');
      } else {
        throw error;
      }
    }

    // 4. Update existing tasks to set created_by_id to process owner
    const result = await prisma.$executeRawUnsafe(`
      UPDATE tasks
      SET created_by_id = (
        SELECT user_id
        FROM processes
        WHERE processes.id = tasks.process_id
      )
      WHERE created_by_id IS NULL;
    `);
    console.log(`✅ Updated ${result} existing tasks with created_by_id`);

    // 5. Add index
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS tasks_created_by_id_idx ON tasks(created_by_id);
    `);
    console.log('✅ Added index on created_by_id');

    // 6. Verify migration
    const tasksWithAuthor = await prisma.task.findMany({
      where: {
        createdById: { not: null }
      },
      take: 5,
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    console.log('\n📊 Sample tasks with author:');
    tasksWithAuthor.forEach(task => {
      console.log(`  - "${task.title}" created by ${task.createdBy?.name || task.createdBy?.email}`);
    });

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Error applying migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

applyMigration();
