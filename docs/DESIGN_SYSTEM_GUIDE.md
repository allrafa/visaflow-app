# VisaFlow Design System - Guia Completo

**Versão:** 1.0
**Data:** 17 de Novembro de 2025
**Status:** ✅ Implementado

---

## 🎨 Visão Geral

O VisaFlow Design System é um sistema de design moderno, profissional e focado em imigração. Ele usa **CSS Variables (Custom Properties)** para permitir mudanças rápidas de cores e estilos globalmente.

### Principais Características

- ✅ **CSS Variables** - Troque cores instantaneamente
- ✅ **Dark Mode Ready** - Suporte completo a modo escuro
- ✅ **Tailwind Integration** - Acesse variáveis via Tailwind
- ✅ **Semantic Colors** - Cores com significado (success, warning, info)
- ✅ **Phase Colors** - Cores específicas para cada fase EB-1A
- ✅ **Utility Classes** - Classes prontas para usar
- ✅ **Animations** - Transições suaves e modernas
- ✅ **Component Styles** - Estilos de componentes reutilizáveis

---

## 🎨 Paleta de Cores

### Brand Colors (Cores da Marca)

#### Primary - Azul Profissional
Representa confiança, autoridade e profissionalismo

```css
--primary: 221 83% 53%;           /* #2563eb - Vibrant Blue */
--primary-foreground: 0 0% 100%;  /* White text */
--primary-hover: 221 83% 48%;     /* Darker on hover */
--primary-light: 221 83% 95%;     /* Very light background */
```

**Uso em Tailwind:**
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary-hover">
  Botão Principal
</button>

<div className="bg-primary-light text-primary">
  Área destacada
</div>
```

#### Secondary - Verde de Aprovação
Representa sucesso, progresso e aprovações

```css
--secondary: 142 76% 36%;         /* #16a34a - Professional Green */
--secondary-foreground: 0 0% 100%;
--secondary-hover: 142 76% 31%;
--secondary-light: 142 76% 95%;
```

**Uso em Tailwind:**
```tsx
<button className="bg-secondary text-secondary-foreground">
  Aprovar
</button>
```

#### Accent - Ouro Premium
Representa recursos premium e destaques

```css
--accent: 45 93% 47%;             /* #f59e0b - Warm Gold */
--accent-foreground: 0 0% 100%;
--accent-hover: 45 93% 42%;
--accent-light: 45 93% 95%;
```

**Uso em Tailwind:**
```tsx
<Badge className="bg-accent text-accent-foreground">
  Premium
</Badge>
```

---

### Semantic Colors (Cores Semânticas)

#### Success - Aprovações e Conclusões
```css
--success: 142 76% 36%;           /* Green */
--success-foreground: 0 0% 100%;
--success-bg: 142 76% 95%;
--success-border: 142 76% 80%;
```

**Uso:**
```tsx
<div className="bg-success-bg text-success border border-success-border p-4 rounded-lg">
  ✓ Tarefa concluída com sucesso!
</div>
```

#### Warning - Atenção Necessária
```css
--warning: 38 92% 50%;            /* Orange */
--warning-foreground: 0 0% 100%;
--warning-bg: 38 92% 95%;
--warning-border: 38 92% 80%;
```

**Uso:**
```tsx
<Alert className="bg-warning-bg text-warning border-warning-border">
  ⚠️ Prazo se aproximando em 3 dias
</Alert>
```

#### Destructive - Erros e Críticos
```css
--destructive: 0 84% 60%;         /* Red */
--destructive-foreground: 0 0% 100%;
--destructive-bg: 0 84% 95%;
--destructive-border: 0 84% 80%;
```

**Uso:**
```tsx
<Button variant="destructive">
  Deletar Processo
</Button>
```

#### Info - Informações
```css
--info: 199 89% 48%;              /* Cyan */
--info-foreground: 0 0% 100%;
--info-bg: 199 89% 95%;
--info-border: 199 89% 80%;
```

**Uso:**
```tsx
<div className="bg-info-bg text-info border-info-border p-4">
  ℹ️ Esta tarefa requer upload de documentos
</div>
```

---

### Status Colors (Process Health)

Para indicar a saúde/status de processos:

```css
--status-healthy: 142 76% 36%;    /* Green */
--status-healthy-bg: 142 76% 95%;

