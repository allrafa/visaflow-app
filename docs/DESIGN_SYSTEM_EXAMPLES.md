# Exemplos Práticos - VisaFlow Design System

## 🎯 Como Usar Este Guia

Este documento contém exemplos de código **COPY & PASTE** prontos para usar no seu projeto.

---

## 🎨 Quick Start: Trocar Cores Globalmente

### Exemplo 1: Mudar Primary Color (Azul → Verde)

**Arquivo:** `src/app/globals.css`

```css
:root {
  /* Antes: Azul */
  --primary: 221 83% 53%;

  /* Depois: Verde Teal */
  --primary: 180 72% 40%;
  --primary-hover: 180 72% 35%;
  --primary-light: 180 72% 95%;
}
```

**Resultado:** TODOS os botões, links e elementos primários mudam para verde instantaneamente!

### Exemplo 2: Criar Theme Personalizado

**Arquivo:** `src/app/globals.css`

```css
/* Adicione no final do arquivo */
.theme-purple {
  --primary: 262 83% 58%;          /* Purple */
  --primary-foreground: 0 0% 100%;
  --primary-hover: 262 83% 53%;
  --primary-light: 262 83% 95%;
}

.theme-orange {
  --primary: 24 95% 53%;           /* Orange */
  --primary-foreground: 0 0% 100%;
  --primary-hover: 24 95% 48%;
  --primary-light: 24 95% 95%;
}
```

**Uso:**
```tsx
<div className="theme-purple">
  {/* Todo conteúdo aqui terá primary = purple */}
  <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
    Botão Roxo
  </button>
</div>

<div className="theme-orange">
  <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
    Botão Laranja
  </button>
</div>
```

---

## 🧩 Components Prontos

### Card de Processo

```tsx
function ProcessCard({ process }) {
  return (
    <div className="card-interactive hover-lift p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {process.clientName}
          </h3>
          <p className="text-sm text-foreground-secondary">
            Criado {formatDate(process.createdAt)}
          </p>
        </div>

        <Badge className="phase-evidence">
          2. Evidências
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground-secondary">Progresso</span>
          <span className="font-semibold text-primary">
            {process.progress}%
          </span>
        </div>

        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${process.progress}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-success-bg border border-success-border rounded-lg p-2">
          <p className="text-xs text-success">Concluídas</p>
          <p className="text-lg font-bold text-success">{process.completed}</p>
        </div>

        <div className="bg-warning-bg border border-warning-border rounded-lg p-2">
          <p className="text-xs text-warning">Pendentes</p>
          <p className="text-lg font-bold text-warning">{process.pending}</p>
        </div>

        <div className="bg-info-bg border border-info-border rounded-lg p-2">
          <p className="text-xs text-info">Total</p>
          <p className="text-lg font-bold text-info">{process.total}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="btn-primary flex-1">
          Ver Detalhes
        </button>
        <button className="btn-outline">
          Editar
        </button>
      </div>
    </div>
  );
}
```

---

### Alert de Status

```tsx
// Success Alert
<div className="bg-success-bg border border-success-border rounded-lg p-4">
  <div className="flex items-start gap-3">
    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
    <div>
      <h4 className="font-semibold text-success">Sucesso!</h4>
      <p className="text-sm text-foreground-secondary mt-1">
        Tarefa concluída e validada com sucesso.
      </p>
    </div>
  </div>
</div>

// Warning Alert
<div className="bg-warning-bg border border-warning-border rounded-lg p-4">
  <div className="flex items-start gap-3">
    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
    <div>
      <h4 className="font-semibold text-warning">Atenção Necessária</h4>
      <p className="text-sm text-foreground-secondary mt-1">
        3 tarefas atrasadas. Deadline em 7 dias.
      </p>
      <button className="btn-primary mt-3 text-sm">
        Revisar Agora
      </button>
    </div>
  </div>
</div>

// Destructive Alert
<div className="bg-destructive-bg border border-destructive-border rounded-lg p-4">
  <div className="flex items-start gap-3">
    <XCircle className="h-5 w-5 text-destructive mt-0.5" />
    <div>
      <h4 className="font-semibold text-destructive">Erro Crítico</h4>
      <p className="text-sm text-foreground-secondary mt-1">
        Processo bloqueado. Documentos obrigatórios ausentes.
      </p>
    </div>
  </div>
</div>

// Info Alert
<div className="bg-info-bg border border-info-border rounded-lg p-4">
  <div className="flex items-start gap-3">
    <Info className="h-5 w-5 text-info mt-0.5" />
    <div>
      <h4 className="font-semibold text-info">Informação</h4>
      <p className="text-sm text-foreground-secondary mt-1">
        Esta tarefa requer upload de documentos.
      </p>
    </div>
  </div>
</div>
```

