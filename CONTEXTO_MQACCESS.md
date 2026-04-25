# CONTEXTO_MQACCESS.md
> **Fonte da Verdade** — Toda decisão de arquitetura, UI e código deve ser validada contra este documento.
> Última atualização: 2026-04-25

---

## 0. Visão Geral do Produto

**MQ ACCESS** é um Web App freemium voltado para executivos e alta gestão. O modelo de monetização opera por compras in-app nas seguintes vertentes:

| Produto        | Descrição                                              |
|----------------|--------------------------------------------------------|
| **Cursos**     | Conteúdo exclusivo em vídeo e texto, acesso individual |
| **Livros**     | Versões físicas e digitais (ePub/PDF)                  |
| **Assinaturas**| Planos de acesso recorrente (mensal/anual)             |
| **Eventos**    | Ingressos e acessos VIP para eventos de alto nível     |

---

## 1. A Estética: "Premium Black Top" (App Version)

### 1.1 Tema Central
- **Dark Mode Absoluto e Utilitário.** O fundo de telas e contêineres principais é **Preto Puro `#000000`**.
- Toda interface comunica exclusividade, controle e autoridade — sem distrações visuais.

### 1.2 Profundidade e Elevação
- **Proibido** o uso de `box-shadow` convencional para separar elementos.
- A hierarquia visual é criada exclusivamente por:
  - **Bordas ultra finas:** `border border-white/5` (equivalente a ~1px branco com 5% de opacidade)
  - **Variações mínimas de cinza** para fundos de cards e contêineres:
    - Tela/Background raiz: `#000000`
    - Cards de primeiro nível: `#0A0A0A`
    - Cards aninhados/elevated: `#111111`
    - Bordas padrão: `rgba(255, 255, 255, 0.05)`

### 1.3 Cores de Destaque (Uso Cirúrgico)

| Token                | Hex / Valor                          | Uso                                    |
|----------------------|--------------------------------------|----------------------------------------|
| `--gold-primary`     | `#C9A96E`                            | CTAs de compra, highlights de status   |
| `--gold-light`       | `#E8D5A3`                            | Hover de CTAs, estados ativos          |
| `--gold-dark`        | `#8C6D3F`                            | Bordas douradas, acentos sutis         |
| `--text-primary`     | `#F5F5F5`                            | Títulos e texto de alta hierarquia     |
| `--text-secondary`   | `#A0A0A0`                            | Labels, captions, metadados            |
| `--text-muted`       | `#4A4A4A`                            | Texto desabilitado, placeholders       |
| `--surface-0`        | `#000000`                            | Background raiz                        |
| `--surface-1`        | `#0A0A0A`                            | Cards primários                        |
| `--surface-2`        | `#111111`                            | Cards elevados, modais                 |

> **Regra de ouro:** O dourado aparece APENAS em elementos de ação e status premium. Nunca como cor decorativa generalizada.

### 1.4 Tipografia

```
Títulos / Headers (H1–H3):
  font-family: 'Playfair Display', serif;
  Variantes: Regular 400, SemiBold 600, Bold 700
  Uso: Nomes de produtos, headers de seção, títulos de cursos/eventos

UI / Corpo do App (tudo mais):
  font-family: 'Inter', sans-serif;
  Variantes: Regular 400, Medium 500, SemiBold 600
  Uso: Menus, tabelas, listas, botões, labels, formulários
```

**Escala tipográfica base (rem):**
- `text-xs`: 0.75rem — Captions, badges
- `text-sm`: 0.875rem — Labels, metadados
- `text-base`: 1rem — Corpo padrão
- `text-lg`: 1.125rem — Subtítulos
- `text-xl`: 1.25rem — Títulos de card
- `text-2xl`–`text-4xl`: Headers de seção
- `text-5xl`+: Headlines principais (Playfair)

### 1.5 Micro-interações

- **Filosofia:** Respostas rápidas, nunca saltitantes. Luxo é suavidade, não energia excessiva.
- **Transição padrão de botões:** `transition: background-color 200ms ease, color 200ms ease;`
  - Botões **preenchem de cor suavemente** — sem `scale`, sem `translateY`.
- **Duração padrão:** 150ms–300ms para feedback imediato, 400ms–600ms para transições de rota.
- **Easing padrão:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material Emphasized) para entradas, `ease-out` para saídas.
- **Revelações de conteúdo:** Fade-in com leve translateY (12px → 0) via GSAP.
- **Cursor:** Sempre `cursor-pointer` em elementos interativos, sem exceções.

---

## 2. Stack Tecnológica

### 2.1 Core

| Camada          | Tecnologia                          | Versão Target | Justificativa                                                      |
|-----------------|--------------------------------------|---------------|--------------------------------------------------------------------|
| Framework       | **Astro**                            | ^5.x          | SSG/SSR híbrido, zero-JS por padrão, ilhas reativas               |
| Estilização     | **Tailwind CSS**                     | ^4.x          | Utility-first, integração nativa com Astro                        |
| Reatividade UI  | **Alpine.js**                        | ^3.x          | Micro-interatividade (dropdowns, toggles) sem bundle pesado       |
| Reatividade UI  | **React** (Ilhas)                    | ^19.x         | Apenas para componentes com estado complexo (ex: player de curso) |
| Animações       | **GSAP**                             | ^3.x          | Transições de rota, revelações de dashboard, timelines precisas   |
| Navegação SPA   | **View Transitions API (Astro)**     | Nativo        | Sensação de SPA sem overhead de roteador client-side              |

