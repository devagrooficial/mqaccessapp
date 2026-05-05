# DATABASE_ARCHITECTURE.md — MQ ACCESS
> **Backend:** Supabase (PostgreSQL 15+) · **Atualizado:** 2026-04-27

---

## 1. Entidades Principais

| # | Tabela | Descrição |
|---|--------|-----------|
| 1 | `profiles` | Extensão do `auth.users` — dados públicos do perfil |
| 2 | `products` | Catálogo unificado: cursos, livros digitais, livros físicos |
| 3 | `course_modules` | Módulos de um curso |
| 4 | `course_lessons` | Aulas individuais dentro de módulos |
| 5 | `course_lesson_files` | Arquivos para download por aula |
| 6 | `events` | Eventos presenciais (Summit MQ, etc.) |
| 7 | `event_ticket_tiers` | Categorias de ingresso por evento |
| 8 | `event_agenda` | Agenda do dia de cada evento |
| 9 | `event_speakers` | Palestrantes por evento |
| 10 | `purchases` | Compras realizadas (produto ou ingresso) |
| 11 | `tickets` | Ingressos emitidos pós-compra com QR code |
| 12 | `physical_book_orders` | Pedidos de livros físicos com rastreio |
| 13 | `course_progress` | Progresso do usuário por curso/aula |
| 14 | `lesson_notes` | Anotações do usuário por aula |
| 15 | `behavioral_analyses` | Sessões de mapeamento comportamental |
| 16 | `analysis_answers` | Respostas individuais por questão |
| 17 | `subscriptions` | Planos de assinatura recorrente |
| 18 | `user_favorites` | Produtos favoritados pelo usuário |

---

## 2. Mapeamento Tela → Tabela

### `auth/login.astro`
| Campo | Tabela/Coluna | Op |
|-------|---------------|----|
| E-mail | `auth.users.email` | signInWithPassword |
| Senha | `auth.users.password` | signInWithPassword |

### `auth/cadastro.astro`
| Campo | Tabela/Coluna | Op |
|-------|---------------|----|
| Nome completo | `profiles.full_name` | INSERT via trigger |
| E-mail | `auth.users.email` | signUp |
| Senha | `auth.users.password` | signUp |

### `app/home/index.astro`
| Seção | Tabelas | Colunas |
|-------|---------|---------|
| KPIs | `behavioral_analyses` | `status`, `type` |
| Cursos | `products` | `title`, `type`, `thumbnail_url`, `price_brl`, `author` |
| Livros | `products` | `title`, `cover_url`, `product_format` |
| Eventos | `events` | `title`, `date`, `location`, `banner_url`, `available_spots` |
| Assinatura | `subscriptions` | `plan`, `status`, `expires_at` |

### `app/detalhes.astro` (Produto/Curso)
| Elemento | Tabela/Coluna |
|----------|---------------|
| Tipo/Badge | `products.type` |
| Título | `products.title` |
| Autor | `products.author` |
| Descrição | `products.description` |
| Preço | `products.price_brl` |
| Thumbnail | `products.thumbnail_url` |
| Módulos | `course_modules.title`, `.lesson_count`, `.duration_min` |
| Stats | `products.total_hours`, `.total_lessons`, `.access_type` |
| Já comprou? | `purchases.user_id` + `purchases.product_id` |

### `app/detalhes-evento.astro`
| Elemento | Tabela/Coluna |
|----------|---------------|
| Título | `events.title` |
| Data | `events.date` |
| Local | `events.venue_name`, `.venue_address` |
| Banner | `events.banner_url` |
| Vagas | `events.available_spots` |
| Agenda | `event_agenda.time`, `.title`, `.description` |
| Palestrantes | `event_speakers.name`, `.role`, `.avatar_url` |
| Ingressos | `event_ticket_tiers.name`, `.price_brl`, `.perks` |

### `app/checkout.astro`
| Elemento | Tabela/Coluna | Op |
|----------|---------------|----|
| Produto principal | `products.title`, `.price_brl` | SELECT |
| Upsell (livro) | `products` (type=physical_book) | SELECT |
| Confirmar compra | `purchases` | INSERT |

**INSERT em `purchases`:** `user_id`, `product_id`, `amount_brl`, `installments`, `payment_status`

### `app/checkout-evento.astro`
| Elemento | Tabela/Coluna | Op |
|----------|---------------|----|
| Evento | `events.title`, `.date` | SELECT |
| Tier | `event_ticket_tiers.name`, `.price_brl` | SELECT |
| Ingresso | `tickets` | INSERT |
| Compra | `purchases` | INSERT |

