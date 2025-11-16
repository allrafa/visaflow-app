# 🔌 Configuração MCP - Apenas por Projeto

**Data:** Janeiro 2025  
**Status:** ✅ **CONFIGURADO**

---

## 📋 Resumo das Mudanças

### ✅ MCP Global Desabilitado

O arquivo MCP global (`~/.cursor/mcp.json`) foi **desabilitado** para evitar conflitos entre projetos.

**Arquivo:** `/Users/rafaraio/.cursor/mcp.json`
**Status:** Desabilitado (vazio, apenas comentário)

**Backup:** O arquivo original foi salvo como `mcp.json.backup` (se existia)

### ✅ MCP por Projeto Ativado

Agora **apenas o MCP do projeto VisaFlow** será carregado quando você trabalhar neste projeto.

**Arquivo:** `/Users/rafaraio/.cursor/projects/visaflow-app/.mcp.json`

**Servidores MCP Configurados:**

1. **filesystem-visaflow**
   - Acesso ao sistema de arquivos do projeto VisaFlow
   - Path: `/Users/rafaraio/.cursor/projects/visaflow-app`

2. **memory**
   - Memória persistente compartilhada

3. **supabase**
   - Conexão ao Supabase do VisaFlow
   - Projeto: `jsnvrhbeedkifqwmsumc`
   - URL: `https://jsnvrhbeedkifqwmsumc.supabase.co`

4. **context7**
   - Busca em documentação

---

## ⚙️ Configurações Desabilitadas

Todas as seguintes opções foram **desabilitadas** em todos os servidores MCP:

- ✅ **continuousLoad**: `false` - Não carrega continuamente
- ✅ **watchLoad**: `false` - Não observa mudanças de arquivos
- ✅ **serverPersistent**: `false` - Servidor não persiste entre sessões

**Motivo:** Reduzir uso de recursos e garantir que apenas o contexto do projeto atual seja carregado.

---

## 🎯 Como Funciona Agora

### Antes (Problema)
- ❌ MCP global carregava servidores de todos os projetos
- ❌ Supabase global apontava para projeto errado (`izrvmoyppwexwqisicxe`)
- ❌ Continuous load e watch load consumiam recursos desnecessariamente

### Agora (Solução)
- ✅ Apenas MCP do projeto VisaFlow é carregado
- ✅ Supabase aponta para o projeto correto (`jsnvrhbeedkifqwmsumc`)
- ✅ Servidores carregam apenas quando necessário
- ✅ Isolamento total entre projetos

---

## 🔍 Verificação

### Como Verificar se Está Funcionando

1. **Verificar MCP Global Desabilitado:**
   ```bash
   cat ~/.cursor/mcp.json
   # Deve mostrar: {"_comment": "MCP Global desabilitado...", "_disabled": true}
   ```

2. **Verificar MCP do Projeto:**
   ```bash
   cat /Users/rafaraio/.cursor/projects/visaflow-app/.mcp.json
   # Deve mostrar os 4 servidores configurados
   ```

3. **Validar Configuração MCP:**
   ```bash
   cd /Users/rafaraio/.cursor/projects/visaflow-app
   npx tsx scripts/validate-mcp-config.ts
   ```

---

## 📝 Estrutura de Arquivos

```
~/.cursor/
├── mcp.json                    # ❌ DESABILITADO (vazio)
└── mcp.json.backup             # 💾 Backup do original (se existia)

~/.cursor/projects/visaflow-app/
└── .mcp.json                   # ✅ ATIVO (4 servidores configurados)
```

---

## ⚠️ Notas Importantes

1. **Reiniciar Cursor:** Após essas mudanças, é recomendado **reiniciar o Cursor** para que as configurações sejam aplicadas.

2. **Outros Projetos:** Cada projeto pode ter seu próprio `.mcp.json` sem interferir com outros.

3. **MCP Global:** Se precisar reativar o MCP global no futuro, restaure o arquivo `mcp.json.backup`.

4. **Isolamento:** Agora cada projeto tem isolamento total de MCP, garantindo que apenas o contexto correto seja carregado.

---

## ✅ Checklist

- [x] MCP global desabilitado
- [x] MCP do projeto VisaFlow configurado
- [x] Continuous load desabilitado
- [x] Watch load desabilitado
- [x] Server persistent desabilitado
- [x] Backup do MCP global criado
- [ ] **Reiniciar Cursor** (ação necessária do usuário)

---

**Última atualização:** Janeiro 2025  
**Status:** 🟢 **CONFIGURADO - REINICIAR CURSOR PARA APLICAR**






