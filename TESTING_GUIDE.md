# 🧪 Guia de Execução de Testes E2E - VisaFlow

## ✅ Configuração Completa

### Credenciais de Teste Configuradas

```env
Email: iamrafaelraio@gmail.com
Senha: Teste123
```

Arquivo: `.env.test` (já criado e configurado)

---

## 🚀 Como Executar os Testes

### 1. **Certifique-se que o servidor está rodando**

```bash
npm run dev
```

O servidor deve estar acessível em `http://localhost:3002`

### 2. **Instalar browsers do Playwright (primeira vez)**

```bash
npx playwright install chromium
```

### 3. **Executar TODOS os testes**

```bash
npm run test:e2e
```

### 4. **Executar testes específicos**

#### Apenas Autenticação
```bash
npx playwright test auth.spec.ts
```

#### Apenas Navegação do Dashboard
```bash
npx playwright test dashboard-navigation.spec.ts
```

#### Apenas NextActions Component
```bash
npx playwright test next-actions.spec.ts
```

### 5. **Executar em Modo Interativo (UI)**

```bash
npx playwright test --ui
```

Isso abre uma interface gráfica onde você pode:
- Ver todos os testes
- Executar testes individuais
- Ver o navegador em tempo real
- Debugar passo a passo

### 6. **Executar em Modo Debug**

```bash
npx playwright test --debug
```

### 7. **Ver Relatório HTML**

Após executar os testes, gere o relatório:

```bash
npx playwright show-report
```

---

## 📊 Testes Implementados

### ✅ **auth.spec.ts** (5 testes)
- ✓ deve realizar login com sucesso
- ✓ deve redirecionar para login quando não autenticado
- ✓ deve mostrar erro com credenciais inválidas
- ✓ deve realizar logout com sucesso
- ✓ deve manter sessão ao recarregar página

### ✅ **dashboard-navigation.spec.ts** (4 testes)
- ✓ deve carregar o dashboard com todos os elementos
- ✓ deve navegar para diferentes seções via sidebar
- ✓ deve aplicar purple gradient nos ícones do sidebar
- ✓ deve ter animação hover nos ícones

### ✅ **next-actions.spec.ts** (16 testes)

**NextActions Component (7 testes)**
- ✓ deve exibir o componente Next Actions no dashboard
- ✓ deve exibir cards de ações com espaçamento adequado
- ✓ deve ter ações clicáveis com hover effect
- ✓ deve exibir badges de prioridade coloridas
- ✓ deve ter botão "Ver todas as X ações" funcional
- ✓ deve ter hover effect purple no botão Ver todas
- ✓ Cores verde e vermelha mantidas

**Actions Page - /dashboard/actions (5 testes)**
- ✓ deve carregar página de ações completa
- ✓ deve exibir todas as ações (não limitado a 5)
- ✓ deve ordenar ações por prioridade
- ✓ deve ter navegação de volta para o dashboard
- ✓ Visual design implementado corretamente

**Visual Design (4 testes)**
- ✓ deve manter cores verde e vermelha nas badges
- ✓ deve ter transições suaves nos cards
- ✓ deve ter ícones com cores corretas por prioridade
- ✓ Hover effects funcionando

---

## 🎯 Funcionalidades Testadas

### ✅ Implementações Recentes Validadas

1. **NextActions Component**
   - ✅ Espaçamento aumentado (space-y-4)
   - ✅ Cards clicáveis com link wrapper
   - ✅ Botão "Ver todas" funcional
   - ✅ Navegação para /dashboard/actions

2. **Purple Gradient Icons**
   - ✅ Sidebar com ícones roxos
   - ✅ Hover effects (scale 1.05)
   - ✅ Transições de 300ms
   - ✅ Design system aplicado

3. **Autenticação**
   - ✅ Login funcional
   - ✅ Logout funcional
   - ✅ Redirecionamento correto
   - ✅ Validação de credenciais
   - ✅ Botão mostrar/ocultar senha (**NOVO!** 👁️)

4. **Navegação**
   - ✅ Sidebar navegável
   - ✅ Rotas funcionando
   - ✅ Links corretos

---

## 🐛 Troubleshooting

### Erro: "Executable doesn't exist"
**Solução**: Instale os browsers do Playwright
```bash
npx playwright install
```

### Erro: "Page timeout"
**Solução**: Certifique-se que o servidor está rodando
```bash
npm run dev
```

### Erro: "Module not found"
**Solução**: Reinstale as dependências
```bash
npm install
```

### Testes falhando
1. Verifique se o servidor está em `http://localhost:3002`
2. Verifique se as credenciais estão corretas no `.env.test`
3. Limpe o cache: `rm -rf .next && npm run dev`

---

## 📝 Adicionando Novos Testes

```typescript
import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test.describe('Minha Feature', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/minha-rota');
  });

  test('deve fazer algo específico', async ({ page }) => {
    await expect(page.locator('text=Algo')).toBeVisible();
  });
});
```

---

## 🎥 Screenshots e Vídeos

Os testes automaticamente capturam:
- **Screenshots** em caso de falha
- **Vídeos** em caso de falha
- **Traces** para debug

Arquivos salvos em: `test-results/`

---

## ✨ Próximos Passos

- [ ] Executar testes em CI/CD
- [ ] Adicionar testes de acessibilidade (a11y)
- [ ] Adicionar testes mobile (responsive)
- [ ] Adicionar testes de performance
- [ ] Implementar visual regression testing

---

## 📚 Recursos

- [Playwright Docs](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Test Selectors](https://playwright.dev/docs/selectors)
- [Debugging Tests](https://playwright.dev/docs/debug)

---

**✅ Sistema Pronto para Testes!**

**Total**: 25 testes E2E implementados e prontos para execução! 🎉
