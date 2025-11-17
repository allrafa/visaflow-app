# VisaFlow Design System - Resend Inspired

## Filosofia: Simple. Modern. Memorable.

O design do VisaFlow foi completamente redesenhado seguindo a filosofia do Resend - um dos painéis mais elegantes e minimalistas do mercado.

---

## Princípios Fundamentais

### 1. **Simplicidade e Legibilidade**
- Interface que remove atritos
- Navegação intuitiva
- Hierarquia visual clara

### 2. **Atenção aos Detalhes**
- Cada animação tem propósito
- Transições suaves (150ms)
- Cores intencionais

### 3. **Dark-First com Light Mode Acessível**
- Modo escuro como padrão
- Light mode disponível
- Contraste adequado em ambos os modos

---

## Paleta de Cores

### Filosofia Iron & Eggshell

Inspirado no Resend, usamos tons naturais ao invés de preto/branco absolutos:

#### **Dark Mode (Padrão)**
```css
--background: 0 0% 7%;           /* #121212 - Iron (não preto puro) */
--foreground: 0 0% 98%;          /* #FAFAFA - Eggshell (não branco puro) */

--card: 0 0% 10%;                /* #1A1A1A - Superfícies elevadas */
--muted: 0 0% 15%;               /* #262626 - Stone */
--border: 0 0% 18%;              /* #2E2E2E - Bordas sutis */
```

#### **Light Mode**
```css
--background: 0 0% 100%;         /* Branco puro */
--foreground: 0 0% 9%;           /* #171717 - Quase preto */

--card: 0 0% 100%;
--muted: 0 0% 96%;               /* #F5F5F5 - Cinza claro */
--border: 0 0% 90%;              /* #E5E5E5 - Bordas visíveis */
```

### Cor Assinatura: Amarelo Vibrante

```css
/* Dark Mode */
--primary: 48 96% 53%;           /* #F5C646 - Warm yellow */

/* Light Mode */
--primary: 48 96% 45%;           /* Mais escuro para contraste */
```

### Cores Semânticas

Ajustadas para acessibilidade em ambos os modos:

```css
/* Success - Verde suave */
--success: 142 71% 45%;          /* #22C55E */

/* Warning - Laranja */
--warning: 38 92% 50%;           /* #FB923C */

/* Destructive - Vermelho */
--destructive: 0 72% 51%;        /* #DC2626 */

/* Info - Ciano */
--info: 199 89% 48%;             /* #0EA5E9 */
```

### Cores de Fase (EB-1A)

```css
/* Roxo - Elegibilidade */
--phase-eligibility: 262 80% 60%;

/* Ciano - Evidências */
--phase-evidence: 199 89% 55%;

/* Amarelo - Cartas (assinatura) */
--phase-letters: 48 96% 53%;

/* Azul - Dossiê */
--phase-petition: 217 91% 60%;

/* Verde - Protocolo */
--phase-filing: 142 71% 45%;
```

---

## Tipografia

### Hierarquia

```css
.text-headline  /* 36px (2.25rem) - Títulos principais */
.text-title     /* 24px (1.5rem) - Títulos de seção */
.text-subtitle  /* 18px (1.125rem) - Subtítulos */
.text-body      /* 16px (1rem) - Texto corpo */
.text-small     /* 14px (0.875rem) - Texto auxiliar */
.text-tiny      /* 12px (0.75rem) - Metadados */
```

### Fontes

**Sans-serif primária:** Inter
- Altamente legível
- Usada em todo o corpo do texto
- `font-feature-settings: "rlig" 1, "calt" 1;`

**Mono (opcional):** JetBrains Mono
- Para código e dados técnicos

---

## Componentes

### Cards

```tsx
// Card básico
<div className="card">
  <h3>Título</h3>
  <p>Conteúdo</p>
</div>

// Card com hover
<div className="card-hover">
  <h3>Hover me</h3>
</div>

// Card interativo (clicável)
<div className="card-interactive">
  <h3>Click me</h3>
</div>
```

