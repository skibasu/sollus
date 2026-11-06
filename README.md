# Sollus

A responsive Polish lighting landing page built with Next.js App Router, React, TypeScript, and Tailwind CSS 4.

[Project report](PROJECT-REPORT.md)

## Development

- `npm run dev`: start the development server.
- `npm run lint`: run ESLint.
- `npx tsc --noEmit`: check TypeScript.
- `npm run build`: produce the production build.
- `npm start`: serve the production build.

## Architecture

The Home page composes shared layout and Home-specific sections. Shared UI primitives are independent of page content. All visitor-facing copy is maintained in `src/content/pl.json` with English keys and Polish values.

The global stylesheet imports the theme, base rules, and colocated component styles in a predictable order. Component sizes are controlled by responsive Tailwind classes. GridColumn accepts fractional allocations and breakpoint maps; it never detects viewport width in JavaScript.

The only breakpoints are xs (360px), md (768px), lg (1080px), xl (1280px), 2xl (1440px), and 3xl (1920px). Base styles support 320px. The main container grows from 1600px at 1920px to its 1920px maximum at 2560px.

## Stage boundaries

Stage 1 uses static lamp images, a static first slide without slider controls, and a complete call-to-action section on black. Existing AnimatedLamp components, their hook, original PNGs, and GoldenAmbientWaves are preserved for later stages and are not imported by Home.

No dependencies or animation libraries were added. Fonts, image assets, and inline SVG artwork are local. The clean THORO photograph uses the additional Figma node approved by the user.

See AGENTS.md and SPEC.md for the authoritative requirements. Historical browser compatibility is a separate final stage.

## Browser tests

Install the Playwright Chromium browser once with `npx playwright install chromium`.
Run `npm run test:e2e` to start the local Next.js server on port 3100 and test the
home page carousel in Chromium.
