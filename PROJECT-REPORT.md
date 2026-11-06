# Sollus project report

[Live site](https://px661515.pxcloud.pl/sollus/) · [Local setup instructions](README.md#development)

## Layout and responsiveness

I built the page from the Figma design and adapted it for phones, tablets, desktops, and widths between those layouts. The main content container has a maximum width of 1920 px. The hero spans the full viewport width and is at least as tall as the visible viewport.

## Interactions

Dark buttons use `#4A4A4A` on hover, as specified in the brief. I chose a hover shade from the project's palette for the yellow button and added a subtle press effect to the buttons.

Header menu items, icons, and the linked rating badge have hover states. Footer navigation links, the phone number, and the email address stay black and gain an underline on hover or keyboard focus. I added a visible focus state to the search field where Figma did not specify one.

The header background turns white on scroll, matching its hover state. I chose that behavior during implementation and left it open for confirmation.

## Lamp animation and carousel

The first slide fades in after its image loads. The lamps light up in sequence, then the carousel starts. Lamp brightness changes as the page scrolls. The two round lamps respond to pointer movement, and clicking a lamp toggles its light.

The carousel arrows sit symmetrically around the center on phones and tablets. From 1920 px onward, their positions are relative to a centered 1920 px area.

## Navigation and scope

The logo links to the home page. The phone and email links use `tel:` and `mailto:`, and placeholder links use `#`. I added a custom 404 page and a favicon. The mobile search and hamburger icons are present as part of the layout. Opening the mobile search and navigation was outside the scope of this version.

## Technology and content

Next.js provides page routing and static export, and Tailwind CSS supports the responsive layouts and interaction states. TypeScript checks the data passed between components during development.

I treated the brief as a frontend implementation. The page content lives in [a JSON file](src/content/pl.json), and the site runs without a separate backend or database.

## Testing

I tested the site in the latest stable versions of Chrome, Edge, Firefox, and Safari available at the time, and on iOS and Android devices. Older browser versions were outside the test scope.

The final Chrome review covered 13 viewport widths from 320 to 2560 px. Both carousel arrows worked at each width, and the page had no horizontal overflow. At 1920 × 1080 px, the main section boundaries and both rows of promotional cards matched the reference. The full screenshot was 1 px taller, and the animated lighting differed between the two captures.

During the narrow-screen review, the hero text layer intercepted clicks at the center of the gold lamp at 320, 360, and 390 px. The copper lamp's clickable area was outside the viewport at 320 and 360 px.
