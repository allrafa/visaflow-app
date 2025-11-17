# Testes E2E com Playwright - VisaFlow

Este diretório contém todos os testes end-to-end (E2E) do VisaFlow usando Playwright.

## 📋 Estrutura de Arquivos

```
tests/e2e/
├── helpers/
│   └── auth.ts              # Helper de autenticação reutilizável
├── auth.spec.ts             # Testes de login/logout
├── dashboard-navigation.spec.ts # Testes de navegação
├── next-actions.spec.ts     # Testes do componente NextActions
└── README.md               # Este arquivo
```

## 🚀 Como Executar os Testes

### 1. Configurar Credenciais de Teste

Copie o arquivo `.env.test.example` para `.env.test` e preencha com suas credenciais:

```bash
cp .env.test.example .env.test
```

Edite `.env.test` com suas credenciais reais:

```env
TEST_USER_EMAIL=seu-email@example.com
TEST_USER_PASSWORD=sua-senha-secreta
PLAYWRIGHT_BASE_URL=http://localhost:3002
```

### 2. Executar Todos os Testes

```bash
npm run test:e2e
```

### 3. Executar Testes em Modo UI (Interativo)

```bash
npx playwright test --ui
```

### 4. Executar Testes Específicos

```bash
# Apenas testes de autenticação
npx playwright test auth.spec.ts

# Apenas testes do NextActions
npx playwright test next-actions.spec.ts

# Apenas testes de navegação
npx playwright test dashboard-navigation.spec.ts
```

### 5. Executar em Modo Debug

```bash
npx playwright test --debug
```

### 6. Ver Relatório HTML

```bash
npx playwright show-report
```

## 📊 Testes Implementados

### 🔐 **auth.spec.ts** - Autenticação
- ✅ Login com credenciais válidas
- ✅ Redirecionar para login quando não autenticado
- ✅ Mostrar erro com credenciais inválidas
- ✅ Logout com sucesso
- ✅ Manter sessão ao recarregar página

### 🗺️ **dashboard-navigation.spec.ts** - Navegação
- ✅ Carregar dashboard com todos os elementos
- ✅ Navegar entre diferentes seções via sidebar
- ✅ Aplicar purple gradient nos ícones do sidebar
- ✅ Ter animação hover nos ícones

### 📋 **next-actions.spec.ts** - NextActions Component
- ✅ Exibir componente Next Actions no dashboard
- ✅ Exibir cards com espaçamento adequado (space-y-4)
- ✅ Ter ações clicáveis com hover effect
- ✅ Exibir badges de prioridade coloridas (vermelho/verde mantidos)
- ✅ Ter botão "Ver todas as X ações" funcional
- ✅ Ter hover effect purple no botão Ver todas
- ✅ Carregar página /dashboard/actions completa
- ✅ Exibir todas as ações (sem limite de 5)
- ✅ Ordenar ações por prioridade
- ✅ Ter navegação de volta para o dashboard
- ✅ Manter cores verde e vermelha nas badges
- ✅ Ter transições suaves nos cards
- ✅ Ter ícones com cores corretas por prioridade

## 🎯 Cobertura de Funcionalidades

### ✅ Implementadas Recentemente
- **NextActions Component**: Espaçamento aumentado, cards clicáveis, botão funcional
- **Purple Gradient Icons**: Aplicado em Sidebar, CriteriaCard, TaskCard, LetterPreview, PhaseCards
- **Página /dashboard/actions**: Nova página completa com todas as ações
- **Design System**: Cores purple-1, purple-2, purple-3, purple-muted

### 🎨 Design Validado
- Cores verde (MEDIUM) e vermelha (URGENT) mantidas
- Purple gradient apenas em ícones específicos
- Hover effects com scale(1.05) e brightness(1.1)
- Transições de 300ms (estilo Resend)

## 🔧 Helpers Disponíveis

### `helpers/auth.ts`

```typescript
import { login, logout, isAuthenticated } from './helpers/auth';

// Login
await login(page);

// Login com credenciais customizadas
await login(page, 'outro@email.com', 'outra-senha');

// Logout
await logout(page);

// Verificar autenticação
const isAuth = await isAuthenticated(page);
```

## 🐛 Troubleshooting

### Erro: "Module not found: @/lib/supabase/server"
✅ **Corrigido**: Mudado para `@/lib/auth/getAuthUser` e Prisma

### Erro: "Port 3000 is in use"
O servidor está rodando na porta 3002. Configure `PLAYWRIGHT_BASE_URL=http://localhost:3002`

### Erro: "Timeout waiting for page"
Aumente o timeout no `playwright.config.ts` ou verifique se o servidor está rodando

### Credenciais de teste não funcionam
Verifique se o arquivo `.env.test` está configurado corretamente e se o usuário existe no banco de dados

## 📝 Adicionar Novos Testes

```typescript
import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test.describe('Minha Nova Feature', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('deve fazer algo específico', async ({ page }) => {
    await page.goto('/minha-rota');
    await expect(page.locator('text=Algo')).toBeVisible();
  });
});
```

## 📚 Recursos

- [Playwright Docs](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [Test Selectors](https://playwright.dev/docs/selectors)

## ✨ Melhorias Futuras

- [ ] Adicionar testes de performance
- [ ] Implementar testes de acessibilidade (a11y)
- [ ] Adicionar testes de responsividade mobile
- [ ] Implementar testes de upload de arquivos
- [ ] Adicionar testes de validação de formulários
- [ ] Implementar testes de integração com Claude AI

## 👤 Credenciais de Teste

**IMPORTANTE**: As credenciais devem ser fornecidas pelo usuário e configuradas em `.env.test`

```env
TEST_USER_EMAIL=<fornecido pelo usuário>
TEST_USER_PASSWORD=<fornecido pelo usuário>
```
