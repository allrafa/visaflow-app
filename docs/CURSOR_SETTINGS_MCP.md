# ⚙️ Configurações do Cursor - MCP

**Data:** Janeiro 2025  
**Status:** ✅ **CONFIGURADO**

---

## 📋 Configurações Aplicadas

As seguintes configurações foram **desativadas** no arquivo de configurações do Cursor:

### ✅ Desativado: Enable Global Agents/Tools
- **Configuração:** `mcp.enableGlobalAgents: false`
- **Efeito:** Desativa agentes/ferramentas globais do MCP
- **Motivo:** Usar apenas MCP por projeto

### ✅ Desativado: Persist server processes
- **Configuração:** `mcp.persistServerProcesses: false`
- **Efeito:** Servidores MCP não persistem entre sessões
- **Motivo:** Reduzir uso de recursos e garantir isolamento

### ✅ Desativado: Background Watchers
- **Configuração:** `mcp.backgroundWatchers: false`
- **Efeito:** Desativa observadores em background
- **Motivo:** Reduzir consumo de recursos

### ✅ Desativado: Enable All Project MCP Servers
- **Configuração:** `claude-code.enableAllProjectMcpServers: false`
- **Efeito:** Não carrega automaticamente todos os servidores MCP de todos os projetos
- **Motivo:** Carregar apenas servidores do projeto atual

---

## 📁 Arquivo de Configuração

**Localização:** `/Users/rafaraio/Library/Application Support/Cursor/User/settings.json`

**Configurações adicionadas:**
```json
{
  "claude-code.enableAllProjectMcpServers": false,
  "mcp.enableGlobalAgents": false,
  "mcp.persistServerProcesses": false,
  "mcp.backgroundWatchers": false
}
```

---

## 🎯 Como Funciona Agora

### Antes (Problema)
- ❌ Agentes globais ativados (carregavam de todos os projetos)
- ❌ Servidores persistiam entre sessões (consumiam recursos)
- ❌ Background watchers ativos (observavam mudanças desnecessariamente)
- ❌ Todos os servidores MCP de todos os projetos eram carregados

### Agora (Solução)
- ✅ Apenas MCP do projeto atual é carregado
- ✅ Servidores não persistem (carregam sob demanda)
- ✅ Background watchers desativados (sem observação desnecessária)
- ✅ Isolamento total entre projetos

---

## 🔍 Verificação

### Como Verificar se Está Funcionando

1. **Verificar Configurações:**
   ```bash
   cat "/Users/rafaraio/Library/Application Support/Cursor/User/settings.json" | grep -A 4 "mcp\|enableAllProjectMcpServers"
   ```

2. **Verificar no Cursor:**
   - Vá em: **Cursor → Settings → Features → MCP**
   - Verifique que as seguintes opções estão **desativadas**:
     - ✅ Enable Global Agents/Tools: **OFF**
     - ✅ Persist server processes: **OFF**
     - ✅ Background Watchers: **OFF**

---

## ⚠️ Notas Importantes

1. **Reiniciar Cursor:** Após essas mudanças, é **obrigatório reiniciar o Cursor** para que as configurações sejam aplicadas.

2. **Configurações por Projeto:** Essas configurações são globais do Cursor, mas combinadas com o `.mcp.json` por projeto, garantem isolamento total.

3. **Reverter:** Se precisar reativar essas opções no futuro, altere os valores para `true` no arquivo `settings.json`.

---

## ✅ Checklist

- [x] Enable Global Agents/Tools desativado
- [x] Persist server processes desativado
- [x] Background Watchers desativado
- [x] Enable All Project MCP Servers desativado
- [x] Arquivo settings.json atualizado
- [ ] **Reiniciar Cursor** (ação necessária do usuário)

---

## 📝 Resumo das Mudanças

| Configuração | Antes | Agora | Arquivo |
|-------------|-------|-------|---------|
| Enable Global Agents/Tools | ❓ | ❌ Desativado | settings.json |
| Persist server processes | ❓ | ❌ Desativado | settings.json |
| Background Watchers | ❓ | ❌ Desativado | settings.json |
| Enable All Project MCP Servers | ✅ Ativado | ❌ Desativado | settings.json |

---

**Última atualização:** Janeiro 2025  
**Status:** 🟢 **CONFIGURADO - REINICIAR CURSOR PARA APLICAR**





