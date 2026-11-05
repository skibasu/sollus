# Stage 1 validation

## Implemented

- Home and custom 404 using the existing App Router.
- Shared UI primitives, small page sections, colocated styles, Tailwind theme, and local Red Hat Display fonts.
- All website copy in the Polish JSON content source, including preserved animation component labels.
- Static common lamp layer, fixed transparent Header, full-viewport minimum hero, and complete Shader section on black.
- Local WebP and inline SVG exports. THORO uses the clean image approved at Figma node 412:9517.
- Existing lamp components, motion hook, GoldenAmbientWaves, and original lamp PNGs preserved. Home does not import the animation components. No packages were installed or upgraded.

## Checks performed

- ESLint and TypeScript checks passed.
- Production build passed after clearing the cache created by an earlier environment permission failure in the Tailwind/Turbopack helper process.
- In-app browser DOM checks covered CSS widths 320, 360, 600, 768, 900, 1080, 1280, 1440, 1920, and 2560, plus a 768 by 420 short viewport.
- No horizontal document overflow or Header overflow was detected at those widths.
- Container measured 1600 at a 1920 viewport and 1920 at a 2560 viewport, using the standard root font size.
- Hero met or exceeded viewport height, including the short viewport where it expanded to accommodate content.
- No broken loaded images, animation toggle buttons, or canvas elements were detected in Home.
- Search accepted text without navigation on Enter. Hamburger click caused no navigation or menu opening.
- Custom 404 displayed and its return link navigated to Home.
- Keyboard focus selected the tile, applied image scale 1.1 with a 0.5-second transition, and changed the button appearance to the dark hover color.
- Figma reference screenshots and browser screenshots were visually inspected. No automated pixel-diff score is claimed.

## Verification limits

- Browser interaction was verified in the available in-app browser. Dedicated Chrome integration was unavailable, and native Safari inspection timed out.
- Actual current Safari, Edge, Firefox, and real iOS/Android devices have not been fully verified. Do not treat this as cross-browser acceptance sign-off.
- No historical browser testing was attempted; it remains a separate final stage.
- Next.js development logging emitted an LCP advisory when a tile was brought into view during testing. Hero images are preloaded; below-hero tiles remain lazy-loaded intentionally.
