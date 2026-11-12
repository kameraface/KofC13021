# Council 13021 — Pen-faithful page

Single page matching `KofC13021.pen` frame **“KofC 13021 — lourdesdenver.org”** (1200px, plus 390px mobile frame): Lourdes slate header, cream content, Council Header → Intro/Board PDF → Upcoming Events + Current Projects → Get Involved → Into the Breach → Contact → Lourdes footer. The disabled “old ideas” multi-page frames and the prior branch’s month-grid `/events/calendar` are **not** used.

## Calendar frame (as designed)
The Pen calendar is an **agenda list**, not a month grid: white box, `#DADCE0` border, chrome with “K of C Council 13021”, ‹ › + month label, Month/Week/**Agenda (selected)** tabs, rows with a 56×56 `#E8F0FE` date chip + event name + “time / location”, and a `#F8F9FA` footer. `src/components/GoogleCalendarAgenda.jsx` recreates that chrome and fills rows from Google Calendar API v3 (`singleEvents`, `orderBy=startTime`, `timeZone=America/Denver`). No month grid, no Google embed iframe. ‹ › moves the agenda window; Month/Week stay visible as in the Pen but Agenda is the designed view.

## Still needed from the council’s Google account — please provide
Not found in this project, so samples (marked **Sample**) show until connected:
1. Calendar made public, **“See all event details,”** with no personal events on it.
2. **Calendar ID** (Settings → Integrate calendar).
3. **Google Calendar API key** restricted to the Calendar API and this site’s domains, plus `http://localhost:5173/*`.

Copy `.env.example` to `.env.local` with `VITE_GOOGLE_CALENDAR_ID` / `VITE_GOOGLE_CALENDAR_API_KEY`, restart `npm run dev`.

## Confirmed facts
Father Damen McCaddon Council 13021, Our Lady of Lourdes, 2200 S. Logan St., Denver, CO 80210 · 303.722.6861 · Grand Knight J.D. Munn (July 2026–July 2028) · Membership: Evan Frazier, kofc13021@gmail.com. Unknown officer seats / charter roll left blank; charity YTD and board-PDF / interest-form links remain Pen placeholders until supplied. Gifts straight to the council are generally not tax-deductible.

## Run
```bash
npm install
npm run dev   # http://localhost:5173
npm run build
```
