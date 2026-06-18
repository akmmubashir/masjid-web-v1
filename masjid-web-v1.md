# masjid-web-v1

`masjid-web-v1` is a Vite + React + TypeScript web app for managing masjid operations and community records.

## Overview

The app includes:

- House and family management
- Member details and house-level contribution tracking
- Payments and receipts
- Announcements and notifications
- Reports and subscriptions
- Role-based user management
- Settings and login flow

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Zustand
- Recharts
- Sonner
- Lucide React

## Main Routes

- `/login` - authentication screen
- `/` - dashboard
- `/houses` - house list
- `/houses/:id` - house detail view
- `/users` - user management
- `/payments` - payments screen
- `/announcements` - announcements
- `/reports` - reporting
- `/subscriptions` - subscription management
- `/settings` - app settings
- `/notifications` - notification center

## Local Development

1. Install dependencies with `npm install`
2. Start the dev server with `npm run dev`
3. Build for production with `npm run build`
4. Preview the production build with `npm run preview`

## Notes

- The app uses lazy-loaded routes for better performance.
- A PWA update prompt and toast notifications are included at the shell level.
- Mock data lives in `src/lib/mockData.ts` for local development and UI testing.
