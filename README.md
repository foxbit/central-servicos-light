# Central de Serviços

Hub estático para gerenciar e visualizar recursos digitais — links e vídeos — em uma interface centralizada.

**Stack:** React + TypeScript + Vite + Tailwind CSS · **Hospedagem:** GitHub Pages

---

## Para a IA: Como alimentar o conteúdo

Este documento descreve exatamente o que você precisa saber para adicionar, editar ou remover itens do repositório. Toda a base de dados do site vive em dois arquivos JSON dentro de `src/data/`.

---

### Arquivos de dados

| Arquivo | O que controla |
|---|---|
| `src/data/links.json` | Repositório de Links |
| `src/data/videos.json` | Repositório de Vídeos |

Edite apenas esses dois arquivos. Nenhuma outra alteração de código é necessária para adicionar ou remover conteúdo.

---

### Estrutura de `src/data/links.json`

O arquivo é um array JSON. Cada objeto representa um card de link.

```json
[
  {
    "title": "Título descritivo da página ou ferramenta",
    "ogImage": "https://exemplo.com/og-image.png",
    "url": "https://exemplo.com",
    "customTags": ["tag1", "tag2", "tag3"],
    "notes": "Descrição curta explicando para que serve e quando usar."
  }
]
```

**Descrição de cada campo:**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `title` | string | sim | Título da página. Use o título real da página ou o nome da ferramenta. Pode incluir tagline após ` — `. |
| `ogImage` | string (URL) | sim | URL da imagem Open Graph da página. Aparece como banner do card. Se não souber, use `""` — o card exibirá um placeholder. |
| `url` | string (URL) | sim | URL completa do link, incluindo `https://`. |
| `customTags` | array de strings | sim | Entre 2 e 5 tags em minúsculas, sem espaços (use hífen se necessário). Usadas na busca e exibidas como badges coloridos. |
| `notes` | string | sim | Frase ou duas explicando o que é e para que serve. Tom direto e informativo. Pode ser vazio `""` se não houver contexto útil. |

**Como obter a `ogImage` de uma URL:**
1. Acesse a URL no navegador.
2. Inspecione o `<head>` da página e procure por `<meta property="og:image" content="...">`.
3. Use o valor do atributo `content`.
4. Alternativa rápida: acesse `https://opengraph.io/api/1.1/site/{URL_ENCODED}` para consultar metadados.

**Regras para `customTags`:**
- Tudo em minúsculas: `"dev"`, não `"Dev"` ou `"DEV"`.
- Sem espaços: use hífen para compostos: `"design-system"`, `"boas-práticas"`.
- Prefira termos genéricos e reutilizáveis entre itens: `"ferramenta"`, `"frontend"`, `"ia"`, `"produtividade"`, `"documentação"`, `"api"`, `"design"`, `"dev"`, `"utilidade"`.
- As tags alimentam a busca — escolha termos que o usuário digitaria para encontrar esse link.

---

### Estrutura de `src/data/videos.json`

O arquivo é um array JSON. Cada objeto representa um card de vídeo.

```json
[
  {
    "title": "Título exato do vídeo",
    "channel": "Nome do Canal",
    "thumbnail": "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
    "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
    "tags": ["tag1", "tag2", "tag3"]
  }
]
```

**Descrição de cada campo:**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `title` | string | sim | Título do vídeo, idealmente o título original do YouTube. |
| `channel` | string | sim | Nome do canal exatamente como aparece no YouTube. |
| `thumbnail` | string (URL) | sim | URL da thumbnail. Veja o padrão abaixo para gerar automaticamente. |
| `youtubeUrl` | string (URL) | sim | URL completa do vídeo no YouTube. |
| `tags` | array de strings | sim | Entre 2 e 5 tags em minúsculas. Mesmas regras das tags de links. |

**Como extrair o `VIDEO_ID` e montar a `thumbnail`:**

Dado o link `https://www.youtube.com/watch?v=dQw4w9WgXcQ`:
- `VIDEO_ID` = `dQw4w9WgXcQ` (o valor após `?v=`)
- `thumbnail` = `https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`

Qualidade de thumbnail disponível (em ordem de preferência):
1. `maxresdefault.jpg` — 1280×720, nem sempre disponível em vídeos antigos.
2. `hqdefault.jpg` — 480×360, sempre disponível como fallback.

Se `maxresdefault.jpg` não existir (retorna imagem cinza), use `hqdefault.jpg`.

Para links no formato curto `https://youtu.be/VIDEO_ID`, o ID é a parte após a última `/`.

---

### Exemplos completos

**Link:**
```json
{
  "title": "Vercel — Deploy instantâneo para frontend",
  "ogImage": "https://assets.vercel.com/image/upload/front/vercel/dps.png",
  "url": "https://vercel.com",
  "customTags": ["deploy", "hosting", "frontend", "dev"],
  "notes": "Plataforma de deploy para projetos frontend. Integração nativa com GitHub e suporte a serverless functions."
}
```

**Vídeo:**
```json
{
  "title": "Aprenda React em 1 hora — Curso Completo para Iniciantes",
  "channel": "Traversy Media",
  "thumbnail": "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
  "youtubeUrl": "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
  "tags": ["react", "frontend", "iniciante", "javascript"]
}
```

---

### Regras de edição

1. **Sempre mantenha o array válido.** O arquivo inteiro deve ser um JSON array `[...]` com objetos separados por vírgula. O último objeto não leva vírgula após o `}`.
2. **Não adicione o campo `id`.** Ele é gerado automaticamente pela aplicação em tempo de execução. Incluí-lo no JSON não causa erro, mas é desnecessário.
3. **Não reordene campos dentro do objeto** — mantenha a ordem `title`, `ogImage`/`thumbnail`, `url`/`youtubeUrl`, `tags`/`customTags`, `notes` para consistência e legibilidade.
4. **Strings com caracteres especiais** (aspas, barras) devem ser escapadas: `\"` e `\\`.
5. **Não use comentários** — JSON não suporta comentários. Remova qualquer `//` ou `/* */` antes de salvar.
6. **Valide o JSON** antes de fazer commit. Use `JSON.parse()` no console do navegador ou um validador online. Um JSON inválido quebrará o site completamente (tela em branco).

---

### Como adicionar um novo item

**Adicionar ao fim do array** (posição padrão — novos itens aparecem no final da listagem):

```json
[
  { ...item existente... },
  { ...item existente... },
  {
    "title": "Novo item",
    "ogImage": "https://...",
    "url": "https://...",
    "customTags": ["tag1", "tag2"],
    "notes": "Descrição."
  }
]
```

**Remover um item:** Delete o objeto inteiro (do `{` ao `}` inclusive) e ajuste a vírgula do item anterior se necessário.

---

### Fluxo de deploy

O site é **estático** e gerado a partir dos arquivos JSON em tempo de build. Após editar os arquivos:

1. Faça commit das alterações em `src/data/links.json` e/ou `src/data/videos.json`.
2. O pipeline de CI/CD (`npm run build`) gera o novo `dist/` automaticamente.
3. O GitHub Pages publica o conteúdo atualizado.

**Nenhuma reinicialização de servidor, nenhuma API, nenhum banco de dados.** O site inteiro é HTML + JS + arquivos estáticos.
