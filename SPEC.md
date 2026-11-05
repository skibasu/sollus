# Sollus landing page specification

## Status and sources

This specification records the user's requirements. Figma metadata has verified the reference frame widths and the 1920px frame content width recorded below. Other measurements, component variants, assets, and layout details still require inspection before implementation. Do not treat unverified values as measured design facts.

- Design system: https://www.figma.com/design/ga8Qzh7duLy66171TpbJFt/sollux-my-work?node-id=16-2
- Screens: https://www.figma.com/design/ga8Qzh7duLy66171TpbJFt/sollux-my-work?node-id=13-700
- Approved clean THORO image: https://www.figma.com/design/ga8Qzh7duLy66171TpbJFt/sollux-my-work?node-id=412-9517
- Follow `AGENTS.md` and the installed Next.js documentation.
- Stack: Next.js, React 19, TypeScript, Tailwind CSS 4; Swiper for React in the later interaction stage.
- Code, identifiers, comments, file names, and documentation must be in English. Website content must be in Polish.

## Delivery stages

### Stage 1: components and static landing page

Do not install animation libraries during this stage. Preserve existing animation components and their installed dependencies, but do not add or upgrade animation packages. Implement the required simple hover transitions with CSS and Tailwind. Any additional animation dependency must be agreed with the user in a later stage.

Create the shared components first, then assemble the responsive landing page. Match the Figma design as closely as possible, including typography, spacing, dimensions, colors, image crops, and hover states.

Reproduce the layout represented by the pink and green grid guides. These guides describe alignment and structure; confirm whether any colored areas are actual artwork before rendering them as visible elements.

Use the approved breakpoint table below. Determine the layout and component styling within those breakpoint ranges from the mobile, tablet, and desktop Figma designs; do not introduce alternative breakpoints without agreement. The explicitly required Button size threshold is 768px.

Render the Shader section with its complete Figma content, including text, buttons, and supporting copy, on a solid black background during this stage. Reserve its layout for the later background component. Show the hero lamps as static elements in their Figma positions during Stage 1. Display a static hero slide, without slider arrows or progress indicators. Add those controls when initializing the slider in Stage 2. Enable lamp motion and glow animations only in Stage 3.

### Stage 2: shader and slider

Implement the ShaderSection background using the existing GoldenAmbientWaves component, then implement the Swiper slider and its transitions.

### Stage 3: animated lamps

Enable and configure glow and motion on the three existing lamp components. Preserve the responsive sizes and positions established for the static hero in Stage 1.

### Final stage: backward compatibility

After the feature stages, address older browser versions. The user will provide the exact support range and requirements at that time. Do not assume the previously discussed 36-month window remains required.

## Template reset and routing

At the beginning of Stage 1, reset the default Next.js starter template before building the landing page.

- Remove the starter page content, demo assets, and template-specific styles that are no longer needed.
- Preserve the existing AnimatedLamps/AnimatedLamp components and GoldenAmbientWaves component, including their required assets, hooks, utilities, styles, and dependencies. Inspect their dependency chains before removing template files.
- These animation components are already implemented. Reuse and configure them in their planned stages rather than rebuilding their effects.
- Preserve project configuration, required runtime infrastructure, and project documentation.
- The initial public page is Home at `/`.
- Prepare routing using the installed Next.js routing conventions so additional pages can be added later. Do not add a separate routing library or speculative pages.
- Implement a custom 404 page for unknown routes, with a clear not-found message and a link back to Home at `/`. This return link is an explicit exception to the placeholder `#` link rule.
- The user authorizes creating an appropriate 404 design and Polish copy because no specific 404 design was supplied. Keep it consistent with the landing page design system and responsive across supported viewports.
- Store the 404 page copy in the shared JSON content source, including its heading, explanation, and return-link label.

## Styling, theme, and sizing requirements

