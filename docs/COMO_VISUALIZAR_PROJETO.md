# 👀 Como Visualizar o Projeto no Cursor

**Data:** Janeiro 2025

---

## 📋 OPÇÕES PARA VISUALIZAR O PROJETO

### ❌ Preview Integrada no Cursor

O Cursor **não possui** uma janela de preview integrada como alguns outros editores. Você precisa usar o navegador.

---

## ✅ MÉTODO RECOMENDADO: Navegador

### 1. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

**O servidor iniciará em:** `http://localhost:3000`

### 2. Abrir no Navegador

Você tem algumas opções:

#### Opção A: Abrir Manualmente
1. Abra seu navegador (Chrome, Firefox, Safari, etc.)
2. Digite na barra de endereço: `http://localhost:3000`
3. Pressione Enter

#### Opção B: Usar Comando do Terminal (macOS)
```bash
# Abrir automaticamente no navegador padrão
open http://localhost:3000
```

#### Opção C: Clicar no Link no Terminal
Quando o servidor iniciar, você verá algo como:
```
  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
```
Você pode **Cmd+Click** (macOS) ou **Ctrl+Click** (Windows/Linux) no link para abrir automaticamente.

---

## 🔍 VERIFICAR SE O SERVIDOR ESTÁ RODANDO

### Verificar Processo na Porta 3000

```bash
# Ver se há processo rodando
lsof -ti:3000

# Se retornar um número (PID), o servidor está rodando
```

### Testar Conexão

```bash
# Testar se o servidor responde
curl http://localhost:3000

# Ou abrir diretamente
open http://localhost:3000
```

---

## 🚀 INICIAR O SERVIDOR (Se Não Estiver Rodando)

### No Terminal do Cursor

1. Abra o terminal integrado do Cursor (`` Ctrl+` `` ou `View > Terminal`)
2. Execute:
   ```bash
   npm run dev
   ```
3. Aguarde a mensagem:
   ```
   ✓ Ready in Xs
   - Local: http://localhost:3000
   ```
4. Abra `http://localhost:3000` no navegador

---

## 📱 PÁGINAS DISPONÍVEIS

Após iniciar o servidor, você pode acessar:

- **Página Inicial:** `http://localhost:3000`
- **Login:** `http://localhost:3000/login`
- **Signup:** `http://localhost:3000/signup`
- **Dashboard:** `http://localhost:3000/dashboard` (requer autenticação)

---

## 🛠️ TROUBLESHOOTING

### Problema: Porta 3000 já está em uso

**Solução:**
```bash
# Ver qual processo está usando a porta
lsof -ti:3000

# Matar o processo (substitua PID pelo número retornado)
kill -9 PID

# Ou usar outra porta
PORT=3001 npm run dev
```

### Problema: Servidor não inicia

**Solução:**
1. Verificar variáveis de ambiente: `npx tsx scripts/validate-env.ts`
2. Verificar se dependências estão instaladas: `npm install`
3. Verificar logs de erro no terminal

### Problema: Página não carrega

**Solução:**
1. Verificar se o servidor está rodando
2. Verificar console do navegador (F12) para erros
3. Verificar logs no terminal do Cursor

---

## 💡 DICAS

### Auto-reload
O Next.js tem **hot reload** automático. Quando você salvar alterações nos arquivos, a página no navegador será atualizada automaticamente.

### DevTools do Navegador
Use as ferramentas de desenvolvedor do navegador (F12) para:
- Ver erros no console
- Inspecionar elementos
- Verificar requisições de rede
- Debuggar JavaScript

### Múltiplas Abas
Você pode abrir múltiplas abas do navegador para testar diferentes páginas simultaneamente.

---

## 📊 STATUS ATUAL

Para verificar se o servidor está rodando agora:

```bash
# Verificar processo
lsof -ti:3000

# Testar conexão
curl -I http://localhost:3000
```

---

**Última Atualização:** Janeiro 2025