**Classes CSS:**
```css
.card {
  @apply bg-card text-card-foreground rounded-lg border border-border;
}

.card-hover {
  @apply card transition-all duration-200 hover:border-border-hover hover:shadow-md;
}

.card-interactive {
  @apply card-hover cursor-pointer hover:bg-card-hover active:scale-[0.98];
}
```

### Botões

```tsx
// Botão primário (amarelo)
<button className="btn-primary">
  Criar Processo
</button>

// Botão secundário (neutro)
<button className="btn-secondary">
  Cancelar
</button>

// Botão ghost (transparente)
<button className="btn-ghost">
  Mais opções
</button>

// Botão outline (borda)
<button className="btn-outline">
  Ver detalhes
</button>
```

### Badges

```tsx
// Status success
<span className="badge-success">
  Concluída
</span>

// Status warning
<span className="badge-warning">
  Em Revisão
</span>

// Status destructive
<span className="badge-destructive">
  Bloqueada
</span>

// Fase - Elegibilidade
<span className="badge-phase-eligibility">
  Elegibilidade
</span>

// Fase - Evidências
<span className="badge-phase-evidence">
  Evidências
</span>

// Fase - Cartas
<span className="badge-phase-letters">
  Cartas
</span>
```

### Inputs

```tsx
<input
  type="text"
  className="input"
  placeholder="Digite aqui..."
/>
```

**Estilo:**
```css
.input {
  @apply flex h-10 w-full rounded-md border border-border bg-input px-3 py-2;
  @apply text-sm text-foreground placeholder:text-muted-foreground;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;
}
```

---

## Animações

### Princípios

- **Subt is e Intencionais** - Não distraem, apenas refinam
- **Rápidas** - 150-300ms
- **Purposeful** - Cada animação tem um propósito

### Animações Disponíveis

```css
/* Fade In - Aparecimento suave */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Slide In - Entrada lateral */
.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Shimmer - Efeito de carregamento */
.animate-shimmer {
  animation: shimmer 2s infinite linear;
}
```

### Transições Globais

Todos os elementos têm transições suaves automáticas:

```css
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
```

---

## Sombras

### Sutileza é Chave

```css
/* Dark Mode - Sombras mais fortes */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.5);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.5);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);

/* Light Mode - Sombras mais suaves */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

---

## Border Radius

Cantos levemente arredondados para modernidade sem exagero:

```css
--radius-sm: 0.375rem;  /* 6px */
--radius: 0.5rem;       /* 8px */
--radius-md: 0.75rem;   /* 12px */
--radius-lg: 1rem;      /* 16px */
```

---

## Scrollbars Customizadas

### Dark Mode

```css
.scrollbar-custom {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground) / 0.3) transparent;
}

.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 4px;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
```

---

## Como Trocar Entre Dark/Light Mode

### Método 1: Toggle Manual (Recomendado)

Adicione ao HTML:

```tsx
// components/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="btn-ghost"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

### Método 2: Atalho de Teclado (Resend usa "M")

```tsx
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'm' || e.key === 'M') {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [theme]);
```

---

## Exemplos de Uso

### Dashboard Header

```tsx
<div className="container mx-auto p-8">
  <div className="mb-8 animate-fade-in">
    <h1 className="text-headline">
      Welcome back, Rafael! 👋
    </h1>
    <p className="text-muted text-small mt-2">
      You have 3 active processes
    </p>
  </div>
</div>
```

### Process Card

```tsx
<div className="card-interactive">
  <div className="flex items-start justify-between mb-4">
    <div>
      <h3 className="text-title">John Doe EB-1A</h3>
      <p className="text-muted text-small">
        Started 3 months ago
      </p>
    </div>
    <span className="badge-phase-evidence">
      Evidências
    </span>
  </div>

  <div className="space-y-2">
    <div className="flex justify-between text-small">
      <span className="text-muted">Progress</span>
      <span className="font-medium">65%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-primary transition-all duration-500"
        style={{ width: '65%' }}
      />
    </div>
  </div>

  <button className="btn-primary w-full mt-4">
    View Process
  </button>
</div>
```

### Task Table Row