- Use Next.js, TypeScript, and Tailwind CSS for implementation.
- Prefer Tailwind utility classes throughout the interface. When a reusable custom CSS class is needed, compose its styling with `@apply` wherever supported by Tailwind CSS 4.
- Transfer the complete Figma design system into the Tailwind CSS 4 theme. Map Figma variables and design tokens to theme values for colors, typography, spacing, radii, and other applicable foundations; reuse those tokens in components.
- Use rem-based dimensions rather than hardcoded pixel values, except for the explicitly defined viewport breakpoints. The conversion baseline is `1rem = 16px`; convert measured Figma dimensions accordingly without forcing a fixed root font size that overrides user preferences.
- At a 1920px viewport, the main content container is `100rem` (1600px at the baseline), centered with 160px-equivalent side margins, as verified in Figma. Above that viewport width, grow the container continuously until it reaches `120rem` (1920px at the baseline) at a 2560px viewport. Cap it at `120rem` thereafter. The `120rem` maximum-width cap may be applied from `2xl`, but responsive width rules must still preserve the Figma container dimensions at smaller reference viewports; max-width alone does not define the growth curve. Do not add a `4xl` breakpoint. Full-width section backgrounds are separate from this content container.
- Build all grids using flexible proportional columns, percentage-based sizing, or equivalent fractional CSS Grid tracks. Do not use fixed pixel column widths.
- Grids must adapt continuously between breakpoints while preserving the intended Figma proportions and alignment.
- Font sizes are fixed within each breakpoint range and change at the relevant breakpoint. Use theme typography values and responsive Tailwind classes; do not use fluid viewport-based font sizing or `clamp()` for font sizes.
- Derive breakpoint-specific font sizes and remaining responsive values from Figma. The Button threshold of 768px is equivalent to `48rem` at the baseline.

### Responsive component sizing

- Component sizes must follow the viewport and the approved Figma breakpoint designs through responsive Tailwind classes.
- Do not add `size` props or equivalent dimension-selection props to Button, Header, SocialMedia, icons, or other components to reproduce viewport-dependent variants.
- Header dimensions and SocialMedia icon sizes must change through Tailwind breakpoint variants according to Figma. Implement SocialMedia as a reusable component where used in the design.
- Do not use `useMedia()`, `matchMedia`, window-width state, resize listeners, or JavaScript-selected size variants for responsive styling. CSS must determine the layout and dimensions.
- Prefer server components. Add `"use client"` only at the smallest boundary that genuinely requires browser APIs, event handlers, or interactive animation/slider behavior; do not introduce it for responsive sizing.
- GridColumn is an explicit exception to the prohibition on `size` props: its `size` prop describes a fractional grid allocation, not a visual small/large component variant. Accept the fractions required by Figma, such as `1/5`, `2/4`, and `5/12`, and map them to appropriate statically declared Tailwind classes. CSS and Tailwind must apply responsive layout changes without JavaScript viewport detection.

## Viewport breakpoints and verified Figma dimensions

Use these explicitly requested minimum-width breakpoints, defined consistently in pixels in the Tailwind theme:

| Name | Minimum viewport width |
| --- | --- |
| xs | 360px |
| md | 768px |
| lg | 1080px |
| xl | 1280px |
| 2xl | 1440px |
| 3xl | 1920px |

Reset default Tailwind breakpoint values before defining this set; do not retain an implicit `sm` breakpoint or mix pixel and rem breakpoint definitions. Layout dimensions and typography still use rem values.

Figma metadata verification on the supplied screen page confirms reference frames at 320, 768, 1080, 1280, 1440, and 1920px. The mobile reference is 320px, not 360px: retain the user's requested `xs = 360px`, but support the 320px layout through unprefixed base styles. Frame widths are design references, not proof of breakpoint behavior between frames.

The 1920px frame contains a 1600px-wide main content region starting at x = 160px. No ultra-wide reference above 1920px was found on the supplied screen page. The user-approved ultra-wide behavior extends beyond the available Figma reference: grow the content container smoothly from 1600px at a 1920px viewport to 1920px at a 2560px viewport, then retain that maximum. No additional `4xl` breakpoint is required.

## Browser compatibility

- During Stages 1–3, support the current stable releases of Safari, Chrome, Edge, and Firefox at delivery. Include desktop browsers, Safari on iOS/iPadOS, and Chrome on Android.
- Record the actual browser and operating-system versions used for acceptance checks.
- Verify responsive layout, typography, images, inline SVG, navigation, focus/hover states, and implemented interactions across the supported browsers. Include actual Safari and Edge checks; engine-level automation alone does not establish testing of every named browser.
- Implement historical browser compatibility as the final stage, after the user supplies the target versions. The earlier 36-month policy is superseded.
- If lamp effects are unsupported, keep the lamps visible at their intended positions without animation. If the shader is unsupported, use a solid black background and preserve section text and controls.
- Respect reduced-motion preferences and provide appropriate static alternatives for animated effects.

## Hero minimum height

