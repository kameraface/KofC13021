import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { events, formatDate, formatShort, polls, slides } from "../data/content";
import { addRecord, addSignup, castVote, records, signupsFor, tally, voteFor } from "../lib/storage";

export function PhotoReel() {
  function scrollByDir(dir) {
    const node = document.getElementById("photo-reel");
    node?.scrollBy({ left: dir * node.clientWidth * 0.8, behavior: "smooth" });
  }
  return (
    <div className="reel-wrap">
      <div className="section-head">
        <div>
          <p className="kicker">From the hall</p>
          <h2>A reel of the work</h2>
        </div>
        <div className="reel-nav">
          <button className="btn ghost" type="button" onClick={() => scrollByDir(-1)}>Back</button>
          <button className="btn ghost" type="button" onClick={() => scrollByDir(1)}>Next</button>
        </div>
      </div>
      <div className="reel" id="photo-reel">
        {slides.map((slide) => (
          <article className={`plate s-${slide.id}`} key={slide.id}>
            <div className="copy">
              <p className="kicker">{slide.kicker}</p>
              <h3>{slide.title}</h3>
            </div>
            <p className="copy">{slide.caption}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function EventList({ items }) {
  return (
    <div className="grid-3">
      {items.map((event) => (
        <article className="event-card" key={event.slug}>
          <span className="chip">{event.category}</span>
          {event.sample ? <span className="chip warn">Sample date</span> : null}
          <h3><Link to={`/events/${event.slug}`}>{event.title}</Link></h3>
          <p className="meta">{formatDate(event.date)} · {event.time}</p>
          <p>{event.summary}</p>
        </article>
      ))}
    </div>
  );
}

export function Calendar() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(iso(today));

  const cells = useMemo(() => buildMonth(cursor), [cursor]);
  const selectedEvents = events.filter((event) => event.date === selected);

  return (
    <div className="calendar-layout">
      <div className="panel">
        <div className="cal-head">
          <button className="btn ghost" type="button" onClick={() => setCursor(shift(cursor, -1))}>Previous</button>
          <h2>{cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2>
          <button className="btn ghost" type="button" onClick={() => setCursor(shift(cursor, 1))}>Next</button>
        </div>
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}
        </div>
        <div className="days">
          {cells.map((cell) => {
            const count = events.filter((event) => event.date === cell.iso).length;
            return (
              <button
                key={cell.iso + cell.inMonth}
                type="button"
                className={`day${cell.inMonth ? "" : " out"}${cell.iso === selected ? " selected" : ""}${count ? " has" : ""}`}
                onClick={() => setSelected(cell.iso)}
              >
                {cell.day}
                <span className="sr">{count ? `, ${count} events` : ""}</span>
                <div>{Array.from({ length: count }).map((_, i) => <i className="dot" key={i} />)}</div>
              </button>
            );
          })}
        </div>
      </div>
      <aside className="panel">
        <p className="kicker">{formatDate(selected)}</p>
        {selectedEvents.length === 0 ? <p>Nothing posted this day.</p> : null}
        {selectedEvents.map((event) => (
          <p key={event.slug}>
            <Link to={`/events/${event.slug}`}><strong>{event.title}</strong></Link>
            <br />
            <span className="meta">{event.time} · {event.place}</span>
          </p>
        ))}
        <Link className="btn secondary" to="/events">All upcoming</Link>
      </aside>
    </div>
  );
}

function iso(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function shift(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}
function buildMonth(cursor) {
  const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const gridStart = new Date(start);
  gridStart.setDate(1 - start.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return {
      iso: iso(date),
      day: date.getDate(),
      inMonth: date.getMonth() === cursor.getMonth(),
    };
  });
}

export function SignupForm({ event }) {
  const [list, setList] = useState(() => signupsFor(event.slug));
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(formEvent) {
    formEvent.preventDefault();
    const data = new FormData(formEvent.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const guests = Number(data.get("guests") || 0);
    if (!name || !email.includes("@")) {
      setError("Name and a real email are required.");
      setDone(false);
      return;
    }
    const next = addSignup(event.slug, {
      name,
      email,
      phone: String(data.get("phone") || "").trim(),
      guests: Number.isFinite(guests) ? guests : 0,
      note: String(data.get("note") || "").trim(),
    });
    setList(next);
    setError("");
    setDone(true);
    formEvent.currentTarget.reset();
  }

  return (
    <div className="grid-2">
      <form onSubmit={onSubmit}>
        <h3>Sign up · {event.title}</h3>
        <p className="meta">{formatShort(event.date)} · {event.time}</p>
        <label>Name<input name="name" autoComplete="name" required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
        <label>Extra guests<input name="guests" type="number" min="0" max="12" defaultValue="0" /></label>
        <label>Note<textarea name="note" /></label>
        {error ? <p className="error">{error}</p> : null}
        {done ? <p className="success">You are on the list for this browser. The council still needs a shared inbox before launch.</p> : null}
        <button className="btn" type="submit">Save my spot</button>
      </form>
      <div className="panel">
        <h3>On this browser</h3>
        {list.length === 0 ? <p className="meta">No sign-ups stored here yet.</p> : null}
        <ul>
          {list.map((entry) => (
            <li key={entry.id}>{entry.name} · {entry.guests} guests</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PollBoard() {
  const [version, setVersion] = useState(0);
  void version;
  return (
    <div className="grid-3">
      {polls.map((poll) => {
        const choice = voteFor(poll.id);
        const total = poll.options.reduce((sum, option) => sum + tally(poll.id, option), 0);
        return (
          <article className="poll" key={poll.id}>
            <h3>{poll.question}</h3>
            {poll.options.map((option) => {
              const count = tally(poll.id, option);
              const pct = total ? Math.round((count / total) * 100) : 0;
              return (
                <button
                  key={option}
                  className={choice === option ? "poll-option chosen" : "poll-option"}
                  type="button"
                  disabled={Boolean(choice)}
                  onClick={() => {
                    castVote(poll.id, option);
                    setVersion((n) => n + 1);
                  }}
                >
                  {option}
                  {choice ? (
                    <>
                      <div className="bar"><span style={{ width: `${pct}%` }} /></div>
                      <span className="meta">{count} · {pct}%</span>
                    </>
                  ) : null}
                </button>
              );
            })}
            <p className="meta">{choice ? "Your vote is stored in this browser." : "One vote on this browser."}</p>
          </article>
        );
      })}
    </div>
  );
}

export function Intentions() {
  const [list, setList] = useState(() => records("intentions"));
  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = String(data.get("text") || "").trim();
    if (!text) return;
    setList(addRecord("intentions", { text, name: String(data.get("name") || "").trim() || "A brother" }));
    event.currentTarget.reset();
  }
  return (
    <div className="grid-2">
      <form onSubmit={onSubmit}>
        <label>Your name, if you want it shown<input name="name" /></label>
        <label>Intention<textarea name="text" required placeholder="For a family, a sick brother, a parish need." /></label>
        <button className="btn" type="submit">Post intention</button>
      </form>
      <div>
        {list.length === 0 ? <p className="meta">No intentions on this browser yet.</p> : null}
        {list.map((item) => (
          <article className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ContactForm() {
  const [done, setDone] = useState(false);
  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email.includes("@") || !message) return;
    addRecord("messages", {
      name,
      email,
      topic: String(data.get("topic") || ""),
      message,
    });
    setDone(true);
    event.currentTarget.reset();
  }
  return (
    <form onSubmit={onSubmit}>
      <label>Name<input name="name" required /></label>
      <label>Email<input name="email" type="email" required /></label>
      <label>Topic
        <select name="topic" defaultValue="Joining">
          <option>Joining</option>
          <option>An event</option>
          <option>A donation or sponsorship</option>
          <option>Something else</option>
        </select>
      </label>
      <label>Message<textarea name="message" required /></label>
      {done ? <p className="success">Saved on this browser. Email kofc13021@gmail.com if you need a person tonight.</p> : null}
      <button className="btn" type="submit">Send</button>
    </form>
  );
}
