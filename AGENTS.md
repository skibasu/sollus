<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Sollus — project guidelines

## Language policy

- Use English exclusively for code and project documentation, including `AGENTS.md` and `spec.md`.
- All comments, variable names, functions, components, types, interfaces, files, folders, tests, and technical messages must be in English. Do not introduce Polish or other languages in these areas.
- Website content is in Polish. This includes visible copy, navigation labels, buttons, form labels, validation messages, accessibility text, and page metadata intended for visitors.
- Keep Polish website content separate from English identifiers and technical documentation. Preserve the copy supplied in Figma or approved by the user.

## Stack and scope

- Use Next.js, React 19, TypeScript, and Tailwind CSS 4. Check `package.json` and the lockfile for the actual installed versions.
- Before writing Next.js code, read the relevant guides in `node_modules/next/dist/docs/`, as instructed above.
- Follow Tailwind CSS 4 syntax and conventions. Do not automatically carry over configuration from older versions.
- Do not install additional skills or dependencies without agreement from the user. Swiper is planned for a separate stage.
- `spec.md` will be completed later. Until then, do not present product assumptions as approved requirements.

## Design sources

- Design system and component reference: https://www.figma.com/design/ga8Qzh7duLy66171TpbJFt/sollux-my-work?node-id=16-2
- Screen and layout reference: https://www.figma.com/design/ga8Qzh7duLy66171TpbJFt/sollux-my-work?node-id=13-700
- Figma is the source of truth for appearance, component variants, and mobile, tablet, and desktop layouts.
- Inspect the relevant Figma nodes and assets before implementation. Use the available Figma integration and design-to-code skill.
- Report missing access or ambiguous requirements. Do not present guessed values as measurements taken from Figma.

## Implementation stages

1. Inspect the design system and create shared tokens and React components with their corresponding variants.
2. Build semantic HTML within React components and responsive styles based on the Figma screens. Reuse the components created in the previous stage.
3. Add Swiper for React and implement slider behavior in a separate stage.
4. Add the lamp animations in the hero section last. Agree on the animation approach and assets before this stage.

Do not expand the current stage to include later stages without the user's instruction. Preserve the intended static appearance until interactions and animations are implemented.

## Components and styling

- Inspect existing components and repository conventions first. Extend them instead of creating duplicates.
- Separate reusable interface elements from page-specific sections. Base component boundaries on responsibility and reuse.
- Derive shared colors, typography, spacing, radii, and widths from the design system. Use tokens instead of repeating values across components.
- Match the design's proportions, alignment, image cropping, fonts, and element states. Do not add unapproved decoration or copy.
- Use original graphics, icons, and fonts from the design when available. Do not replace them with arbitrary alternatives.
- Type component props and avoid `any` without a specific justification.
- Limit client components to elements requiring interaction or browser APIs.

## Responsiveness and accessibility

- Support mobile, tablet, and desktop views. Choose breakpoints based on layout changes in the design and content behavior.
- Check widths between reference screens for unintended horizontal scrolling, overlapping elements, and clipped content.
- Avoid separate copies of entire pages for each screen size when a shared structure can support the required layouts.
- Use semantic HTML, a correct heading hierarchy, image descriptions, and control labels. Provide keyboard support and visible focus states.
- Respect `prefers-reduced-motion` when implementing animations.

## Verification and reporting

- Compare implemented components and screens with their Figma references at the corresponding viewport widths.
- Run appropriate available project checks after changes, particularly lint and build checks for implementation changes. Report failures and checks that could not be completed.
- Add interaction tests where they verify meaningful behavior. Do not create tests that merely reproduce static layout structure.
- Summarize the completed scope, verification results, and any deviations from the design.
