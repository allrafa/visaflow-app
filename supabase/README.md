# Supabase Migrations

Este diretório contém as migrations SQL para configurar o Row Level Security (RLS) no Supabase.

## Aplicar Migrations

### Via Supabase Dashboard

1. Acesse o Supabase Dashboard
2. Vá para SQL Editor
3. Execute o conteúdo de `001_enable_rls.sql`

### Via Supabase CLI

```bash
# Se você tem Supabase CLI instalado
supabase db push
```

## Estrutura

- `001_enable_rls.sql` - Habilita RLS e cria policies para todas as tabelas

## Policies Criadas

### Processes
- `users_select_own_processes` - SELECT apenas processos próprios
- `users_insert_own_processes` - INSERT apenas para si mesmo
- `users_update_own_processes` - UPDATE apenas processos próprios
- `users_delete_own_processes` - DELETE apenas processos próprios

### Tasks
- `users_select_own_tasks` - SELECT tasks de processos próprios
- `users_insert_own_tasks` - INSERT tasks em processos próprios
- `users_update_own_tasks` - UPDATE tasks de processos próprios
- `users_delete_own_tasks` - DELETE tasks de processos próprios

### Uploads
- `users_select_own_uploads` - SELECT uploads de tasks próprias
- `users_insert_own_uploads` - INSERT uploads em tasks próprias
- `users_delete_own_uploads` - DELETE uploads de tasks próprias

### Criteria Evidences
- `users_select_own_criteria` - SELECT critérios de processos próprios
- `users_insert_own_criteria` - INSERT critérios em processos próprios
- `users_update_own_criteria` - UPDATE critérios de processos próprios

### Recommendation Letters
- `users_select_own_letters` - SELECT cartas de processos próprios
- `users_insert_own_letters` - INSERT cartas em processos próprios
- `users_update_own_letters` - UPDATE cartas de processos próprios

### Audit Logs
- `users_select_own_audit_logs` - SELECT apenas seus próprios logs
- `users_insert_own_audit_logs` - INSERT apenas seus próprios logs

## Notas Importantes

- Todas as policies verificam `auth.uid()::text = user_id` para garantir isolamento de dados
- As policies de tasks, uploads, criteria e letters verificam ownership através de JOIN com processes
- RLS está habilitado em todas as tabelas para máxima segurança