### `app/player.astro`
| Elemento | Tabela/Coluna | Op |
|----------|---------------|----|
| Nome curso (topbar) | `products.title` | SELECT |
| Progresso geral | `course_progress.overall_percent` | SELECT |
| Lista aulas | `course_lessons.title`, `.duration_seconds` | SELECT |
| Aula ativa | `course_progress.last_lesson_id` | SELECT |
| Marcar concluída | `course_progress.completed_lessons` | UPDATE |
| Posição no seek | `course_progress.last_position_seconds` | UPDATE |
| Descrição aula | `course_lessons.description`, `.key_points` | SELECT |
| Downloads | `course_lesson_files.name`, `.url`, `.size_bytes` | SELECT |
| Anotações | `lesson_notes.content` | SELECT/INSERT |

### `app/ingresso.astro`
| Elemento | Tabela/Coluna |
|----------|---------------|
| Nome evento | `events.title` |
| Data/Local | `events.date`, `events.venue_name` |
| Categoria | `event_ticket_tiers.name`, `.access_level` |
| Código QR | `tickets.qr_payload`, `.ticket_code` |
| Titular | `profiles.full_name` |

### `app/rastreio-livro.astro`
| Elemento | Tabela/Coluna |
|----------|---------------|
| Nº pedido | `physical_book_orders.order_code` |
| Título livro | `products.title` |
| Etapas | `physical_book_orders.tracking_steps` (jsonb) |
| Etapa atual | `physical_book_orders.current_step` |
| Código rastreio | `physical_book_orders.tracking_code` |
| Previsão entrega | `physical_book_orders.estimated_delivery` |

### `app/analises.astro`
| Elemento | Tabela/Coluna |
|----------|---------------|
| Lista análises | `behavioral_analyses.type`, `.status`, `.estimated_minutes` |

### `app/analise-detalhes.astro`
| Elemento | Tabela/Coluna |
|----------|---------------|
| Título/status | `behavioral_analyses.type`, `.status` |

### `app/pergunta.astro`
| Elemento | Tabela/Coluna | Op |
|----------|---------------|----|
| Pergunta | `analysis_questions.text`, `.options` | SELECT |
| Salvar resposta | `analysis_answers` | INSERT |
| Progresso | `behavioral_analyses.current_question` | UPDATE |

### `app/relatorio.astro`
| Elemento | Tabela/Coluna |
|----------|---------------|
| Resultado | `behavioral_analyses.result_data` (jsonb) |
| Perfil dominante | `behavioral_analyses.dominant_profile` |
| Plano de ação | `behavioral_analyses.action_plan` (jsonb) |
| Conclusão | `behavioral_analyses.completed_at` |

### `app/compras/index.astro`
| Tab | Tabelas | Colunas |
|-----|---------|---------|
| Digital | `purchases` + `products` | `type`, `title`, `thumbnail_url`, `access_url` |
| Digital | `subscriptions` | `plan`, `status`, `expires_at` |
| Eventos | `tickets` + `events` | `ticket_code`, `events.title`, `events.date` |
| Livros | `physical_book_orders` + `products` | `order_code`, `current_step`, `tracking_code` |

### `app/perfil/index.astro`
| Elemento | Tabela/Coluna | Op |
|----------|---------------|----|
| Avatar/Nome | `profiles.avatar_url`, `.full_name` | SELECT/UPDATE |
| Anotações | `lesson_notes` | SELECT |
| Favoritos | `user_favorites.product_id` | SELECT |
| Link afiliação | `profiles.affiliate_code` | SELECT |
| Sair | — | `auth.signOut()` |

---

## 3. Schema com Tipagem Postgres

### `profiles`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | FK → `auth.users.id` CASCADE |
| `full_name` | `text` NOT NULL | |
| `avatar_url` | `text` | URL do Supabase Storage |
| `affiliate_code` | `text` UNIQUE | Gerado no cadastro |
| `created_at` | `timestamptz` | DEFAULT now() |
| `updated_at` | `timestamptz` | DEFAULT now() |

### `products`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `title` | `text` NOT NULL | |
| `type` | `text` | CHECK IN ('masterclass','ebook','physical_book') |
| `author` | `text` | |
| `description` | `text` | |
| `thumbnail_url` | `text` | |
| `cover_url` | `text` | Para livros |
| `price_brl` | `int8` | Em centavos (ex: 199700 = R$1.997) |
| `access_type` | `text` | CHECK IN ('lifetime','subscription') |
| `total_hours` | `numeric(5,2)` | |
| `total_lessons` | `int4` | |
| `product_format` | `text` | CHECK IN ('digital','physical','both') |
| `is_active` | `boolean` | DEFAULT true |
| `created_at` | `timestamptz` | DEFAULT now() |