### 2.2 Regras de Uso de Ilhas

```
✅ USE REACT ISLAND quando:
   - Componente tem estado assíncrono complexo (player de vídeo, formulários multi-step)
   - Requer comunicação bidirecional em tempo real
   - Lógica de UI com múltiplos useEffect encadeados

✅ USE ALPINE.JS quando:
   - Toggles simples (abrir/fechar modal, accordion)
   - Formulários com validação básica
   - Carrossel simples, tabs, dropdowns

❌ NÃO USE nenhum dos dois quando:
   - A interatividade puder ser resolvida com CSS puro (:hover, :focus-within)
   - O componente é puramente de apresentação/conteúdo
```

### 2.3 Fontes (Google Fonts)

```html
<!-- Incluir no <head> de todos os layouts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## 3. Arquitetura e Fluxo de Telas (Sitemap)

### 3.1 Estrutura de Roteamento (`src/pages/`)

```
src/
└── pages/
    ├── index.astro                  # Redirect → /auth/login
    │
    ├── auth/
    │   ├── login.astro              # Tela de Login
    │   ├── cadastro.astro           # Tela de Cadastro
    │   └── esqueceu-senha.astro     # Recuperação de Senha
    │
    └── app/
        ├── home/
        │   └── index.astro          # Dashboard Principal (Home)
        │       # Seções internas: Análises, Cursos, Livros, Eventos
        │
        ├── compras/
        │   └── index.astro          # Minhas Compras
        │       # TabBar interna: Digital | Eventos | Livros
        │
        └── perfil/
            └── index.astro          # Perfil do Usuário
                # Seções: Editar, Anotações, Favoritos, Notificações,
                #         Afiliação, Termos, Ajuda, Suporte, Sair
```

### 3.2 Detalhamento de Telas

#### A. Módulo de Autenticação (`/auth`)

| Rota                       | Componentes Principais                                     |
|----------------------------|------------------------------------------------------------|
| `/auth/login`              | Logo MQ ACCESS, campo email, campo senha, CTA "Entrar", link "Esqueceu a senha?", link "Criar conta" |
| `/auth/cadastro`           | Logo, campos (nome, email, senha, confirmar senha), CTA "Criar Minha Conta" |
| `/auth/esqueceu-senha`     | Logo, campo email, CTA "Enviar Link de Recuperação"        |

**Design de Auth:**
- Background: `#000000` com logo centralizado
- Cards de formulário: `background: #0A0A0A`, `border: 1px solid rgba(255,255,255,0.05)`
- CTA principal: Gold (`#C9A96E`) com texto preto, transição suave de `background-color`

#### B. Home — Dashboard Principal (`/app/home`)

Estrutura em **scroll vertical** com seções distintas:

1. **Análises / Métricas**
   - Cards de KPIs (cursos concluídos, eventos participados, assinatura ativa)
   - Estilo: Grid 2x2 mobile, 4 colunas desktop

2. **Cursos em Destaque**
   - Scroll horizontal de cards (carrossel)
   - Card: thumbnail, título (Playfair), instructor, badge de preço/acesso
   - CTA de compra: botão dourado

3. **Livros**
   - Grid de capas com título e autor
   - Badge "Físico" ou "Digital"

4. **Próximos Eventos**
   - Lista vertical de cards de evento
   - Dados: data, local, nome do evento, preço do ingresso VIP
   - CTA: "Garantir Ingresso" (dourado)

#### C. Minhas Compras (`/app/compras`)

- **TabBar** interna (sticky ao topo da área de conteúdo):

| Tab       | Conteúdo                                               |
|-----------|--------------------------------------------------------|
| Digital   | Lista de cursos ativos + status de assinaturas         |
| Eventos   | Ingressos comprados com QR Code ou link de acesso      |
| Livros    | Biblioteca digital (ePubs/PDFs acessíveis)             |

#### D. Perfil (`/app/perfil`)

- Lista vertical de itens de menu (chevron à direita):
  - Editar Perfil
  - Minhas Anotações
  - Favoritos
  - Notificações
  - Link de Afiliação ⭐ (badge dourado — feature premium)
  - — (separador) —
  - Termos de Uso
  - Ajuda
  - Suporte
  - — (separador) —
  - **Sair** (texto vermelho muted — ação destrutiva)

### 3.3 Navegação Principal

#### Mobile (< 768px): Bottom Navigation Bar
```
┌─────────────────────────────────────────────┐
│  [🏠 Home]  [🛒 Compras]  [👤 Perfil]      │
└─────────────────────────────────────────────┘
Background: #0A0A0A
Border-top: 1px solid rgba(255,255,255,0.05)
Item ativo: ícone + label dourados (#C9A96E)
Item inativo: ícone + label cinza (#4A4A4A)
```

