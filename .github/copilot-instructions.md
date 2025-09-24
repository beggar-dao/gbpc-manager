# Copilot Instructions for gbpc-manager

## Project Overview
- **Framework:** Ant Design Pro (React, TypeScript)
- **UI:** Ant Design, Tailwind CSS
- **State Management:** Likely via React context or models (see `src/models/`)
- **API Integration:** All backend/API calls are handled in `src/services/api.ts`.
- **Localization:** Multi-language support via `src/locales/` (with subfolders for each language).
- **Routing:** Defined in `config/routes.ts`.
- **Config:** App-wide settings in `config/config.ts` and `config/defaultSettings.ts`.

## Key Workflows
- **Install dependencies:** `pnpm install` (preferred), or `npm install`/`yarn`
- **Start dev server:** `pnpm start` or `npm start`
- **Build for production:** `pnpm run build` or `npm run build`
- **Run tests:** `pnpm test` or `npm test` (Jest)
- **Lint/fix code:** `pnpm lint` / `pnpm lint:fix`

## Project Conventions
- **Components:** All UI components in `src/components/`, grouped by feature.
- **Pages:** Route-based pages in `src/pages/`, organized by domain (e.g., `dashboard`, `admin`).
- **Models:** App state and business logic in `src/models/`.
- **Global styles:** `src/global.less`, `src/global.style.ts`, and `tailwind.css`.
- **Type definitions:** Centralized in `src/typings.d.ts` and `types/`.
- **Service worker:** `src/service-worker.js` for PWA support.
- **Manifest:** `src/manifest.json` for PWA metadata.

## Patterns & Integration Points
- **API calls:** Use `src/services/api.ts` for all HTTP requests. Avoid direct fetch/axios in components.
- **Localization:** Add new languages by creating a folder in `src/locales/` and updating `config/defaultSettings.ts`.
- **Routing:** Update `config/routes.ts` for new pages; match page files in `src/pages/`.
- **Config:** Use `config/config.ts` for environment-specific settings.
- **Icons/Assets:** Place in `public/icons/` or `public/`.

## Examples
- To add a new page:
  1. Create a file in `src/pages/your-page/index.tsx`.
  2. Add route in `config/routes.ts`.
- To add a new API endpoint:
  1. Update `src/services/api.ts`.
  2. Use the service in your component/model.
- To add a new language:
  1. Add folder in `src/locales/`.
  2. Add translation files (see other languages for structure).

## External References
- [Ant Design Pro Docs](https://pro.ant.design)
- [Ant Design](https://ant.design)
- [Tailwind CSS](https://tailwindcss.com)

---
**Feedback:** If any section is unclear or missing, please specify what needs improvement or additional detail.