--status-at-risk: 38 92% 50%;     /* Orange */
--status-at-risk-bg: 38 92% 95%;

--status-critical: 0 84% 60%;     /* Red */
--status-critical-bg: 0 84% 95%;

--status-pending: 215 16% 47%;    /* Gray */
--status-pending-bg: 220 13% 91%;
```

**Uso com Classes Prontas:**
```tsx
<Badge className="status-healthy">✓ Saudável</Badge>
<Badge className="status-at-risk">⚠️ Em Risco</Badge>
<Badge className="status-critical">🔴 Crítico</Badge>
<Badge className="status-pending">⏳ Pendente</Badge>
```

**Ou via Tailwind:**
```tsx
<div className="bg-status-healthy-bg text-status-healthy">
  Este processo está no prazo
</div>
```

---

### Phase Colors (EB-1A Phases)

Cada fase do processo EB-1A tem sua própria cor:

```css
--phase-eligibility: 262 83% 58%;      /* Purple */
--phase-eligibility-bg: 262 83% 95%;

--phase-evidence: 199 89% 48%;         /* Cyan */
--phase-evidence-bg: 199 89% 95%;

--phase-letters: 45 93% 47%;           /* Gold */
--phase-letters-bg: 45 93% 95%;

--phase-petition: 221 83% 53%;         /* Blue */
--phase-petition-bg: 221 83% 95%;

--phase-filing: 142 76% 36%;           /* Green */
--phase-filing-bg: 142 76% 95%;
```

**Uso com Classes Prontas:**
```tsx
<Badge className="phase-eligibility">1. Elegibilidade</Badge>
<Badge className="phase-evidence">2. Evidências</Badge>
<Badge className="phase-letters">3. Cartas</Badge>
<Badge className="phase-petition">4. Petição</Badge>
<Badge className="phase-filing">5. Filing</Badge>
```

---

## 🔧 Como Mudar Cores Globalmente

### Opção 1: Mudar no CSS (Recomendado)

Abra `src/app/globals.css` e altere os valores HSL:

```css
:root {
  /* Antes: Azul */
  --primary: 221 83% 53%;

  /* Depois: Verde */
  --primary: 142 76% 36%;
}
```

**Todas as ocorrências de `bg-primary` no projeto mudarão automaticamente!**

### Opção 2: Criar Themes

Você pode criar temas diferentes:

```css
/* Theme 1: Blue (Default) */
:root {
  --primary: 221 83% 53%;
}

/* Theme 2: Purple */
.theme-purple {
  --primary: 262 83% 58%;
  --primary-hover: 262 83% 53%;
}

/* Theme 3: Teal */
.theme-teal {
  --primary: 180 72% 40%;
  --primary-hover: 180 72% 35%;
}
```

Aplique no HTML:
```tsx
<body className="theme-purple">
  {/* Todo o app usará roxo como primary */}
</body>
```

### Opção 3: Dark Mode

O sistema já tem dark mode configurado:

```tsx
<html className="dark">
  {/* Ativa dark mode */}
</html>
```

---

## 📐 Spacing & Sizing

### Border Radius

```css
--radius-sm: 0.25rem;    /* 4px - Small elements */
--radius: 0.5rem;        /* 8px - Default */
--radius-md: 0.75rem;    /* 12px - Medium */
--radius-lg: 1rem;       /* 16px - Large cards */
--radius-xl: 1.5rem;     /* 24px - Extra large */
--radius-full: 9999px;   /* Full rounded */
```

**Uso em Tailwind:**
```tsx
<Button className="rounded-sm">Small radius</Button>
<Card className="rounded-lg">Large radius</Card>
<Avatar className="rounded-full">Full circle</Avatar>
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

**Uso em Tailwind:**
```tsx
<Card className="shadow-soft">Soft shadow</Card>
<div className="shadow-glow-primary">Glow effect</div>
```

---

## 🎭 Utility Classes

### Glass Morphism

```tsx
<div className="glass p-6">
  {/* Efeito vidro com blur */}
</div>

<div className="glass-dark p-6">
  {/* Efeito vidro escuro */}
</div>
```

### Gradients

```tsx
<div className="gradient-primary p-6 text-white">
  Gradiente azul
</div>

<div className="gradient-secondary p-6 text-white">
  Gradiente verde
</div>

<div className="gradient-accent p-6 text-white">
  Gradiente dourado
</div>

<div className="gradient-mesh min-h-screen">
  Mesh gradient colorido (background)
</div>
```