- The hero section must always be at least as tall as the browser viewport at every supported width, including mobile devices.
- Use a minimum height rather than a fixed height so content can expand without clipping or overlap.
- Account for mobile browser toolbar changes so the minimum height follows the currently visible viewport. Keep a compatible viewport-height fallback.
- Implement this with CSS and Tailwind utilities; do not measure viewport height in JavaScript.
- Preserve the shared lamp layer and responsive composition within this minimum-height hero. Do not subtract the header height from the required hero minimum.

## Component requirements

Place components in `src/components`. Use clear responsibilities, typed props, reusable variants, and existing repository conventions. Avoid duplicating components for individual viewport sizes.

### Button

- Required `label: string` prop.
- Support the remaining native button props through the standard React button attributes.
- Reproduce the small and large appearances and visual variants defined in Figma through responsive Tailwind classes. Do not expose a `size` prop.
- Use Tailwind for styling and variants.
- Use the large appearance from 768px upward and the small appearance below that threshold. Size changes are driven entirely by responsive Tailwind classes, without caller-supplied size parameters.
- Match Figma hover, focus, and disabled states where defined.
- Use semantic links for navigation and semantic buttons for actions. Use a separate ButtonLink component sharing Button styles for navigation. Both components require label and may select brand or dark appearance; neither exposes a size prop.

### MenuLink

Match Figma typography, spacing, appearance, and hover states. Navigation destinations are `#` unless explicitly overridden by the logo requirement.

### Header

Match the Figma layout and responsive behavior. Accept a typed array of links with `{ href: string; label: string; id: string }`. Each `id` must be unique within the array.

The logo links to `/`. Other links point to `#`. Include the hamburger icon shown in the design and reproduce its hover state. Clicking it must do nothing; do not implement a menu panel or navigation behavior.

Use a transparent Header overlaid on the hero, pinned to the top of the viewport with `position: fixed`, `top: 0`, and full viewport width. Keep it above page content with an appropriate stacking order. Header must not reserve space in document flow or add height above the hero. The hero starts at the top of the page behind Header and retains its full-viewport minimum height. Respect the Figma content offsets so Header does not obscure important hero text or controls.

### Vp

Accept `title`, `icon`, and `subtitle` props. Define an enum for the available icons and map its values to inline SVG icon components. Derive the actual icon set and layout from Figma.

### Grid and GridColumn

Implement reusable grid primitives using Tailwind and CSS Grid. Support fractional column sizing such as:

```tsx
<Grid>
  <GridColumn size="6/12">...</GridColumn>
  <GridColumn size="6/12">...</GridColumn>
</Grid>
```

Match Figma column counts, gaps, alignment, and responsive tile placement. The `size` prop selects the fractional allocation required by the design, including values such as `1/5`, `2/4`, and `5/12`; do not restrict it to twelfths. Map supported values to complete, statically discoverable Tailwind classes rather than constructing class names dynamically. Account for grid gaps so fractional columns do not overflow their container. Choose the underlying grid tracks to reproduce the Figma proportions. Define breakpoint-specific allocation mappings after inspecting the layouts; do not assume equal allocations across breakpoints or use JavaScript viewport detection.

### TileCard

Accept an image URL, title, subtitle, and button label. Provide any required image description from the content JSON. Match Figma tile proportions, image crop, text positioning, and button appearance.

On hovering a tile:

- Scale its image from 1 to 1.1 over 500ms with `ease-out`.
- Apply `overflow: hidden` to clip the enlarged image.
- Put the tile's button into its corresponding hover appearance.

Provide equivalent visible feedback for keyboard focus. Avoid nested interactive controls when the entire card is a link. All card navigation destinations are `#`.

## Content and assets

- Create a JSON file containing all website text content, with English keys and Polish values sourced from Figma or approved copy.
- Read website text from this JSON instead of hardcoding copy in JSX or component logic.
- Include headings, paragraphs, navigation, button labels, image descriptions, accessibility labels, and visitor-facing metadata.
- Technical strings such as CSS classes, routes, enum values, and internal identifiers are not website copy and do not need to be moved to the content JSON.
- Export all design images from Figma and preserve their intended crops and proportions.
- Use WebP for raster images. SVG is also accepted. Obtain confirmation before using any other image format.
- Optimize image dimensions and file sizes for their actual display sizes.
- Render all icons as inline SVG markup, not raster images or external SVG image references.

## ShaderSection and GoldenAmbientWaves

During Stage 1, render the section's complete Figma content, including its heading, button, and supporting copy, on a solid black background. Only the shader background effect is deferred to Stage 2.

