# MenuVista

Photo menus for Sababa Falafel and Aleppo Kitchen, with a small analytics backend for menu interactions. Customers can browse dishes and prices, open item details on the Sababa menu, and follow a link to the restaurant's ordering site.

## How it works

The menus live in the page components, and the food photos live in `public/`. There is no CMS to configure. Updating a dish means editing its page data and image.

The Sababa page sends session and item click events through [the browser tracker](src/app/analytics/tracking.js) to `POST /api/analytics/track`. [The storage module](src/app/api/analytics/track/storage.js) appends events to `analytics-data.json`, with an in-memory fallback if file access fails. `GET /api/analytics/dashboard` aggregates those events for the dashboard, including a restaurant filter.

Built with Next.js 15, React 19, JavaScript, CSS Modules, and Tailwind CSS 4.

## Run locally

From the repository root, with Node.js and npm installed:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. The menu routes are `/sababa-falafel` and `/aleppo-kitchen`. After browsing the Sababa menu, open `/dashboard?restaurant=sababa-falafel` to inspect the recorded interactions. No environment variables or external database are required.

## Current scope

The restaurant pages and analytics routes are implemented. The homepage search is still a UI placeholder, and ordering happens on external sites.

Analytics is an experiment: only the Sababa page initializes tracking. Automatic view and section tracking still uses plain class selectors that do not match the pages' CSS Module classes. File storage also needs a writable, persistent filesystem; the memory fallback does not survive a process restart.
