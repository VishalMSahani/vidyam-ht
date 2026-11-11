# Vidyam Home Tuition

A four-page, responsive website built with Next.js static export, Tailwind CSS v4, and installed BoardUI components. The generated output is in `out/`.

Sections use Motion to fade in and rise slightly when they enter the viewport. The animation runs once per section and is disabled when the visitor prefers reduced motion.

The home page also uses source-owned React Bits components: Fold Text for the main heading, Curved Loop for the learning divider, and Spotlight Card for the benefit images. Their source lives in `components/` and has been tuned to the site's semantic colors and compact spacing. The React Bits registry is configured in `components.json`; the shadcn MCP server is configured in the workspace `.codex/config.toml` and loads when Codex restarts.

Additional home-page motion uses Animated Content for the getting-started steps and reviews, Scroll Expand for a Mumbai tuition scene, and Text Loop just above the footer. The review cards quote the Google review screenshots supplied for this project; they are static selections, not a live review feed.

The Scroll Expand scene is an original generated illustration, exported as a 1600 × 900 WebP at about 318 KiB in `public/images/scroll-mumbai.webp`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3005`.

## Build and check

```bash
npm run typecheck
npm run build
npm run test:browser
```

The build creates static HTML, CSS, JavaScript, and image files in `out/`. The browser check expects the dev server on port 3005 and tests all four pages at desktop and mobile widths.

## Public URL and dashboard login

The header's **Log in** button opens the separate Django dashboard. Locally it points to `http://127.0.0.1:8000/login/`; in production it points to `https://dashboard.vidyamhometuition.in/login/`. Set `NEXT_PUBLIC_DASHBOARD_LOGIN_URL` before building if your dashboard uses another address.

The site exports `sitemap.xml` and `robots.txt` and gives each page its own title, description and canonical URL. Set `NEXT_PUBLIC_SITE_URL` to the final public origin, such as `https://vidyamhometuition.in`, before the production build. The default is that same domain. Rebuild and redeploy after changing either variable because this is a static export.

## Contact flow

The contact form opens a prepared email in the visitor's mail app. The site has no submission backend, so it does not claim to send or store an enquiry. Phone and email links use the details provided for this project. The supplied email is `info@vidyamhometuition.in`; confirm its spelling before publishing.

The six original illustrations are stored in `public/images/` as optimized PNG files. The three large scenes are 500–800 KiB for clarity; the three smaller home-page illustrations are 100–150 KiB. Their generation and export notes are recorded in [ILLUSTRATIONS.md](ILLUSTRATIONS.md).