#### Desktop (≥ 768px): Sidebar Mínima (Colapsed)
```
┌──────┬─────────────────────────────────────┐
│  MQ  │                                     │
│ ─── │      Área de Conteúdo               │
│ 🏠  │                                     │
│ 🛒  │                                     │
│ 👤  │                                     │
│     │                                     │
└──────┴─────────────────────────────────────┘
Largura sidebar: 64px (ícones apenas)
Hover: tooltip com nome da seção
```

---

## 4. Componentes Globais

### 4.1 Hierarquia de Botões

```
Primary (CTA de Compra):
  background: #C9A96E → hover: #E8D5A3
  color: #000000
  padding: 12px 24px
  border-radius: 4px
  font: Inter 600 14px
  transition: background-color 200ms ease

Secondary (Ação Neutra):
  background: transparent
  border: 1px solid rgba(255,255,255,0.15)
  color: #F5F5F5
  hover: border-color rgba(255,255,255,0.4)

Ghost / Destrutivo:
  background: transparent
  color: #ef4444 (vermelho, 60% opacity no estado normal)
  hover: color: #ef4444 (100% opacity)
```

### 4.2 Cards de Produto

```
background: #0A0A0A
border: 1px solid rgba(255,255,255,0.05)
border-radius: 8px
padding: 16px
hover: border-color rgba(201,169,110,0.2) [dourado sutil]
transition: border-color 200ms ease
```

### 4.3 Inputs de Formulário

```
background: #0A0A0A
border: 1px solid rgba(255,255,255,0.08)
border-radius: 4px
color: #F5F5F5
padding: 12px 16px
focus: border-color #C9A96E, outline: none
placeholder-color: #4A4A4A
```

---

## 5. Padrões de Animação (GSAP)

### 5.1 View Transition de Rota (Astro)
```js
// src/scripts/transitions.js
import { gsap } from 'gsap';

document.addEventListener('astro:page-load', () => {
  gsap.from('main', {
    opacity: 0,
    y: 12,
    duration: 0.4,
    ease: 'power2.out',
  });
});
```

### 5.2 Revelação de Cards no Scroll
```js
gsap.from('.card-reveal', {
  opacity: 0,
  y: 24,
  stagger: 0.08,
  duration: 0.5,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.card-reveal',
    start: 'top 85%',
  },
});
```

---

## 6. Regras Absolutas (Não Negociáveis)

1. **Nunca** usar `box-shadow` para separação de elementos — apenas bordas e variações de `background-color`.
2. **Nunca** usar branco puro (`#FFFFFF`) como cor de texto — máximo `#F5F5F5`.
3. **Nunca** usar o dourado como cor decorativa genérica — apenas em CTAs de compra e status premium.
4. **Nunca** adicionar `scale()` ou `translateY` a hover de botões — apenas transições de cor/border.
5. **Nunca** usar fontes padrão do sistema — sempre Inter + Playfair Display.
6. **Sempre** garantir que telas protegidas (`/app/*`) verificam autenticação no servidor (Astro middleware).
7. **Sempre** priorizar a performance: lazy-load de imagens, without JavaScript when possible.
8. **Sempre** mobile-first: breakpoints são adições de complexidade, não a base.

---

## 7. Estrutura de Arquivos do Projeto

```
mqaccess/
├── CONTEXTO_MQACCESS.md         ← Este arquivo (Fonte da Verdade)
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
│
├── public/
│   ├── fonts/                   # Fallback local de fontes se necessário
│   └── icons/                   # SVGs de ícones (sistema próprio)
│
└── src/
    ├── layouts/
    │   ├── BaseLayout.astro      # HTML shell, meta tags, fontes, GSAP init
    │   ├── AuthLayout.astro      # Layout para telas de autenticação
    │   └── AppLayout.astro       # Layout protegido: Bottom Nav + Sidebar
    │
    ├── components/
    │   ├── ui/                   # Componentes atômicos (Button, Card, Input, Badge)
    │   ├── nav/                  # BottomNav.astro, Sidebar.astro
    │   ├── home/                 # Seções do Home (AnalyticsSection, CoursesCarousel...)
    │   ├── compras/              # TabBar, PurchaseCard...
    │   └── perfil/               # ProfileMenuItem, ProfileHeader...
    │
    ├── pages/
    │   ├── index.astro           # Redirect para /auth/login
    │   ├── auth/
    │   │   ├── login.astro
    │   │   ├── cadastro.astro
    │   │   └── esqueceu-senha.astro
    │   └── app/
    │       ├── home/index.astro
    │       ├── compras/index.astro
    │       └── perfil/index.astro
    │
    ├── styles/
    │   └── global.css            # Variáveis CSS, reset, classes utilitárias globais
    │
    └── scripts/
        └── transitions.js        # Lógica GSAP para View Transitions
```

---

*Este documento é mantido pelo time de arquitetura. Toda proposta de desvio dos padrões aqui definidos deve ser documentada e justificada antes de ser implementada.*