### `course_modules`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `product_id` | `uuid` | FK → `products.id` |
| `title` | `text` NOT NULL | |
| `order` | `int4` NOT NULL | |
| `lesson_count` | `int4` | |
| `duration_min` | `int4` | |

### `course_lessons`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `module_id` | `uuid` | FK → `course_modules.id` |
| `product_id` | `uuid` | FK → `products.id` |
| `title` | `text` NOT NULL | |
| `order` | `int4` NOT NULL | |
| `description` | `text` | |
| `key_points` | `jsonb` | Array de strings |
| `duration_seconds` | `int4` | |
| `video_url` | `text` | |

### `course_lesson_files`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `lesson_id` | `uuid` | FK → `course_lessons.id` |
| `name` | `text` | "Mapa Mental — Fator Alfa.pdf" |
| `url` | `text` | |
| `size_bytes` | `int8` | |

### `events`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `title` | `text` NOT NULL | |
| `tagline` | `text` | |
| `date` | `timestamptz` NOT NULL | |
| `duration_hours` | `int4` | |
| `venue_name` | `text` | "Grand Hyatt Hotel" |
| `venue_address` | `text` | |
| `banner_url` | `text` | |
| `available_spots` | `int4` | |
| `is_active` | `boolean` | DEFAULT true |
| `created_at` | `timestamptz` | DEFAULT now() |

### `event_ticket_tiers`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `event_id` | `uuid` | FK → `events.id` |
| `name` | `text` | "Acesso VIP" |
| `price_brl` | `int8` | Em centavos |
| `perks` | `jsonb` | Array de strings |
| `access_level` | `text` | CHECK IN ('standard','executive','vip') |
| `max_spots` | `int4` | |

### `purchases`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `user_id` | `uuid` | FK → `auth.users.id` |
| `product_id` | `uuid` | FK → `products.id` (nullable) |
| `ticket_tier_id` | `uuid` | FK → `event_ticket_tiers.id` (nullable) |
| `amount_brl` | `int8` | Em centavos |
| `installments` | `int4` | DEFAULT 1 |
| `payment_method` | `text` | CHECK IN ('credit_card','pix','boleto') |
| `payment_status` | `text` | CHECK IN ('pending','approved','failed','refunded') |
| `gateway_tx_id` | `text` | ID na gateway |
| `created_at` | `timestamptz` | DEFAULT now() |

### `tickets`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `purchase_id` | `uuid` | FK → `purchases.id` |
| `user_id` | `uuid` | FK → `auth.users.id` |
| `event_id` | `uuid` | FK → `events.id` |
| `tier_id` | `uuid` | FK → `event_ticket_tiers.id` |
| `ticket_code` | `text` UNIQUE | "MQ-2026-0041" |
| `qr_payload` | `text` | String do QR |
| `is_used` | `boolean` | DEFAULT false |
| `used_at` | `timestamptz` | |
| `created_at` | `timestamptz` | DEFAULT now() |

### `physical_book_orders`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `purchase_id` | `uuid` | FK → `purchases.id` |
| `user_id` | `uuid` | FK → `auth.users.id` |
| `product_id` | `uuid` | FK → `products.id` |
| `order_code` | `text` UNIQUE | "#0042" |
| `tracking_code` | `text` | Correios |
| `current_step` | `int4` | 1–6 |
| `tracking_steps` | `jsonb` | [{id, label, state, date}] |
| `estimated_delivery` | `daterange` | |
| `shipping_address` | `jsonb` | {street, city, state, zip} |
| `created_at` | `timestamptz` | DEFAULT now() |

### `course_progress`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `user_id` | `uuid` | FK → `auth.users.id` |
| `product_id` | `uuid` | FK → `products.id` |
| `last_lesson_id` | `uuid` | FK → `course_lessons.id` |
| `completed_lessons` | `uuid[]` | Array de lesson IDs |
| `overall_percent` | `int4` | 0–100 |
| `last_position_seconds` | `int4` | |
| `updated_at` | `timestamptz` | DEFAULT now() |

### `lesson_notes`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `user_id` | `uuid` | FK → `auth.users.id` |
| `lesson_id` | `uuid` | FK → `course_lessons.id` |
| `content` | `text` | |
| `created_at` | `timestamptz` | DEFAULT now() |
| `updated_at` | `timestamptz` | DEFAULT now() |

### `behavioral_analyses`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `user_id` | `uuid` | FK → `auth.users.id` |
| `type` | `text` | CHECK IN ('egogram','disc','enneagram') |
| `status` | `text` | CHECK IN ('pending','in_progress','completed') |
| `estimated_minutes` | `int4` | |
| `current_question` | `int4` | DEFAULT 0 |
| `dominant_profile` | `text` | Ex: "Adulto", "D — Dominância" |
| `result_data` | `jsonb` | Scores por dimensão |
| `action_plan` | `jsonb` | Array de diretrizes |
| `started_at` | `timestamptz` | |
| `completed_at` | `timestamptz` | |

