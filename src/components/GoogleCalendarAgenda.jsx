import { useEffect, useMemo, useState } from "react";
import { embedUrl, fetchUpcomingEvents, formatDateCol, formatMeta, isCalendarConfigured, monthLabel } from "../lib/googleCalendar";
import { sampleEvents } from "../data/content";

/**
 * Pen frame: "Google Calendar Widget" inside Upcoming Events.
 * Agenda list only — no month grid, no Google embed iframe.
 * Chrome: title row, prev/next + month label, Month/Week/Agenda tabs (Agenda active),
 * 56px date chips, name + time/location, grey footer.
 */
export default function GoogleCalendarAgenda() {
  const [offset, setOffset] = useState(0);
  const [state, setState] = useState({ status: isCalendarConfigured ? "loading" : "sample", events: sampleEvents, error: "" });

  useEffect(() => {
    if (!isCalendarConfigured) { setState({ status: "sample", events: sampleEvents, error: "" }); return; }
    let live = true;
    setState(s => ({ ...s, status: "loading" }));
    const anchor = new Date(); anchor.setMonth(anchor.getMonth() + offset); anchor.setDate(1); anchor.setHours(0,0,0,0);
    fetchUpcomingEvents({ timeMin: offset === 0 ? new Date() : anchor })
      .then(events => live && setState({ status: "live", events, error: "" }))
      .catch(e => live && setState({ status: "error", events: sampleEvents, error: e.message }));
    return () => { live = false; };
  }, [offset]);

  const label = useMemo(() => monthLabel(state.events, 0), [state.events]);
  const footerLeft = state.status === "live" ? "Synced from Google Calendar · America/Denver"
    : state.status === "loading" ? "Loading from Google Calendar…"
    : state.status === "error" ? `Calendar unavailable (${state.error}) — showing samples`
    : "[Placeholder events — sync from Google Calendar]";

  return (
    <div className="gcal" aria-label="K of C Council 13021 Google Calendar, agenda view">
      <div className="gcal-chrome">
        <div className="gcal-title-row"><span className="gcal-title">K of C Council 13021</span><span className="gcal-tag">Google Calendar</span></div>
        <div className="gcal-nav">
          <div className="gcal-nav-left">
            <button type="button" aria-label="Previous month" onClick={() => setOffset(o => o - 1)}>‹</button>
            <button type="button" aria-label="Next month" onClick={() => setOffset(o => o + 1)}>›</button>
            <span className="gcal-month">{label}</span>
            {offset !== 0 && <button type="button" className="gcal-today" onClick={() => setOffset(0)}>Today</button>}
          </div>
          <div className="gcal-tabs" role="tablist" aria-label="Calendar view">
            <span className="gcal-tab" title="Agenda is the designed view for this page">Month</span>
            <span className="gcal-tab" title="Agenda is the designed view for this page">Week</span>
            <span className="gcal-tab active" role="tab" aria-selected="true">Agenda</span>
          </div>
        </div>
      </div>
      {state.events.length === 0 && state.status === "live"
        ? <p className="gcal-empty">No upcoming events on the council calendar.</p>
        : state.events.slice(0, 8).map(ev => (
          <div className="gcal-row" key={ev.id}>
            <div className="gcal-date">{formatDateCol(ev.start)}</div>
            <div className="gcal-body">
              <div className="gcal-name">{ev.htmlLink ? <a href={ev.htmlLink} target="_blank" rel="noreferrer">{ev.title}</a> : ev.title}{ev.sample && <span className="sample-chip">Sample</span>}</div>
              <div className="gcal-meta">{formatMeta(ev)}</div>
            </div>
          </div>
        ))}
      <div className="gcal-footer"><span>{footerLeft}</span><a className="gcal-footer-right" href={embedUrl} target="_blank" rel="noreferrer">Google Calendar ↗</a></div>
      {!isCalendarConfigured && (
        <p className="gcal-setup">Calendar <code>kofc13021@gmail.com</code> is linked, but not public yet — its embed currently returns a Google sign-in (401), so an iframe here would be blank for visitors. Council: set it public (“See all event details”) and add a restricted API key as <code>VITE_GOOGLE_CALENDAR_API_KEY</code> (see <code>.env.example</code>); this agenda will then fill from that calendar. Sample dates above are marked as samples.</p>
      )}
    </div>
  );
}
