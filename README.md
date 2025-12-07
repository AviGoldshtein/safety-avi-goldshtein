# Safety Event Intake Portal

Event capture portal built with React, TypeScript, Vite, and React Router. The UI renders right-to-left, keeps a persistent header, sidebar, and footer, and focuses on a single multi-step event intake form with strict client-side validation.

## Features
- LayoutMain provides the fixed chrome and space for routed pages.
- Home renders the event form while Development acts as a placeholder view.
- EventForm centralizes validation, section toggles, geolocation capture, and reset logic, relying on reusable CustomSelect, RadioGroup, and EventFormSection components.
- Header, Sidebar, Footer, and all form widgets live in colocated component folders with CSS modules for styling.
- data/options.ts enumerates all select and radio options so the form stays config-driven.

## Available Scripts
- npm run dev - start the Vite dev server with React Refresh.
- npm run build - type-check via tsc -b and create a production bundle.
- npm run preview - serve the production build locally.
- npm run lint - run ESLint with the flat config in eslint.config.js.

## Project Structure
- src/main.tsx bootstraps React with BrowserRouter.
- src/App.tsx defines the route table.
- src/index.css holds the global reset and RTL body styles.
- public/ hosts static assets like vite.svg, and src/assets/ keeps bundled SVGs.
- tsconfig.* and vite.config.ts hold the strict TS settings and plugin config.

## Getting Started
```
npm install
npm run dev
```

Open the dev server URL in a browser that allows geolocation to fully exercise the location picker inside the event form.