### `analysis_answers`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `analysis_id` | `uuid` | FK → `behavioral_analyses.id` |
| `question_order` | `int4` | |
| `selected_option` | `text` | |
| `created_at` | `timestamptz` | DEFAULT now() |

### `subscriptions`
| Coluna | Tipo | Notas |
|--------|------|-------|
| `id` | `uuid` PK | |
| `user_id` | `uuid` | FK → `auth.users.id` |
| `plan` | `text` | CHECK IN ('monthly','annual') |
| `status` | `text` | CHECK IN ('active','cancelled','past_due') |
| `starts_at` | `timestamptz` | |
| `expires_at` | `timestamptz` | |
| `gateway_sub_id` | `text` | |

---

## 4. Diagrama de Relacionamentos

```
auth.users (Supabase gerenciado)
    │
    ├──< profiles (1:1)
    ├──< purchases (1:N) ──> products
    │                   ──> event_ticket_tiers ──> events
    ├──< tickets (1:N) ──> events, event_ticket_tiers
    ├──< physical_book_orders (1:N) ──> products
    ├──< course_progress (1:N) ──> products, course_lessons
    ├──< lesson_notes (1:N) ──> course_lessons
    ├──< behavioral_analyses (1:N)
    │       └──< analysis_answers (1:N)
    ├──< subscriptions (1:N)
    └──< user_favorites (N:N) ──> products

products
    └──< course_modules (1:N)
            └──< course_lessons (1:N)
                    └──< course_lesson_files (1:N)

events
    ├──< event_agenda (1:N)
    ├──< event_speakers (1:N)
    └──< event_ticket_tiers (1:N)
```

---

## 5. DDL Inicial (Supabase SQL Editor)

```sql
-- PROFILES
CREATE TABLE profiles (
  id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    text NOT NULL,
  avatar_url   text,
  affiliate_code text UNIQUE DEFAULT gen_random_uuid()::text,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_profile" ON profiles USING (auth.uid() = id);

-- TRIGGER: cria profile automaticamente no sign-up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- PRODUCTS
CREATE TABLE products (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text NOT NULL,
  type           text NOT NULL CHECK (type IN ('masterclass','ebook','physical_book')),
  author         text,
  description    text,
  thumbnail_url  text,
  cover_url      text,
  price_brl      int8 NOT NULL DEFAULT 0,
  access_type    text CHECK (access_type IN ('lifetime','subscription')),
  total_hours    numeric(5,2),
  total_lessons  int4,
  product_format text CHECK (product_format IN ('digital','physical','both')),
  is_active      boolean DEFAULT true,
  created_at     timestamptz DEFAULT now()
);

-- EVENTS
CREATE TABLE events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text NOT NULL,
  tagline         text,
  date            timestamptz NOT NULL,
  duration_hours  int4,
  venue_name      text,
  venue_address   text,
  banner_url      text,
  available_spots int4,
  is_active       boolean DEFAULT true,
  created_at      timestamptz DEFAULT now()
);

-- PURCHASES
CREATE TABLE purchases (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid NOT NULL REFERENCES auth.users(id),
  product_id       uuid REFERENCES products(id),
  ticket_tier_id   uuid,
  amount_brl       int8 NOT NULL,
  installments     int4 DEFAULT 1,
  payment_method   text CHECK (payment_method IN ('credit_card','pix','boleto')),
  payment_status   text DEFAULT 'pending' CHECK (payment_status IN ('pending','approved','failed','refunded')),
  gateway_tx_id    text,
  created_at       timestamptz DEFAULT now()
);
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_purchases" ON purchases USING (auth.uid() = user_id);
```

---

## 6. Próximos Passos (Sprint 2)

> [!IMPORTANT]
> Antes de criar as tabelas, preencha o `.env` com `PUBLIC_SUPABASE_URL` e `PUBLIC_SUPABASE_ANON_KEY` do painel do Supabase em **Project Settings → API**.

| Prioridade | Tarefa |
|------------|--------|
| 🔴 Alta | Executar DDL acima no SQL Editor do Supabase |
| 🔴 Alta | Adicionar middleware Astro para proteger `/app/*` |
| 🟡 Média | Conectar `cadastro.astro` → `supabase.auth.signUp()` |
| 🟡 Média | Conectar `esqueceu-senha.astro` → `resetPasswordForEmail()` |
| 🟢 Normal | Configurar Storage buckets: `thumbnails`, `videos`, `files`, `avatars` |
| 🟢 Normal | Criar políticas RLS para todas as tabelas sensíveis |
