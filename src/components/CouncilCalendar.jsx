import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { events as sampleEvents } from "../data/content";
import { eventParts, fetchGoogleCalendarEvents, googleCalendarConfig, googleCalendarWebUrl, CALENDAR_TIME_ZONE } from "../lib/googleCalendar";

function sampleAsCalendarEvents() {
  return [...sampleEvents]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((event) => ({
      id: event.slug,
      title: event.title,
      start: `${event.date}T12:00:00`,
      end: `${event.date}T12:00:00`,
      allDay: false,
      place: event.place,
      description: event.summary,
      timeLabelOverride: event.time,
      htmlLink: "",
      slug: event.slug,
      source: "sample",
      sample: true,
    }));
}

function groupByMonth(items) {
  const groups = [];
  for (const event of items) {
    const { monthKey } = eventParts(event);
    const last = groups[groups.length - 1];
    if (last?.monthKey === monthKey) last.events.push(event);
    else groups.push({ monthKey, events: [event] });
  }
  return groups;
}

export default function CouncilCalendar() {
  const [state, setState] = useState({ status: googleCalendarConfig.isConfigured ? "loading" : "sample", events: [], error: "" });

  useEffect(() => {
    if (!googleCalendarConfig.isConfigured) {
      setState({ status: "sample", events: sampleAsCalendarEvents(), error: "" });
      return;
    }
    const controller = new AbortController();
    fetchGoogleCalendarEvents({ signal: controller.signal })
      .then(({ events }) => setState({ status: events.length ? "live" : "empty", events, error: "" }))
      .catch((error) => {
        if (error.name !== "AbortError") setState({ status: "error", events: sampleAsCalendarEvents(), error: error.message });
      });
    return () => controller.abort();
  }, []);

  const groups = useMemo(() => groupByMonth(state.events), [state.events]);
  const next = state.events[0];
  const live = state.status === "live" || state.status === "empty";
  const webUrl = googleCalendarWebUrl();

  return (
    <section className="gcal-frame" aria-label="Council calendar">
      <header className="gcal-head">
        <div>
          <p className="kicker">Council calendar · {CALENDAR_TIME_ZONE.replace("_", " ")}</p>
          <h2>{live ? "From the council’s Google Calendar" : "Calendar space — sample dates"}</h2>
        </div>
        <div className="gcal-head-actions">
          <span className={live ? "chip live" : "chip warn"}>{live ? "Google Calendar" : "Samples — not connected"}</span>
          {webUrl ? <a className="btn secondary light" href={webUrl} target="_blank" rel="noreferrer">Open in Google Calendar</a> : null}
        </div>
      </header>

      {!googleCalendarConfig.isConfigured ? (
        <div className="gcal-notice" role="note">
          <strong>To connect this space, Karl — still needed from the council’s Google account:</strong>
          <ol>
            <li>Set the council calendar <strong>public</strong>, “See all event details,” and keep personal events off it.</li>
            <li>Send the <strong>Calendar ID</strong> (Google Calendar → Settings → <em>Integrate calendar</em>).</li>
            <li>Send a <strong>Google Calendar API key</strong> restricted to the Calendar API and to this site’s domains, plus <code>http://localhost:5173/*</code>.</li>
          </ol>
          <p>Put them in <code>.env.local</code> as <code>VITE_GOOGLE_CALENDAR_ID</code> and <code>VITE_GOOGLE_CALENDAR_API_KEY</code> (see <code>.env.example</code>). Until then this frame shows marked sample dates — never treat them as the published schedule.</p>
        </div>
      ) : null}
      {state.status === "loading" ? <p className="gcal-state">Loading the council calendar…</p> : null}
      {state.status === "error" ? <p className="gcal-state error">Google Calendar could not be read ({state.error}). Showing sample dates below.</p> : null}
      {state.status === "empty" ? <p className="gcal-state">No upcoming events are on the council Google Calendar yet.</p> : null}

      {next ? (
        <article className="gcal-next">
          <div className="gcal-date-rail" aria-hidden="true">
            <span>{eventParts(next).weekday}</span><strong>{eventParts(next).dayNumber}</strong>
          </div>
          <div>
            <p className="kicker">Next up</p>
            <h3>{next.slug ? <Link to={`/events/${next.slug}`}>{next.title}</Link> : next.htmlLink ? <a href={next.htmlLink} target="_blank" rel="noreferrer">{next.title}</a> : next.title}</h3>
            <p className="meta">{eventParts(next).fullDate} · {next.timeLabelOverride || eventParts(next).timeLabel}{next.place ? ` · ${next.place}` : ""}</p>
            {next.description ? <p>{next.description}</p> : null}
            {next.sample ? <span className="chip warn">Sample date</span> : null}
          </div>
        </article>
      ) : null}

      <div className="gcal-stream">
        {groups.map((group) => (
          <section key={group.monthKey} className="gcal-month">
            <h3>{group.monthKey}</h3>
            {group.events.map((event) => {
              const parts = eventParts(event);
              return (
                <article className="gcal-row" key={event.id}>
                  <div className="gcal-date-rail small" aria-hidden="true"><span>{parts.weekday}</span><strong>{parts.dayNumber}</strong></div>
                  <div className="gcal-row-main">
                    <h4>{event.slug ? <Link to={`/events/${event.slug}`}>{event.title}</Link> : event.htmlLink ? <a href={event.htmlLink} target="_blank" rel="noreferrer">{event.title}</a> : event.title}</h4>
                    <p className="meta">{parts.fullDate} · {event.timeLabelOverride || parts.timeLabel}{event.place ? ` · ${event.place}` : ""}</p>
                    {event.description ? <p>{event.description}</p> : null}
                  </div>
                  <div className="gcal-row-side">
                    {event.sample ? <span className="chip warn">Sample date</span> : null}
                    {event.htmlLink ? <a href={event.htmlLink} target="_blank" rel="noreferrer">Google Calendar ↗</a> : null}
                  </div>
                </article>
              );
            })}
          </section>
        ))}
      </div>

      <footer className="gcal-foot">
        <span>{live ? "Times shown in America/Denver." : "Sample dates are placeholders until Google Calendar is connected."}</span>
        <Link to="/events">All upcoming</Link>
      </footer>
    </section>
  );
}