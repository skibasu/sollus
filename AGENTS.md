<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Sollus — project guidelines

## Language policy

- Use English exclusively for code and project documentation, including `AGENTS.md` and `SPEC.md`.
- All comments, variable names, functions, components, types, interfaces, files, folders, tests, and technical messages must be in English. Do not introduce Polish or other languages in these areas.
- Website content is in Polish. This includes visible copy, navigation labels, buttons, form labels, validation messages, accessibility text, and page metadata intended for visitors.
- Keep Polish website content separate from English identifiers and technical documentation. Preserve the copy supplied in Figma or approved by the user.

## Stack and scope

- Use Next.js, React 19, TypeScript, and Tailwind CSS 4. Check `package.json` and the lockfile for the actual installed versions.
- Before writing Next.js code, read the relevant guides in `node_modules/next/dist/docs/`, as instructed above.
- Follow Tailwind CSS 4 syntax and conventions. Do not automatically carry over configuration from older versions.
- Do not install additional skills or dependencies without agreement from the user. Swiper is planned for a separate stage.
- Do not install or upgrade animation libraries during the current static-layout stage. Preserve existing animation components and installed dependencies. Use CSS and Tailwind for simple hover transitions; defer any new animation dependencies to a later agreement.
- Use `SPEC.md` for project requirements. Treat its open decisions as unconfirmed; do not present assumptions as approved requirements.

## Design sources

- Design system and component reference: https://www.figma.com/design/ga8Qzh7duLy66171TpbJFt/sollux-my-work?node-id=16-2
- Screen and layout reference: https://www.figma.com/design/ga8Qzh7duLy66171TpbJFt/sollux-my-work?node-id=13-700
- Figma is the source of truth for appearance, component variants, and mobile, tablet, and desktop layouts.
- Inspect the relevant Figma nodes and assets before implementation. Use the available Figma integration and design-to-code skill.
- Report missing access or ambiguous requirements. Do not present guessed values as measurements taken from Figma.

## Implementation stages

1. Reset the starter template while preserving the existing lamp and GoldenAmbientWaves components and their dependencies. Inspect the design system, create shared tokens and React components, then build the responsive Home layout and custom 404 page. Show static lamps in their intended hero positions and a static slide without arrows or progress indicators. Render the complete Shader section content and controls from Figma on a solid black background; defer only the shader effect.
2. Integrate the existing GoldenAmbientWaves background and Swiper slider. Add arrows and progress indicators during slider initialization. The left arrow selects the previous slide and the right arrow selects the next slide. Hovering the slider must not affect its behavior.
3. Enable and configure the existing lamp animations, preserving the responsive composition established in Stage 1.
4. Address backward compatibility after the user supplies the historical browser targets. Until then, target current stable Safari, Chrome, Edge, and Firefox, including the mobile browsers listed in `SPEC.md`.

Follow `SPEC.md` for detailed requirements and open decisions. Do not expand the current stage without the user's instruction. Unsupported lamp effects must leave the lamps visible and static; an unsupported shader must use a black background with content preserved.

## Components and styling

- Inspect existing components and repository conventions first. Extend them instead of creating duplicates.
- Separate reusable interface elements from page-specific sections. Base component boundaries on responsibility and reuse.
- Derive shared colors, typography, spacing, radii, and widths from the design system. Use tokens instead of repeating values across components.
- Match the design's proportions, alignment, image cropping, fonts, and element states. Do not add unapproved decoration or copy, except for the explicitly authorized custom 404 design and Polish copy.
- Use original graphics, icons, and fonts from the design when available. Do not replace them with arbitrary alternatives.
- Type component props and avoid `any` without a specific justification.
- Prefer server components and limit `"use client"` to the smallest boundary requiring interaction or browser APIs. Responsive sizing must not require client components.
- Define viewport-dependent sizes exclusively through responsive Tailwind classes matching Figma. Do not expose `size` or equivalent sizing props for Button, Header, SocialMedia, icons, or other visual components. Avoid `useMedia()`, JavaScript viewport detection, and resize state for responsive styling.
- GridColumn is the explicit exception to the `size` prop restriction: its fractional `size` value selects statically declared Tailwind grid classes according to Figma, including fractions such as `1/5`, `2/4`, and `5/12`. It does not select a visual component size.
- Keep the lamps as a shared hero layer across all slides, outside the changing slide content.

## Responsiveness and accessibility

- Support mobile, tablet, and desktop views using the approved breakpoint table in `SPEC.md`. Derive layout and sizing within those ranges from Figma; do not introduce alternative breakpoints without agreement.
- Check widths between reference screens for unintended horizontal scrolling, overlapping elements, and clipped content.
- Avoid separate copies of entire pages for each screen size when a shared structure can support the required layouts.
- Use semantic HTML, a correct heading hierarchy, image descriptions, and control labels. Provide keyboard support and visible focus states.
- Respect `prefers-reduced-motion` when implementing animations.

## Verification and reporting

- Compare implemented components and screens with their Figma references at the corresponding viewport widths.
- Run appropriate available project checks after changes, particularly lint and build checks for implementation changes. Report failures and checks that could not be completed.
- Add interaction tests where they verify meaningful behavior. Do not create tests that merely reproduce static layout structure.
- Summarize the completed scope, verification results, and any deviations from the design.

## Scalable architecture and stylesheet organization

- Page components compose sections; sections compose small components with clear responsibilities. Separate shared UI and layout components from Home-specific components.
- Avoid files containing multiple complete sections, deeply nested JSX, duplicated markup, or unrelated styling rules. Extract components when responsibility, reuse, or readability benefits.
- Keep theme tokens and global base rules in separate shared stylesheets. Keep section and component styles alongside their components and import styles in a predictable order from the main stylesheet.
- Prefer Tailwind utilities. Compose necessary custom classes with `@apply` where supported, grouping remaining rules by their component or section.
- Keep responsive behavior in CSS. GridColumn may accept a fractional size or a breakpoint-to-fraction map, selecting statically declared Tailwind classes.