### Text Gradients

```tsx
<h1 className="text-gradient-primary text-5xl font-bold">
  VisaFlow
</h1>

<p className="text-gradient-accent text-2xl">
  Premium Feature
</p>
```

### Hover Effects

```tsx
<Card className="hover-lift">
  Levanta ao passar o mouse
</Card>

<Button className="hover-scale">
  Aumenta ao passar o mouse
</Button>

<div className="hover-glow">
  Brilha ao passar o mouse
</div>
```

### Animations

```tsx
<div className="animate-fade-in">
  Fade in suave
</div>

<div className="animate-slide-up">
  Desliza para cima
</div>

<div className="animate-scale-in">
  Escala de dentro pra fora
</div>

<div className="animate-shimmer">
  Efeito shimmer (loading)
</div>
```

---

## 🧩 Component Styles

### Cards

```tsx
// Card elevado com shadow
<div className="card-elevated p-6">
  Conteúdo
</div>

// Card interativo (hover)
<div className="card-interactive p-6">
  Clique aqui
</div>

// Card glass
<div className="card-glass p-6">
  Efeito vidro
</div>
```

### Buttons

```tsx
// Primary button
<button className="btn-primary">
  Salvar
</button>

// Secondary button
<button className="btn-secondary">
  Aprovar
</button>

// Outline button
<button className="btn-outline">
  Cancelar
</button>

// Ghost button
<button className="btn-ghost">
  Ver mais
</button>
```

### Input Fields

```tsx
<input
  type="text"
  className="input-field"
  placeholder="Digite aqui..."
/>
```

### Badges

```tsx
<span className="badge-base bg-primary text-primary-foreground">
  Novo
</span>

<span className="badge-base bg-success text-success-foreground">
  Aprovado
</span>
```

### Table Rows

```tsx
<tr className="table-row-hover">
  <td>Hover effect</td>
</tr>
```

### Page Layout

```tsx
<div className="section-container">
  <div className="page-header">
    <h1 className="page-title">Título da Página</h1>
    <p className="page-description">Descrição</p>
  </div>

  {/* Conteúdo */}
</div>
```

---

## 📊 Chart Colors

Para gráficos e visualizações:

```tsx
import { Line } from 'react-chartjs-2';

const data = {
  datasets: [
    {
      borderColor: 'hsl(var(--chart-1))', // Primary Blue
      backgroundColor: 'hsl(var(--chart-1) / 0.1)',
    },
    {
      borderColor: 'hsl(var(--chart-2))', // Success Green
      backgroundColor: 'hsl(var(--chart-2) / 0.1)',
    },
    {
      borderColor: 'hsl(var(--chart-3))', // Accent Gold
      backgroundColor: 'hsl(var(--chart-3) / 0.1)',
    },
  ],
};
```

Ou via Tailwind:
```tsx
<div className="bg-chart-1">Azul</div>
<div className="bg-chart-2">Verde</div>
<div className="bg-chart-3">Dourado</div>
```

---

## 🎬 Exemplos Práticos

### Example 1: Process Card

```tsx
<div className="card-interactive hover-lift">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-xl font-bold">João Silva</h3>
    <Badge className="phase-evidence">Evidências</Badge>
  </div>

  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-foreground-secondary">Progresso</span>
      <span className="font-medium">65%</span>
    </div>

    <div className="w-full bg-muted rounded-full h-2">
      <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
    </div>
  </div>

  <div className="mt-4 flex gap-2">
    <button className="btn-primary flex-1">Ver Detalhes</button>
    <button className="btn-outline">Editar</button>
  </div>
</div>
```

### Example 2: Status Alert

```tsx
<div className="bg-warning-bg border border-warning-border rounded-lg p-4">
  <div className="flex items-start gap-3">
    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
    <div>
      <h4 className="font-semibold text-warning">Atenção Necessária</h4>
      <p className="text-sm text-foreground-secondary mt-1">
        Este processo tem 3 tarefas atrasadas. Revise para evitar atrasos no deadline.
      </p>
      <button className="btn-primary mt-3 text-sm">
        Revisar Tarefas
      </button>
    </div>
  </div>
</div>
```

### Example 3: Dashboard Header

