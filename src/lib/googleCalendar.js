export const TZ = "America/Denver";
export const calendarConfig = {
  // Calendar ID supplied by council (from embed URL src=kofc13021@gmail.com). Not a secret.
  id: import.meta.env.VITE_GOOGLE_CALENDAR_ID || "kofc13021@gmail.com",
  apiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY || "",
};
export const embedUrl = "https://calendar.google.com/calendar/embed?src=kofc13021%40gmail.com&ctz=America%2FDenver";
export const isCalendarConfigured = Boolean(calendarConfig.id && calendarConfig.apiKey);

export async function fetchUpcomingEvents({ timeMin, maxResults = 25 } = {}) {
  const min = timeMin ? new Date(timeMin) : new Date();
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarConfig.id)}/events`);
  url.search = new URLSearchParams({
    key: calendarConfig.apiKey, timeMin: min.toISOString(), singleEvents: "true",
    orderBy: "startTime", maxResults: String(maxResults), timeZone: TZ,
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Calendar API ${res.status}`);
  const data = await res.json();
  return (data.items || []).filter(e => e.status !== "cancelled").map(e => ({
    id: e.id, title: e.summary || "(Untitled event)",
    start: e.start?.dateTime || e.start?.date, end: e.end?.dateTime || e.end?.date,
    allDay: Boolean(e.start?.date && !e.start?.dateTime),
    location: e.location || "", description: e.description || "", htmlLink: e.htmlLink || "",
  }));
}
const dateFmt = new Intl.DateTimeFormat("en-US",{timeZone:TZ,month:"short",day:"numeric",weekday:"short"});
const timeFmt = new Intl.DateTimeFormat("en-US",{timeZone:TZ,hour:"numeric",minute:"2-digit"});
const monthFmt = new Intl.DateTimeFormat("en-US",{timeZone:TZ,month:"long",year:"numeric"});
export function formatDateCol(iso){ const p=dateFmt.formatToParts(new Date(iso)); const g=t=>p.find(x=>x.type===t)?.value||""; return `${g("weekday")} ${g("month")} ${g("day")}`; }
export function formatMeta(ev){
  if(ev.allDay) return ev.location ? `All day · ${ev.location}` : "All day";
  const t = timeFmt.format(new Date(ev.start));
  return ev.location ? `${t} · ${ev.location}` : t;
}
export function monthLabel(events, offset){
  const base = events?.[0]?.start ? new Date(events[0].start) : new Date();
  if(offset){ base.setMonth(base.getMonth()+offset); }
  return monthFmt.format(base);
}
