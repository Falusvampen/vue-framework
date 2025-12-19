# recipe-site

Minimal Vue 3 + Vite starter for a small recipe site.

Key points

- Vue 3 (v3.5) with vue-router.
- Built with Vite for fast dev & production builds.
- Simple project structure with example views and components.
- Daily notes are stored in docs/daily-log/.

Quick start

```bash
# install dependencies
npm install

# run dev server (Vite - default: http://localhost:5173)
npm run dev

# build for production
npm run build

# preview production build locally
npm run preview
```

Scripts

- npm run dev — start Vite dev server
- npm run build — produce production build in dist/
- npm run preview — locally preview the production build
- npm run lint — run ESLint (auto-fix where possible)
- npm run format — run Prettier on src/

Requirements

- Node: ^20.19.0 or >=22.12.0 (see package.json engines)

Project layout (important files)

- index.html — app entry
- src/main.js — app bootstrap
- src/App.vue — root component
- src/router/index.js — routes config
- src/views/ — view components (Home, About, Kim)
- src/components/ — reusable components + icons
- src/assets/ — styles & static assets
- docs/daily-log/ — project notes & changelog

Development notes

- Uses eslint + Prettier; run lint/format before committing.
- Vite plugin: @vitejs/plugin-vue and vite-plugin-vue-devtools are included for DX.
- No tests are included by default.

Deployment

1. npm run build
2. Deploy the contents of dist/ to any static hosting (Netlify, Vercel, GitHub Pages, etc.)

Contact
Repository: https://github.com/Falusvampen/vue-framework