```tsx
<tr className="transition-colors hover:bg-card-hover cursor-pointer">
  <td className="px-6 py-4">
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <p className="text-small font-medium">
          Gather publication evidence
        </p>
        <p className="text-tiny text-muted">
          Collect all scientific papers
        </p>
      </div>
    </div>
  </td>
  <td className="px-6 py-4">
    <span className="badge-phase-evidence">
      Evidências
    </span>
  </td>
  <td className="px-6 py-4">
    <span className="badge-warning">
      Em Revisão
    </span>
  </td>
  <td className="px-6 py-4 text-tiny text-muted">
    há 2 horas
  </td>
</tr>
```

---

## Comparação com Design Anterior

| Aspecto | Anterior | Resend-Inspired |
|---------|----------|-----------------|
| **Fundo** | Branco (#FFFFFF) | Iron (#121212) |
| **Texto** | Preto (#000) | Eggshell (#FAFAFA) |
| **Primária** | Azul vibrante | Amarelo quente |
| **Bordas** | Fortes (#E5E5E5) | Sutis (#2E2E2E) |
| **Sombras** | Pronunciadas | Discretas |
| **Cantos** | Muito arredondados | Levemente arredondados |
| **Animações** | Várias, chamativas | Poucas, sutis |
| **Transições** | 200-500ms | 150ms consistente |

---

## Benefícios do Novo Design

### 1. **Reduz Fadiga Visual**
- Modo escuro como padrão
- Contraste confortável (não extremo)
- Menos brilho da tela

### 2. **Aparência Premium**
- Inspirado em produtos SaaS modernos
- Minimalista e elegante
- Atenção aos detalhes

### 3. **Melhor Foco**
- Menos elementos visuais competindo por atenção
- Hierarquia clara
- Animações que guiam, não distraem

### 4. **Acessibilidade**
- Contraste WCAG AAA em ambos os modos
- Cores semânticas claras
- Bordas em badges para daltonismo

### 5. **Performance**
- CSS Variables nativas do navegador
- Transições GPU-accelerated
- Tailwind purge remove classes não usadas

---

## Próximos Passos

### Fase 1: Core Components ✅
- [x] Globals.css com design system
- [x] Tailwind config atualizado
- [x] Cards, botões, badges, inputs

### Fase 2: Aplicar ao Dashboard (Em Progresso)
- [ ] Dashboard page
- [ ] Process cards
- [ ] Task table
- [ ] Sidebar

### Fase 3: Interatividade
- [ ] Theme toggle (M key)
- [ ] Micro-interações
- [ ] Loading states

### Fase 4: Refina mentos
- [ ] Dark mode em todas as páginas
- [ ] Animações de transição entre páginas
- [ ] Empty states elegantes

---

## Manutenção

### Como Mudar a Cor Primária

Edite `src/app/globals.css`:

```css
/* De Amarelo para Roxo */
:root {
  --primary: 262 83% 58%;  /* Era: 48 96% 53% */
}

.light {
  --primary: 262 83% 50%;  /* Era: 48 96% 45% */
}
```

**Tudo que usa primary será atualizado automaticamente!**

### Como Adicionar Nova Cor Semântica

1. Adicione a variável no `globals.css`:
```css
:root {
  --custom: 180 50% 50%;
  --custom-foreground: 0 0% 100%;
  --custom-muted: 180 50% 15%;
}

.light {
  --custom: 180 50% 40%;
  --custom-muted: 180 50% 95%;
}
```

2. Adicione ao `tailwind.config.ts`:
```typescript
colors: {
  custom: {
    DEFAULT: 'hsl(var(--custom))',
    foreground: 'hsl(var(--custom-foreground))',
    muted: 'hsl(var(--custom-muted))',
  },
}
```

3. Use:
```tsx
<button className="bg-custom text-custom-foreground">
  Botão Custom
</button>
```

---

## Recursos

- **Resend Design**: https://resend.com
- **Tailwind CSS**: https://tailwindcss.com
- **Shadcn/UI**: https://ui.shadcn.com
- **Inter Font**: https://rsms.me/inter/
- **HSL Colors**: https://hslpicker.com

---

## Status

**Design System**: ✅ Implementado
**Aplicação**: 🔄 Em Progresso
**Dark Mode Toggle**: ⏳ Pendente
**Documentação**: ✅ Completa

**Última atualização**: 2025-11-16
