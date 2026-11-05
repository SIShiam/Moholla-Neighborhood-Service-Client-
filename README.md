# Mohollah (মহল্লা)

A neighborhood noticeboard for community service events in Dhaka. People post drives such as winter clothes distribution, tree planting and blood camps, and neighbors join them.



## Features

- Post an event with a type, photo, place, date and a volunteer goal. Past dates are rejected on both the client and the server.
- Browse upcoming events only. Search by title or area and filter by event type. Events whose date has passed never appear.
- Join an event with one click, see your sign-ups sorted by date, and leave an event if plans change.
- Manage Events lists only the drives you created, with edit and delete. The server checks ownership on every change.
- Email and password sign in plus Google, built on Better Auth with a MongoDB adapter. Protected API routes verify a signed JWT.
- Light and dark theme with a saved preference, loading skeletons on every list, and a profile page to update your name and photo.

## Tech

Next.js (App Router), Tailwind CSS with daisyUI, Better Auth (MongoDB adapter, JWT plugin), Express and MongoDB for the API.

## Run it locally

```bash
cp .env.example .env     # fill in the values
npm install
npm run dev
```

Start the API from the `server` folder (`npm run dev`) and run `npm run seed` once there to add sample events

## Gallery photos

Put six photos named `1.jpg` to `6.jpg` in `public/gallery`. Until then a coloured tile shows in each slot.
