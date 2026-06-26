# 🌱 Italo Dev Garden

> Um portfólio pessoal + jardim digital de pensamentos técnicos, construído com React 19.2, TypeScript e uma arquitetura hexagonal no backend.

[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000?style=flat&logo=vercel)](https://italodevgarden.vercel.app)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat&logo=render)](https://italo-dev-garden-api.onrender.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

## 📖 Visão Geral

**Italo Dev Garden** é um projeto fullstack que combina:

- 🎨 **Portfólio moderno** — Showcase de projetos com dark/light theme
- 🧠 **Jardim Digital** — Sistema de notas e pensamentos técnicos (Markdown)
- 🔬 **Laboratório** — Espaço para experimentos e features em desenvolvimento
- 📊 **Dashboard Admin** — Painel para gerenciar conteúdo em tempo real
- 🔄 **Real-time Updates** — WebSocket para sincronização instantânea
- ⚡ **Performance otimizado** — PageSpeed Insights: 99/100 (desktop), 84/100 (mobile)
- ♿ **Acessibilidade** — WCAG 2.1 AA compliant, navegação agêntica (3/3 ✅)
- 🔐 **Security-first** — Autenticação JWT, Firestore rules, CORS configurado

## 🚀 Features

### Frontend (React 19.2 + TypeScript)

- ✅ **Component-driven** — Componentização com TypeScript strict
- ✅ **Custom Hooks** — `useTheme`, `useNavigation`, `usePublicContent`, `useRealtimeUpdates`
- ✅ **Context API** — Estado global gerenciado com Context + Reducers
- ✅ **Dark/Light Theme** — Tema persistido em localStorage
- ✅ **Markdown Rendering** — Suporte completo a Markdown com syntax highlighting
- ✅ **Lazy Loading** — Lazy routes, lazy images, code splitting
- ✅ **WebSocket Real-time** — Socket.io para atualizações instantâneas
- ✅ **PWA Ready** — Manifest.json + offline support (partial)
- ✅ **Responsive Design** — Mobile-first, suporte até 4K
- ✅ **SEO Optimized** — Meta tags, OG tags, JSON-LD schema, sitemap.xml, llms.txt

### Backend (Express + TypeScript + Hexagonal Architecture)

- ✅ **Hexagonal Architecture** — Adapters, Domain, Use Cases separados
- ✅ **JWT Authentication** — Tokens com expiração, refresh tokens
- ✅ **Firebase Firestore** — Banco de dados NoSQL
- ✅ **Firebase Auth** — Gerenciamento de usuários
- ✅ **WebSocket (Socket.io)** — Broadcast de eventos em tempo real
- ✅ **Rate Limiting** — Proteção contra brute force
- ✅ **Audit Logging** — Log de todas as operações em JSON
- ✅ **Health Checks** — `/health` endpoint para monitoramento
- ✅ **CORS Configurado** — Whitelist de origins, preflight handling
- ✅ **Compression** — Gzip compression automática

## 🏗️ Arquitetura

### Frontend Structure

```
garden-frontend/
├── public/                    # Arquivos estáticos
│   ├── llms.txt             # AI model browsing guide (H1 + links ✅)
│   ├── robots.txt           # SEO crawler rules
│   ├── sitemap.xml          # XML sitemap
│   └── manifest.json        # PWA manifest
├── src/
│   ├── app/                 # Contextos e providers
│   │   ├── providers.tsx    # Theme + Navigation Context
│   │   └── ...
│   ├── components/
│   │   ├── layout/          # Header, Footer, MobileNav
│   │   ├── sections/        # HomeSection, ProjectsSection, etc
│   │   ├── ui/              # Componentes reutilizáveis
│   │   └── ...
│   ├── hooks/               # Custom hooks
│   │   ├── useTheme.ts
│   │   ├── useNavigation.ts
│   │   ├── usePublicContent.ts
│   │   ├── useRealtimeUpdates.ts
│   │   └── useLazyImage.ts
│   ├── types/               # TypeScript types
│   │   ├── navigation.ts
│   │   ├── admin.ts
│   │   └── ...
│   ├── styles/              # CSS global
│   │   └── markdown.css
│   ├── utils/               # Utilitários
│   ├── main.tsx             # Entry point
│   └── App.tsx              # Root component
├── index.html               # HTML template com meta tags + skip link
├── vite.config.ts           # Vite config com code splitting strategy
├── vercel.json              # Vercel SPA rewrite rules + cache headers
└── package.json
```

### Backend Structure (Hexagonal)

```
garden-backend/
├── src/
│   ├── domain/              # Regras de negócio puras
│   │   ├── entities/        # Modelos: Project, Post, Config, Lead
│   │   ├── repositories/    # Interfaces de repositório
│   │   └── errors/          # Exceções customizadas
│   ├── use-cases/           # Casos de uso
│   │   ├── CreateProjectUC.ts
│   │   ├── GetProjectsUC.ts
│   │   ├── UpdateConfigUC.ts
│   │   └── ...
│   ├── adapters/            # Adaptadores para externos
│   │   ├── inbound/         # Entrada (HTTP)
│   │   │   ├── controllers/ # Handlers de rotas
│   │   │   ├── middlewares/ # Auth, logging, CORS, broadcast
│   │   │   ├── routes.ts    # Definição de rotas
│   │   │   └── socket/      # Socket.io handlers
│   │   └── outbound/        # Saída (Firebase, email, etc)
│   │       ├── repositories/# Implementação de repos Firestore
│   │       ├── socket/      # WebSocket broadcast logic
│   │       └── health/      # Health check service
│   ├── config/              # Configurações
│   │   └── firebase.ts      # Firebase Admin SDK init
│   ├── test/                # Testes unitários
│   │   ├── authMiddleware.test.ts
│   │   └── entities.test.ts
│   └── main.ts              # Entry point com compression, CORS
├── build.sh                 # Build script para Render
├── .nvmrc                   # Node version lock (v20)
├── tsconfig.json            # TypeScript config (strict mode)
├── package.json             # Dependencies + scripts
├── firestore.rules          # Firestore security rules
└── README.md                # Backend documentation
```

## 🛠️ Tech Stack

### Frontend

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **React** | 19.2 | UI framework |
| **TypeScript** | 5.4 | Type safety |
| **Vite** | 5.x | Build tool (instant HMR) |
| **Tailwind CSS** | 3.x | Styling |
| **React Router** | 6.x | Client-side routing |
| **Socket.io Client** | 4.8 | Real-time updates |
| **React Markdown** | 8.x | Markdown rendering |
| **Lucide Icons** | Latest | Icon library |
| **Zod** | 3.23 | Runtime validation |

### Backend

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **Express** | 4.19 | HTTP server |
| **TypeScript** | 5.4 | Type safety |
| **Firebase Admin** | 14.1 | Firestore + Auth |
| **Socket.io** | 4.8 | WebSocket server |
| **Zod** | 3.23 | Schema validation |
| **express-rate-limit** | 7.3 | Rate limiting |
| **compression** | 1.7 | Gzip middleware |

### Deployment

| Serviço | Uso |
|--------|-----|
| **Vercel** | Frontend hosting + CDN + SPA routing |
| **Render** | Backend hosting + PostgreSQL optional |
| **Firebase** | Firestore + Auth |
| **UptimeRobot** | Monitoramento com `/health` endpoint (1 min ping) |

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** 20.x (veja `.nvmrc`)
- **npm** 10.x ou superior
- **Git**
- **Firebase Project** (para dev local)

### Instalação Local

#### 1. Clonar repositório

```bash
git clone https://github.com/italofvm/italo-dev-garden.git
cd italo-dev-garden
```

#### 2. Setup Frontend

```bash
cd garden-frontend

# Instalar dependências
npm install

# Rodar dev server (http://localhost:5173)
npm run dev

# Build para produção
npm run build

# Preview build local
npm run preview
```

#### 3. Setup Backend

```bash
cd ../garden-backend

# Instalar dependências
npm install

# Criar .env.local com credenciais Firebase
cat > .env.local << 'EOF'
PORT=3000
FRONTEND_ORIGINS=http://localhost:5173
FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_PRIVATE_KEY=sua-chave-privada
FIREBASE_CLIENT_EMAIL=seu-service-account@...
EOF

# Rodar dev server (http://localhost:3000)
npm run dev

# Build para produção
npm run build

# Rodar build de produção
npm start
```

#### 4. Testar API

```bash
# Health check
curl http://localhost:3000/health

# Buscar projetos públicos
curl http://localhost:3000/api/projects

# Buscar notas do jardim
curl http://localhost:3000/api/posts
```

## 📦 Deployment

### Frontend (Vercel)

1. **Push para GitHub** → Vercel detecta automaticamente
2. **Preview Deploy** em cada PR
3. **Production Deploy** em merge para `main`
4. **Cache Headers** configurados em `vercel.json`:
   - Assets estáticos: 1 ano
   - HTML: 1 hora
   - Sitemap/robots: 24 horas

```bash
# Deploy manual
npm run build
vercel deploy
```

### Backend (Render)

1. **Conectar repositório** ao Render
2. **Environment variables** configuradas (Firebase keys, FRONTEND_ORIGINS)
3. **Build command**: `npm install && npm run build`
4. **Start command**: `npm start`
5. **Health check**: GET `/health` a cada 1 minuto via UptimeRobot

```bash
# Deploy automático via git push
git push
# Render auto-builds e deploys
```

### Monitoramento

```bash
# UptimeRobot: pinga /health a cada 1 minuto
# Alerts: Email/SMS se backend cair por 5 min
https://italo-dev-garden-api.onrender.com/health

# Response:
{
  "status": "healthy",
  "timestamp": "2026-06-26T18:00:00Z",
  "database": "connected",
  "auth": "initialized",
  "uptime": 432000 // 5 dias em segundos
}
```

## 🔐 Segurança

### Authentication

- **JWT Tokens** gerados no backend com secret forte
- **Session Storage** — Auto-clear ao fechar browser (mais seguro que localStorage)
- **Token Expiry** — 7 dias (refreshável com senha)
- **Admin Panel** — Protegido por password no `/admin/login`
- **Rate Limiting** — 100 requisições por 15 minutos por IP

### Database

- **Firestore Rules** — Apenas leitura pública para projects/posts/config
- **Leads** — Privado (apenas admin pode ler)
- **Audit Logging** — Todas as operações registradas (IP, user, timestamp, body)
- **No Exposure** — Senhas hasheadas com bcrypt

### Code

- **TypeScript Strict** — `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes` ativados
- **Input Validation** — Zod schema validation em todos os endpoints
- **HTTPS** — Enforced em produção
- **Security Headers** — CSP, X-Frame-Options, X-Content-Type-Options
- **No Secrets** — `.env*` excluded from git (`.gitignore`)
- **CORS Whitelist** — Apenas origins configuradas

### Audit Trail

Todas as ações são loggadas em JSON para busca/análise:

```json
{
  "timestamp": "2026-06-26T18:00:00Z",
  "ip": "192.168.1.1",
  "method": "POST",
  "path": "/api/projects",
  "userId": "user123",
  "status": 201,
  "message": "Project created: New Portfolio Feature"
}
```

## ⚡ Performance

### Frontend Metrics

| Métrica | Score | Status |
|---------|-------|--------|
| Desempenho (mobile) | 84 | 🟡 Bom |
| Acessibilidade | 92 | 🟢 Excelente |
| Práticas recomendadas | 96 | 🟢 Excelente |
| SEO (mobile) | 82 | 🟡 Bom |
| **Navegação agêntica** | 3/3 | ✅ Perfeito |

**Otimizações implementadas:**

- ✅ Code splitting por rota (Vite rollupOptions)
- ✅ Lazy loading de imagens (Intersection Observer hook)
- ✅ Gzip compression (Express middleware)
- ✅ Browser caching (1 ano para assets, 1 hora para HTML)
- ✅ Font preload + DNS prefetch
- ✅ JSON-LD schema para SEO estruturado
- ✅ Suspense boundaries com skeleton loaders
- ✅ Terser minification (drop_console: true)
- ✅ Skip links para acessibilidade

### Backend Performance

- ✅ Firestore denormalized queries (sem N+1 problems)
- ✅ Response caching com headers apropriados
- ✅ Database indexing para queries comuns
- ✅ Socket.io room broadcasting (não grita para todos)
- ✅ Response compression (gzip)

## 📱 Funcionalidades Destacadas

### Real-time Updates (WebSocket)

Quando admin adiciona/edita conteúdo:

1. **Admin** submete formulário via HTTP
2. **Backend** persiste no Firestore
3. **Backend** emite evento via WebSocket: `projects:updated`
4. **Frontend** conectado recebe evento via Socket.io
5. **Frontend** refetch automático da lista
6. **Usuários públicos** veem alterações **sem refresh** ⚡

```typescript
// Frontend
const { projects, refetch } = usePublicContent();
useRealtimeUpdates(refetch, refetch, refetch);

// Backend middleware
app.use(broadcastChanges(io)); // Intercepta respostas 2xx
io.emit('projects:updated', { id, data });
```

### Admin Dashboard

```
/admin/login
├── Autenticação com password (session storage)
└── Dashboard
    ├── Gerenciar Projetos (CRUD com validação Zod)
    ├── Gerenciar Posts (Markdown editor)
    ├── Configurar Bio + Links (Home customization)
    └── Visualizar Leads (formulário de contato)
```

### Markdown Rendering

Suporte completo com syntax highlighting:

```markdown
# Título
## Subtítulo

**Bold** e *italic*

[Link](https://exemplo.com)

```typescript
const code = 'highlighted';
```

> Citação

- Lista 1
- Lista 2
- Lista 3

| Col1 | Col2 |
|------|------|
| A    | B    |
```

### Dark/Light Theme

- Tema persistido em localStorage
- Suporte a `prefers-color-scheme` (OS preferences)
- Transições suaves 0.4s cubic-bezier
- Totalmente acessível com ARIA
- Sistema de cores estendido no Tailwind

## 📊 API Reference

### Public Routes (sem autenticação)

```bash
# Buscar todos os projetos (público)
GET /api/projects
# Response: { projects: ProjectDto[] }

# Buscar todas as notas (público)
GET /api/posts
# Response: { posts: PostDto[] }

# Buscar configuração da home (público)
GET /api/config
# Response: { bioTitle, bioDescription, socialLinks, ... }

# Enviar lead / formulário de contato
POST /api/leads
# Body: { name, email, message }
# Response: { id, message: "Lead criado com sucesso" }

# Health check (monitoramento)
GET /health
# Response: { status, database, auth, uptime, timestamp }
# Status codes: 200 (healthy), 503 (unhealthy)
```

### Admin Routes (com JWT Bearer token)

```bash
# Login
POST /api/auth/login
# Body: { password }
# Response: { token, expiresIn }

# Criar projeto
POST /api/projects
# Headers: Authorization: Bearer <token>
# Body: { title, description, technologies, deployUrl, repositoryUrl, image, featured }
# Response: { id, createdAt, ... }

# Atualizar projeto
PUT /api/projects/:id
# Headers: Authorization: Bearer <token>
# Response: { success, message }

# Deletar projeto
DELETE /api/projects/:id
# Headers: Authorization: Bearer <token>

# (Similar para posts, config, etc)
```

### WebSocket Events

```typescript
// Frontend escuta
socket.on('projects:updated', (data) => refetch());
socket.on('posts:updated', (data) => refetch());
socket.on('config:updated', (data) => refetch());
socket.on('leads:updated', (data) => console.log('Novo lead!'));
```

## 🧪 Testing

### Frontend

```bash
cd garden-frontend

# Rodar testes
npm run test

# Coverage
npm run test:coverage

# Watch mode
npm run test -- --watch
```

### Backend

```bash
cd garden-backend

# Rodar testes
npm run test

# Coverage
npm run test:coverage

# Watch mode
npm run test -- --watch
```

## 📋 Estrutura de Dados

### Project

```typescript
interface AdminProject {
  id: string;
  title: string;
  description: string;
  technologies: string[]; // ["React", "TypeScript", ...]
  image?: string;
  deployUrl?: string;
  repositoryUrl: string; // GitHub
  featured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Post (Garden Note)

```typescript
interface AdminPost {
  id: string;
  title: string;
  content: string; // Markdown
  tags: string[]; // ["react", "performance", ...]
  featured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Config (Home Settings)

```typescript
interface HomeFormState {
  bioTitle: string;
  bioDescription: string;
  currentActivity?: string;
  location?: string;
  socialLinks?: Record<string, string>;
}
```

### Lead

```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Timestamp;
  readAt?: Timestamp;
}
```

## 🎨 Design System

### Colors (Tailwind Extended)

```javascript
{
  darkBg: '#0A0A0C',        // Fundo muito escuro
  darkCard: '#121215',      // Cards dark
  darkBorder: '#1F1F23',    // Borders dark
  lightBg: '#FAF9F6',       // Fundo creme
  lightCard: '#FFFFFF',     // Cards light
  lightBorder: '#E5E5E0',   // Borders light
  accent: '#6366F1',        // Indigo vibrante
  accentHover: '#4F46E5'    // Indigo hover
}
```

### Fonts

- **Sans**: Inter 300-700 (body text, UI)
- **Mono**: JetBrains Mono 400-500 (código)

### Breakpoints

- Mobile: < 640px (`sm:`)
- Tablet: 640px - 1024px (`md:`)
- Desktop: > 1024px (`lg:`, `xl:`)

## 🔄 Workflow de Desenvolvimento

### Branches

```
main/           # Produção (auto-deploy Vercel + Render)
├── feature/*   # Novas features (criar PR)
├── fix/*       # Bug fixes (criar PR)
└── docs/*      # Documentação
```

### Commit Convention

```
feat: Adicionar nova feature
fix: Corrigir bug
perf: Melhorar performance
docs: Atualizar documentação
style: Formatação (sem lógica)
refactor: Refatorar código
test: Adicionar/atualizar testes
chore: Deps, configs, setup
security: Correções de segurança
ci: CI/CD configuration
```

Exemplo:
```bash
git commit -m "feat: Add WebSocket real-time updates

- Implement Socket.io server initialization in main.ts
- Add broadcastChanges middleware for automatic events
- Create useRealtimeUpdates hook for frontend listeners
- Emit events on project/post/config changes
- Tested with admin dashboard updates

Closes #42"
```

### PR Checklist

- [ ] TypeScript compila sem erros (`npm run build`)
- [ ] Testes passam (`npm run test`)
- [ ] Sem console.log em produção
- [ ] Acessibilidade (alt text, aria labels, skip links)
- [ ] Mobile responsivo (testado em 375px, 768px, 1024px)
- [ ] SEO considerado (meta tags, heading hierarchy)
- [ ] Performance (bundle size não aumentou muito)
- [ ] Commits bem formatados (conventional commits)

## 📚 Recursos

- **React Docs**: https://react.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Express.js Guide**: https://expressjs.com
- **Firestore**: https://firebase.google.com/docs/firestore
- **Socket.io**: https://socket.io/docs
- **Vite**: https://vitejs.dev/guide
- **WCAG 2.1 AAA**: https://www.w3.org/WAI/WCAG21/quickref
- **llms.txt**: https://llmstxt.org

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças com mensagens descritivas
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request com descrição clara

## 📝 Licença

Este projeto está licenciado sob a Licença MIT — veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

**Italo Dev** — Full Stack Developer

- 🌐 Website: [italodevgarden.vercel.app](https://italodevgarden.vercel.app)
- 🔗 GitHub: [@italofvm](https://github.com/italofvm)
- 💼 LinkedIn: [Italo Vieira](https://linkedin.com/in/italodev)

## 📞 Contato & Support

- **Issues**: [GitHub Issues](https://github.com/italofvm/italo-dev-garden/issues)
- **Email**: Através do formulário em /contact
- **Live Demo**: https://italodevgarden.vercel.app

## 🙏 Agradecimentos

- React team por React 19.2
- Vercel por hosting e auto-deploy
- Firebase por Firestore + Auth
- Tailwind CSS por design system
- Socket.io por real-time magic
- Todos que testaram e deram feedback!

---

**Feito com ❤️ por Italo Dev**

Última atualização: **26 de junho de 2026**

[⬆ Voltar ao topo](#-italo-dev-garden)
