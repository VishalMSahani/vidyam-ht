# Vidyam Home Tuition

A four-page, responsive website built with Next.js static export, Tailwind CSS v4, and installed BoardUI components. The generated output is in `out/`.

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

## Contact flow

The contact form opens a prepared email in the visitor's mail app. The site has no submission backend, so it does not claim to send or store an enquiry. Phone and email links use the details provided for this project. The supplied email is `info@vidyamhometuition.in`; confirm its spelling before publishing.

The six original illustrations are stored in `public/images/` as optimized PNG files. The three large scenes are 500–800 KiB for clarity; the three smaller home-page illustrations are 100–150 KiB. Their generation and export notes are recorded in [ILLUSTRATIONS.md](ILLUSTRATIONS.md).