---

### Dashboard Header com Gradiente

```tsx
function DashboardHeader() {
  return (
    <div className="gradient-mesh relative overflow-hidden py-16">
      {/* Overlay para melhor legibilidade */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div className="section-container relative z-10">
        <div className="glass p-8 rounded-xl">
          <h1 className="text-gradient-primary text-5xl font-bold mb-2">
            Dashboard
          </h1>
          <p className="text-foreground-secondary text-lg mb-6">
            Bem-vindo de volta, Rafael! Você tem 12 processos ativos.
          </p>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-success-bg border border-success-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-success-foreground" />
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary">No Prazo</p>
                  <p className="text-2xl font-bold text-success">12</p>
                </div>
              </div>
            </div>

            <div className="bg-warning-bg border border-warning-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning-foreground" />
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary">Em Risco</p>
                  <p className="text-2xl font-bold text-warning">3</p>
                </div>
              </div>
            </div>

            <div className="bg-destructive-bg border border-destructive-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-destructive rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive-foreground" />
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary">Atrasados</p>
                  <p className="text-2xl font-bold text-destructive">1</p>
                </div>
              </div>
            </div>

            <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary">Este Mês</p>
                  <p className="text-2xl font-bold text-primary">+5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Status Badges

```tsx
// Process Health Badges
<Badge className="status-healthy">
  ✓ Saudável
</Badge>

<Badge className="status-at-risk">
  ⚠️ Em Risco
</Badge>

<Badge className="status-critical">
  🔴 Crítico
</Badge>

<Badge className="status-pending">
  ⏳ Pendente
</Badge>

// Phase Badges
<Badge className="phase-eligibility">
  1. Elegibilidade
</Badge>

<Badge className="phase-evidence">
  2. Evidências
</Badge>

<Badge className="phase-letters">
  3. Cartas
</Badge>

<Badge className="phase-petition">
  4. Petição
</Badge>

<Badge className="phase-filing">
  5. Filing
</Badge>

// Ou via Tailwind (mais controle)
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-phase-evidence-bg text-phase-evidence border border-cyan-300">
  <span className="w-2 h-2 bg-phase-evidence rounded-full animate-pulse" />
  Evidências
