# italo-dev-garden

Portfolio pessoal em **React + TypeScript + Vite**, com foco em interface moderna, navegacao por secoes e base preparada para evoluir para posts/projetos com backend depois.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React (icones)

## O que ja foi implementado

- Estrutura inicial de arquitetura por camadas:
  - `app/providers` (estado global)
  - `components/layout`, `components/sections`, `components/ui`
  - `types`, `data`, `hooks`
- Navegacao por abas com tipagem (`TabId`) via `NavigationProvider`
- Tema claro/escuro com persistencia em `localStorage` via `ThemeProvider`
- Header desktop + navegacao mobile com estado ativo
- Secao **Home** com cards de status
- Secao **Garden** com:
  - filtros por status
  - listagem de notas
  - modal de leitura
- Modal com `createPortal` para cobrir a tela inteira corretamente
- Footer com botao de copiar e-mail + toast de confirmacao
- Tipagem base de notas e navegacao

## Em andamento

- Secao **Lab**
- Secao **Now**
- Conteudo expandido de notas e projetos reais
- Integracao futura com backend/CMS

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Estrutura do projeto

```text
src/
  app/providers/
  components/
    layout/
    sections/
    ui/
  data/
  hooks/
  styles/
  types/
```

## Proximos passos sugeridos

1. Finalizar as secoes `LabSection` e `NowSection`.
2. Criar secao `Projects` com dados locais.
3. Definir modelo de dados para posts/projetos visando backend.
4. Migrar conteudo estatico para API (ex: Supabase/Nest/Node) em uma segunda fase.