In Stage 2, implement `ShaderSection` with the existing `GoldenAmbientWaves` component as its background. Inspect and reuse that component. Keep text above the background, using the exact section copy from the JSON.

## Swiper slider

Implement with Swiper for React in Stage 2:

The lamps form a shared hero layer across all slides. Keep this layer outside the changing slide content so slide transitions do not replace, duplicate, or remount the lamps.

- Display each slide for 3000ms before starting its transition. Transition time is additional and is not included in this dwell time.
- Crossfade transitions lasting 600ms with `ease-in-out`.
- Image scale from 1.05 to 1.0 over 800ms with `ease-out` during the transition.
- A yellow progress bar that fills linearly during the 3000ms dwell time, remains full during the transition, and resets after the transition completes.
- Synchronize progress with actual autoplay and slide changes rather than an unrelated timer.

The 600ms crossfade is additional to the 3000ms dwell time. The 800ms scale animation runs alongside the transition and must not be added as another sequential delay. Hovering the slider must have no behavioral effect: do not pause autoplay or trigger another action. The left arrow moves to the previous slide; the right arrow moves to the next slide. Add arrows and progress indicators only when initializing the slider in Stage 2; omit them from the static Stage 1 hero. Loop continuously. After a manual arrow change, complete the transition, reset the progress bar, and start a fresh 3000ms dwell period. Keep the progress bar full during automatic transitions; reset it when the transition finishes. On manual navigation, show the bar as full during the transition, then reset it.

## Animated lamps

The animated lamps are existing, ready-made components. Preserve and configure the three components from the AnimatedLamps/AnimatedLamp folder to match the hero designs. Verify the actual folder name in the repository and inspect existing components, assets, and hooks before changing them. Do not rebuild their animation effects.

- Implement the intended glow and motion in Stage 3.
- Establish each lamp's static size, composition, and responsive position in Stage 1 using Figma. Stage 3 adds animation to this existing composition.
- Position lamps absolutely within a stable, positioned hero container.
- Keep their intended anchors stable during resizing within a breakpoint range. Change placement when the design explicitly changes the composition.
- Confirm anchor coordinates and whether scaling is fluid or fixed within each range after inspecting Figma.
- Respect reduced-motion preferences for lamps, shader effects, and slider motion. For unsupported lamp effects, preserve the lamps without animation. For an unsupported shader effect, use a solid black background and preserve all section content.

## Acceptance criteria

- The default starter content is removed while the existing lamp and GoldenAmbientWaves components and their dependencies remain intact.
- Home is available at `/`, and unknown routes render the custom responsive 404 page with a working return link.
- All Stage 1 sections match their mobile, tablet, and desktop Figma references at the corresponding viewport sizes.
- Intermediate widths have no unintended overflow, overlapping content, or clipped text.
- The hero is at least the current viewport height at every breakpoint and can grow to accommodate its content.
- Shared components reproduce the design system and are reused throughout the page.
- Figma design tokens are represented in the Tailwind theme and used through Tailwind utilities.
- Dimensions use rem-based values; grids use flexible proportional tracks rather than fixed pixel columns.
- Content width never exceeds `120rem`, and font sizes remain fixed within each breakpoint range.
- All website copy comes from the JSON content source.
- Icons are inline SVG; image formats follow the approved asset policy.
- Hover and keyboard focus behavior are usable and consistent with the design.
- The logo and the 404 return link lead to `/`; other navigation links point to `#`.
- Stage 1 Shader section includes its complete Figma content and controls on a solid black background; only the shader effect is deferred to Stage 2.
- Run the available lint and build checks after implementation and report results.
- Verify slider timing, progress synchronization, lamp placement, and reduced-motion behavior when those features are implemented.

## Open decisions

1. The user will provide historical browser targets before the final compatibility stage.


## Scalable architecture and stylesheet organization

- Page components compose sections; sections compose small components with clear responsibilities. Separate shared UI and layout components from Home-specific components.
- Avoid files containing multiple complete sections, deeply nested JSX, duplicated markup, or unrelated styling rules. Extract components when responsibility, reuse, or readability benefits.
- Keep theme tokens and global base rules in separate shared stylesheets. Keep section and component styles alongside their components and import styles in a predictable order from the main stylesheet.
- Prefer Tailwind utilities. Compose necessary custom classes with `@apply` where supported, grouping remaining rules by their component or section.
- Keep responsive behavior in CSS. GridColumn may accept a fractional size or a breakpoint-to-fraction map, selecting statically declared Tailwind classes.
