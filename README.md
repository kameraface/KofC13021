# Council 13021

Website for Father Damen McCaddon Council, Knights of Columbus, at Our Lady of Lourdes Parish in Denver.

The pages follow the council outline: a home page with a photo reel, officers, history, membership, a calendar, event sign-up, a members’ roster, polls, news, donate, contact, search, and a 404.

## Run it

```bash
npm install
npm run dev
```

Open the address Vite prints. `npm run build` writes a static site to `dist/`.

## Connect Google Calendar (still needed — Karl)

The calendar space on `/events/calendar` is **not** a month grid and **not** Google’s
default embed/widget. It is the site’s own designed frame (navy header, featured
“Next up” event, chronological stream grouped by month, all times America/Denver)
fed directly from the council’s Google Calendar API. No iframe.

**Not yet in this project — please provide all three:**

1. In the council’s Google account, set that calendar to **public**, **“See all event
   details,”** and keep personal events off it.
2. The **Calendar ID** — Google Calendar → Settings → select the council calendar →
   *Integrate calendar* → Calendar ID.
3. A **Google Calendar API key** restricted to the **Calendar API** only and to this
   site’s domains (HTTP referrers), plus `http://localhost:5173/*` for local work.

Then:

```bash
cp .env.example .env.local   # fill in both values, never commit .env.local
npm run dev                  # restart after editing
```

For production, set the same two variables (`VITE_GOOGLE_CALENDAR_ID`,
`VITE_GOOGLE_CALENDAR_API_KEY`) in the host’s environment and rebuild. Until they are
set, the frame shows clearly-marked **sample dates** so the page is never blank.

> **Pen design:** the `.pen` file from Karl’s local folder (`/Users/Karl/gitcode/kofc13021`)
> is **not in this repo or in the cloud workspace**, so it could not be opened here.
> Please add the `.pen` file to the repo (or attach it to the PR). The frame above is
> built to be reconciled against it — flag any frame detail (order, colours, labels)
> that disagrees and it will be changed to match.

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