```tsx
<div className="gradient-mesh py-16">
  <div className="section-container">
    <div className="glass p-8 rounded-xl">
      <h1 className="text-gradient-primary text-5xl font-bold mb-4">
        Dashboard
      </h1>
      <p className="text-foreground-secondary text-lg">
        Bem-vindo de volta! Você tem 5 processos ativos.
      </p>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-success-bg border border-success-border rounded-lg p-4">
          <p className="text-sm text-success-foreground opacity-70">No Prazo</p>
          <p className="text-3xl font-bold text-success">12</p>
        </div>

        <div className="bg-warning-bg border border-warning-border rounded-lg p-4">
          <p className="text-sm text-warning-foreground opacity-70">Em Risco</p>
          <p className="text-3xl font-bold text-warning">3</p>
        </div>

        <div className="bg-destructive-bg border border-destructive-border rounded-lg p-4">
          <p className="text-sm text-destructive-foreground opacity-70">Atrasados</p>
          <p className="text-3xl font-bold text-destructive">1</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 🎨 Customização Avançada

### Criar um Novo Theme

1. Abra `globals.css`
2. Adicione um novo seletor:

```css
.theme-teal {
  /* Primary = Teal */
  --primary: 180 72% 40%;
  --primary-foreground: 0 0% 100%;
  --primary-hover: 180 72% 35%;
  --primary-light: 180 72% 95%;

  /* Ajuste outras cores se necessário */
}
```

3. Aplique no componente:

```tsx
<div className="theme-teal">
  {/* Todo conteúdo aqui usará teal como primary */}
</div>
```

### Criar Variação de Componente

```css
@layer components {
  .btn-premium {
    @apply bg-accent text-accent-foreground hover:bg-accent-hover
           shadow-glow-warning transition-all duration-200 rounded-md px-6 py-3 font-bold;
  }
}
```

Uso:
```tsx
<button className="btn-premium">
  Upgrade Premium
</button>
```

---

## 🚀 Performance

### Lazy Load Animations

Para performance, só aplique animações quando visíveis:

```tsx
import { useInView } from 'react-intersection-observer';

function AnimatedCard() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`card-elevated ${inView ? 'animate-slide-up' : 'opacity-0'}`}
    >
      Conteúdo
    </div>
  );
}
```

### Reduce Motion (Acessibilidade)

Respeite a preferência `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 Responsive Design

Todas as cores e utilidades funcionam com responsive modifiers:

```tsx
<div className="bg-primary md:bg-secondary lg:bg-accent">
  Muda de cor em diferentes tamanhos
</div>

<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Responsivo
</h1>

<div className="p-4 md:p-6 lg:p-8">
  Padding responsivo
</div>
```

---

## 🌙 Dark Mode Best Practices

1. **Teste em ambos os modos:**
```tsx
<html className="dark"> {/* ou sem classe para light mode */}
```

2. **Use cores semânticas:**
```tsx
// ✅ Bom - se adapta ao theme
<div className="bg-card text-card-foreground">

// ❌ Evite cores hard-coded
<div className="bg-white text-black">
```

3. **Ajuste opacidades:**
```tsx
<div className="bg-primary/10"> {/* 10% opacity */}
  Fundo sutil
</div>
```

---

## 🎯 Checklist de Design Consistency

Ao criar novos componentes, verifique:

- [ ] Usa variáveis CSS (não cores hard-coded)
- [ ] Funciona em dark mode
- [ ] Usa classes semânticas (success, warning, etc)
- [ ] Tem estados de hover/focus
- [ ] Usa transições suaves
- [ ] Respeita spacing consistente
- [ ] Responsivo em mobile/tablet/desktop
- [ ] Acessível (contraste, ARIA labels)

---

## 📚 Recursos

- **Ferramenta de Cores HSL:** https://hslpicker.com/
- **Calculadora de Contraste:** https://contrast-ratio.com/
- **Tailwind Docs:** https://tailwindcss.com/docs

---

## 🔄 Changelog

### v1.0 (17/11/2025)
- ✅ Sistema de design inicial
- ✅ CSS Variables completas
- ✅ Dark mode support
- ✅ Status e Phase colors
- ✅ Utility classes
- ✅ Component styles
- ✅ Animations

---

**Dúvidas?** Consulte este guia ou os exemplos em `src/components/`
