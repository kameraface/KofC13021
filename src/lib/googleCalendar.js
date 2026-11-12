export const CALENDAR_TIME_ZONE = "America/Denver";

const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID?.trim();
const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY?.trim();

export const googleCalendarConfig = {
  calendarId: calendarId || "",
  hasApiKey: Boolean(apiKey),
  isConfigured: Boolean(calendarId && apiKey),
};

export function googleCalendarWebUrl() {
  if (!calendarId) return "";
  return `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarId)}`;
}

function stripHtml(value = "") {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function normalizeEvent(item) {
  const allDay = Boolean(item.start?.date && !item.start?.dateTime);
  const start = item.start?.dateTime || (item.start?.date ? `${item.start.date}T12:00:00` : "");
  const end = item.end?.dateTime || (item.end?.date ? `${item.end.date}T12:00:00` : start);
  if (!start) return null;
  return {
    id: item.id,
    title: item.summary?.trim() || "Council event",
    start,
    end,
    allDay,
    place: item.location?.trim() || "",
    description: stripHtml(item.description || ""),
    htmlLink: item.htmlLink || "",
    source: "google",
    sample: false,
  };
}

export async function fetchGoogleCalendarEvents({ maxResults = 50, signal } = {}) {
  if (!googleCalendarConfig.isConfigured) {
    return { events: [], configured: false, error: "" };
  }
  const params = new URLSearchParams({
    key: apiKey,
    timeMin: new Date().toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    timeZone: CALENDAR_TIME_ZONE,
    maxResults: String(maxResults),
  });
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Google Calendar returned ${response.status}`);
  const data = await response.json();
  const events = (data.items || []).map(normalizeEvent).filter(Boolean);
  return { events, configured: true, error: "" };
}

const dayFmt = new Intl.DateTimeFormat("en-US", { timeZone: CALENDAR_TIME_ZONE, weekday: "short" });
const monthFmt = new Intl.DateTimeFormat("en-US", { timeZone: CALENDAR_TIME_ZONE, month: "long", year: "numeric" });
const dateFmt = new Intl.DateTimeFormat("en-US", { timeZone: CALENDAR_TIME_ZONE, weekday: "long", month: "long", day: "numeric", year: "numeric" });
const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: CALENDAR_TIME_ZONE, hour: "numeric", minute: "2-digit", timeZoneName: "short" });

export function eventParts(event) {
  const start = new Date(event.start);
  const end = new Date(event.end || event.start);
  return {
    weekday: dayFmt.format(start),
    dayNumber: new Intl.DateTimeFormat("en-US", { timeZone: CALENDAR_TIME_ZONE, day: "numeric" }).format(start),
    monthKey: monthFmt.format(start),
    fullDate: dateFmt.format(start),
    timeLabel: event.allDay ? "All day" : `${timeFmt.format(start)} – ${timeFmt.format(end)}`,
  };
}
