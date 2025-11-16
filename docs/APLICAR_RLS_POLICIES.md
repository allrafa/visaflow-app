# 🔐 Como Aplicar RLS Policies no Supabase

**Status:** ⚠️ **AÇÃO MANUAL NECESSÁRIA**

---

## Por que aplicar manualmente?

Como estamos usando **Prisma Accelerate**, não podemos aplicar RLS policies via Prisma migrations porque:
- O schema `auth` do Supabase não está disponível através do Accelerate
- As policies RLS precisam de `auth.uid()` que vem do schema `auth`
- Policies devem ser aplicadas diretamente no banco Supabase

---

## 📋 Passo a Passo

### 1. Acessar Supabase Dashboard

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto: `jsnvrhbeedkifqwmsumc`
3. Vá em **SQL Editor** (menu lateral esquerdo)
4. Clique em **New Query**

### 2. Aplicar SQL de RLS

1. Abra o arquivo: `/supabase/migrations/001_enable_rls.sql`
2. Copie **TODO** o conteúdo do arquivo
3. Cole no SQL Editor do Supabase
4. Clique em **Run** (ou pressione Cmd+Enter)

### 3. Verificar Aplicação

Execute este SQL para verificar:

```sql
-- Verificar RLS habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'processes', 'tasks', 'uploads', 'criteria_evidences', 'recommendation_letters', 'audit_logs')
ORDER BY tablename;

-- Contar policies criadas
SELECT COUNT(*) as total_policies 
FROM pg_policies 
WHERE schemaname = 'public';
```

**Resultado esperado:**
- Todas as 7 tabelas com `rowsecurity = true`
- ~20-25 policies criadas

---

## ✅ Validação

Após aplicar, execute:

```bash
npx tsx scripts/test-connection.ts
```

Isso validará que:
- RLS está habilitado
- Policies estão funcionando
- Autenticação funciona corretamente

---

## 📝 Notas

- As policies são aplicadas uma vez e permanecem no banco
- Não é necessário reaplicar após cada deploy
- Se precisar modificar policies, edite diretamente no Supabase Dashboard
- O arquivo `supabase/migrations/001_enable_rls.sql` serve como documentação

---

**Última atualização:** Janeiro 2025



