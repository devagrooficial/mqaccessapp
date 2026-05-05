# SUPABASE_SECURITY.md — MQ ACCESS
> Execute os scripts abaixo no **SQL Editor** do Supabase Dashboard.
> Acesso: **[app.supabase.com](https://app.supabase.com)** → Seu Projeto → **SQL Editor**

---

## 1. Políticas RLS (Row Level Security)

### 1.1 Tabela `products` — Leitura Pública

Qualquer pessoa (autenticada ou não) pode ver os produtos do catálogo.

```sql
-- Ativar RLS na tabela
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política: leitura pública irrestrita
CREATE POLICY "products_public_read"
  ON products
  FOR SELECT
  USING (true);

-- Apenas service_role pode INSERT/UPDATE/DELETE (admin via painel)
-- Nenhuma política de escrita = bloqueado por padrão para anon/authenticated
```

---

### 1.2 Tabela `purchases` — Apenas o dono vê suas compras

```sql
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- SELECT: usuário autenticado vê apenas suas próprias compras
CREATE POLICY "purchases_owner_select"
  ON purchases
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: usuário autenticado só pode criar compras com seu próprio user_id
CREATE POLICY "purchases_owner_insert"
  ON purchases
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE/DELETE: bloqueado (feito apenas via service_role/webhook da gateway)
```

---

### 1.3 Tabela `behavioral_analyses` — Dono vê e edita seus relatórios

```sql
ALTER TABLE behavioral_analyses ENABLE ROW LEVEL SECURITY;

-- SELECT: apenas o dono
CREATE POLICY "analyses_owner_select"
  ON behavioral_analyses
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: apenas para si mesmo
CREATE POLICY "analyses_owner_insert"
  ON behavioral_analyses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: apenas o dono pode atualizar (progresso, respostas)
CREATE POLICY "analyses_owner_update"
  ON behavioral_analyses
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

---

### 1.4 Tabela `profiles` — Perfil próprio

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- SELECT: qualquer autenticado pode ver perfis (para exibição pública de nome)
CREATE POLICY "profiles_authenticated_read"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- UPDATE: apenas o próprio usuário atualiza seu perfil
CREATE POLICY "profiles_owner_update"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

---

### 1.5 Tabela `tickets` — Dono vê seus ingressos

```sql
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tickets_owner_select"
  ON tickets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "tickets_owner_insert"
  ON tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

### 1.6 Tabela `physical_book_orders` — Rastreio privado

```sql
ALTER TABLE physical_book_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "book_orders_owner_select"
  ON physical_book_orders FOR SELECT
  USING (auth.uid() = user_id);
```

---

### 1.7 Tabela `course_progress` — Progresso privado

```sql
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "progress_owner_all"
  ON course_progress
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

---

### 1.8 Tabela `lesson_notes` — Anotações privadas

```sql
ALTER TABLE lesson_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notes_owner_all"
  ON lesson_notes
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

---

### 1.9 Tabela `subscriptions` — Assinatura privada

```sql
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscriptions_owner_select"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);
```

---

### 1.10 Tabelas de eventos — Leitura pública

```sql
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_ticket_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_agenda ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_speakers ENABLE ROW LEVEL SECURITY;

-- Todos podem ler informações de eventos
CREATE POLICY "events_public_read" ON events FOR SELECT USING (true);
CREATE POLICY "tiers_public_read"  ON event_ticket_tiers FOR SELECT USING (true);
CREATE POLICY "agenda_public_read" ON event_agenda FOR SELECT USING (true);
CREATE POLICY "speakers_public_read" ON event_speakers FOR SELECT USING (true);
```

---

## 2. Storage — Criação de Buckets

### 2.1 Passo a Passo no Painel

1. Acesse **Storage** no menu lateral do Supabase Dashboard
2. Clique em **"New bucket"** para cada bucket abaixo:

| Bucket | Visibilidade | Finalidade |
|--------|-------------|------------|
| `thumbnails` | **Public** | Capas de cursos, livros e eventos |
| `avatars` | **Public** | Fotos de perfil dos usuários |
| `content-files` | **Private** | PDFs, materiais de apoio das aulas |

> Para `Public`: marque a opção **"Public bucket"** na criação.
> Para `Private`: **não** marque a opção.

---

### 2.2 SQL — Políticas dos Buckets via Editor

```sql
-- ============================================================
-- BUCKET: thumbnails (público — qualquer um pode ler)
-- ============================================================
CREATE POLICY "thumbnails_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'thumbnails');

-- Upload restrito ao service_role (feito via painel admin)

-- ============================================================
-- BUCKET: avatars (público para leitura, privado para upload)
-- ============================================================
CREATE POLICY "avatars_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Usuário autenticado pode fazer upload apenas na própria pasta
CREATE POLICY "avatars_owner_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Usuário autenticado pode atualizar (trocar foto) e deletar a própria
CREATE POLICY "avatars_owner_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "avatars_owner_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- ============================================================
-- BUCKET: content-files (privado — apenas alunos que compraram)
-- ============================================================
-- Leitura: apenas usuários autenticados com compra aprovada
-- Nota: a verificação de compra deve ser feita via signed URL na API
-- Para simplicidade inicial, restringimos a qualquer autenticado:
CREATE POLICY "content_files_authenticated_read"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'content-files');
```

---

### 2.3 Convenções de Nomenclatura dos Arquivos

```
thumbnails/
  ├── courses/{product_id}.webp
  ├── books/{product_id}.webp
  └── events/{event_id}.webp

avatars/
  └── {user_id}/avatar.webp

content-files/
  └── {product_id}/{lesson_id}/{filename}.pdf
```

---

## 3. Checklist de Validação Pós-Configuração

```sql
-- Verificar se RLS está ativo em todas as tabelas sensíveis
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
-- rowsecurity deve ser TRUE para todas as tabelas com dados de usuário

-- Listar todas as políticas criadas
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;
```

> [!IMPORTANT]
> Execute o checklist de validação após criar todas as políticas para garantir que nenhuma tabela ficou sem proteção RLS.

> [!TIP]
> Para testar as políticas RLS, use o **"Table Editor"** do Supabase logado como usuário anon. Tente acessar registros de outro usuário — deve retornar vazio.
