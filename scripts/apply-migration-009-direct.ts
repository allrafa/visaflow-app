/**
 * Script para aplicar migration 009 - Activities Table (Direct SQL)
 * Uso: npx tsx scripts/apply-migration-009-direct.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function applyMigration() {
  console.log('🚀 Aplicando Migration 009: Activities Table\n');

  try {
    // 1. Create enum
    console.log('1/7: Criando enum activity_action...');
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        CREATE TYPE activity_action AS ENUM (
          'PROCESS_CREATED',
          'PROCESS_UPDATED',
          'PROCESS_DELETED',
          'TASK_CREATED',
          'TASK_UPDATED',
          'TASK_COMPLETED',
          'TASK_DELETED',
          'CRITERIA_CREATED',
          'CRITERIA_UPDATED',
          'CRITERIA_VALIDATED',
          'CRITERIA_DELETED',
          'LETTER_CREATED',
          'LETTER_UPDATED',
          'LETTER_SENT',
          'LETTER_SIGNED',
          'LETTER_DELETED',
          'FILE_UPLOADED',
          'FILE_DELETED',
          'COLLABORATOR_INVITED',
          'COLLABORATOR_ACCEPTED',
          'COLLABORATOR_REMOVED'
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log('✅ Enum criado\n');

    // 2. Create table
    console.log('2/7: Criando tabela activities...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS activities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        process_id UUID NOT NULL REFERENCES processes(id) ON DELETE CASCADE,
        user_id UUID NOT NULL,
        user_name TEXT,
        action activity_action NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id UUID,
        entity_name TEXT,
        description TEXT NOT NULL,
        metadata JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    console.log('✅ Tabela criada\n');

    // 3. Create indexes
    console.log('3/7: Criando indexes...');
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_activities_process_created
        ON activities(process_id, created_at DESC)
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_activities_user_created
        ON activities(user_id, created_at DESC)
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_activities_action
        ON activities(action)
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_activities_entity
        ON activities(entity_type, entity_id)
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_activities_metadata
        ON activities USING GIN (metadata)
    `);
    console.log('✅ Indexes criados\n');

    // 4. Enable RLS
    console.log('4/7: Habilitando RLS...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE activities ENABLE ROW LEVEL SECURITY
    `);
    console.log('✅ RLS habilitado\n');

    // 5. Create policies
    console.log('5/7: Criando RLS policies...');

    // Drop existing policies if they exist
    await prisma.$executeRawUnsafe(`
      DROP POLICY IF EXISTS "Users can view activities of their processes" ON activities
    `);
    await prisma.$executeRawUnsafe(`
      DROP POLICY IF EXISTS "Service can insert activities" ON activities
    `);

    // Create policies
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can view activities of their processes"
        ON activities
        FOR SELECT
        USING (
          process_id IN (
            SELECT id FROM processes WHERE user_id = auth.uid()
            UNION
            SELECT process_id FROM collaborators WHERE user_id::text = auth.uid()::text
          )
        )
    `);
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Service can insert activities"
        ON activities
        FOR INSERT
        WITH CHECK (true)
    `);
    console.log('✅ Policies criadas\n');

    // 6. Add comments
    console.log('6/7: Adicionando comentários...');
    await prisma.$executeRawUnsafe(`
      COMMENT ON TABLE activities IS 'Timeline user-friendly de atividades do processo EB-1A'
    `);
    console.log('✅ Comentários adicionados\n');

    // 7. Create cleanup function
    console.log('7/7: Criando função de limpeza...');
    await prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION cleanup_old_activities(days_to_keep INTEGER DEFAULT 90)
      RETURNS INTEGER AS $$
      DECLARE
        deleted_count INTEGER;
      BEGIN
        DELETE FROM activities
        WHERE created_at < NOW() - (days_to_keep || ' days')::INTERVAL;

        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RETURN deleted_count;
      END;
      $$ LANGUAGE plpgsql
    `);
    console.log('✅ Função criada\n');

    // Verify
    console.log('✅ Migration 009 aplicada com sucesso!\n');
    console.log('📋 Verificando tabela activities...');

    const result = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM activities
    `;
    console.log('✅ Tabela activities verificada:', result);

    console.log('\n🎉 Migration completa!');
    console.log('\n📝 Próximos passos:');
    console.log('1. Gerar Prisma Client: npx prisma generate');
    console.log('2. Implementar activityService.ts');
    console.log('3. Criar página /dashboard/activity');
  } catch (error: any) {
    console.error('\n❌ Erro ao aplicar migration:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

applyMigration()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