</span>
```

---

### Form com Input Fields

```tsx
function TaskForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Título da Tarefa
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Ex: Coletar prêmios e reconhecimentos"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Descrição
        </label>
        <textarea
          className="input-field min-h-[100px] resize-none"
          placeholder="Descreva a tarefa em detalhes..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Fase
          </label>
          <select className="input-field">
            <option>Elegibilidade</option>
            <option>Evidências</option>
            <option>Cartas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <select className="input-field">
            <option>Pendente</option>
            <option>Em Progresso</option>
            <option>Em Revisão</option>
            <option>Concluída</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <button type="submit" className="btn-primary flex-1">
          Salvar Tarefa
        </button>
        <button type="button" className="btn-outline">
          Cancelar
        </button>
      </div>
    </form>
  );
}
```

---

### Tabela com Hover Effect

```tsx
function TasksTable({ tasks }) {
  return (
    <div className="card-elevated overflow-hidden">
      <table className="w-full">
        <thead className="bg-background-secondary">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground-secondary">
              Tarefa
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground-secondary">
              Fase
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground-secondary">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-foreground-secondary">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tasks.map((task) => (
            <tr key={task.id} className="table-row-hover">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Circle className="h-4 w-4 text-foreground-tertiary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {task.title}
                    </p>
                    <p className="text-xs text-foreground-secondary">
                      {task.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge className="phase-evidence">{task.phase}</Badge>
              </td>
              <td className="px-6 py-4">
                <Badge className="status-pending">{task.status}</Badge>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="btn-ghost text-sm">
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

### Loading States

```tsx
// Skeleton Loading
<div className="card-elevated p-6">
  <div className="animate-shimmer h-6 w-1/3 rounded mb-4" />
  <div className="animate-shimmer h-4 w-2/3 rounded mb-2" />
  <div className="animate-shimmer h-4 w-1/2 rounded" />
</div>

// Spinner
<div className="flex items-center justify-center py-12">
  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
</div>

// Pulse Effect
<div className="card-elevated p-6 animate-pulse">
  <div className="h-6 bg-muted rounded mb-4" />
  <div className="h-4 bg-muted rounded mb-2" />
  <div className="h-4 bg-muted rounded w-2/3" />
</div>
```

---

### Modal/Dialog

```tsx
function TaskModal({ isOpen, onClose, task }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative card-elevated max-w-2xl w-full mx-4 animate-scale-in">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {task.title}
              </h2>
              <p className="text-sm text-foreground-secondary mt-1">
                Criado há 3 dias
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn-ghost p-2 -mr-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Descrição
              </label>
              <p className="text-foreground-secondary mt-1">
                {task.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Fase
                </label>
                <Badge className="phase-evidence mt-1">
                  {task.phase}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Status
                </label>
                <Badge className="status-pending mt-1">
                  {task.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 flex gap-2">
          <button className="btn-primary flex-1">
            Salvar Alterações
          </button>
          <button className="btn-outline" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### Empty States

```tsx
function EmptyState({ title, description, action }) {
  return (
    <div className="card-elevated p-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <Inbox className="h-8 w-8 text-foreground-tertiary" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title || "Nenhuma tarefa encontrada"}
      </h3>

      <p className="text-foreground-secondary mb-6 max-w-md mx-auto">
        {description || "As tarefas aparecerão aqui quando você criá-las."}
      </p>

      {action && (
        <button className="btn-primary">
          {action.label || "Criar Nova Tarefa"}
        </button>
      )}
    </div>
  );
}
```

---

## 🎬 Animações

### Fade In ao Aparecer na Tela

```tsx
import { useInView } from 'react-intersection-observer';

function AnimatedCard({ children }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`card-elevated transition-all duration-500 ${
        inView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
}
```

### Staggered Animation (Cards em Sequência)

```tsx
function ProcessGrid({ processes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {processes.map((process, index) => (
        <div
          key={process.id}
          className="card-interactive hover-lift opacity-0 animate-slide-up"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'forwards',
          }}
        >
          {/* Card content */}
        </div>
      ))}
    </div>
  );
}
```

---

## 📱 Responsive Examples

```tsx
// Mobile-first responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items.map(item => (
    <div className="card-interactive" key={item.id}>
      {item.content}
    </div>
  ))}
</div>

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">
  Content com padding responsivo
</div>

// Responsive text
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
  Título Responsivo
</h1>

// Mobile menu (oculto em desktop)
<div className="lg:hidden">
  <MobileMenu />
</div>

// Desktop sidebar (oculto em mobile)
<div className="hidden lg:block">
  <Sidebar />
</div>
```

---

## 🎨 Conclusão

Com esses exemplos, você tem tudo que precisa para criar interfaces consistentes e profissionais no VisaFlow!

**Lembre-se:**
- Use sempre as classes CSS Variables
- Mantenha consistência com o design system
- Teste em dark mode
- Verifique responsividade

**Dúvidas?** Consulte o [Design System Guide](DESIGN_SYSTEM_GUIDE.md)
