# Council 13021

Website for Father Damen McCaddon Council, Knights of Columbus, at Our Lady of Lourdes Parish in Denver.

The pages follow the council outline: a home page with a photo reel, officers, history, membership, a calendar, event sign-up, a members’ roster, polls, news, donate, contact, search, and a 404.

## Run it

```bash
npm install
npm run dev
```

Open the address Vite prints. `npm run build` writes a static site to `dist/`.

## Edit the council’s facts

Names, events, news, and polls live in `src/data/content.js`.

Public facts already entered:

- Council 13021, Father Damen McCaddon Council
- Our Lady of Lourdes, 2200 S. Logan St., Denver
- Grand Knight J.D. Munn, July 2026 – July 2028
- Membership contact Evan Frazier, kofc13021@gmail.com

Empty officer seats and the charter roll are blank on purpose. Sample event dates are marked on the page. Replace them; do not treat them as the published schedule.

## What stays in the browser

Sign-ups, polls, prayer intentions, volunteer offers, contact messages, and the member sign-in are stored in `localStorage`. That lets the pages work on free static hosting. They are not a shared database: one brother’s vote does not appear on another brother’s phone.

The preview passphrase for the roster and member resources is `council13021`. It is printed on the sign-in page and is not real security.

Before a public launch, connect a form service or a small database, and replace the passphrase with actual member accounts. Gifts to the council are generally not tax-deductible; the donate page says so.
