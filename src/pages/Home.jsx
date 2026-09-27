import { Link } from "react-router-dom";
import { council, formatShort, principles, upcomingEvents } from "../data/content";
import { PhotoReel, EventList } from "../components/Widgets";

export default function Home() {
  const featured = upcomingEvents(3);
  return (
    <>
      <section className="hero">
        <div>
          <p className="kicker">Council {council.number} · Denver</p>
          <h1>Men of <em>{council.parish}</em>, at work in the parish.</h1>
          <p className="lede">
            {council.name} is the Knights of Columbus council at Our Lady of Lourdes.
            We pray with the parish, host hospitality after Mass, and run the drives and cookouts that keep charity local.
          </p>
          <div className="actions">
            <Link className="btn" to="/membership/join">Join us</Link>
            <Link className="btn secondary" to="/events">See events</Link>
            <Link className="btn ghost" to="/contact">Contact</Link>
          </div>
        </div>
        <aside className="bulletin">
          <h2>Coming up</h2>
          <ol>
            {featured.map((event) => (
              <li key={event.slug}>
                <Link to={`/events/${event.slug}`}>
                  <time dateTime={event.date}>{formatShort(event.date)}</time>
                  {event.title}
                </Link>
              </li>
            ))}
          </ol>
          <Link className="more" to="/events/calendar">Open the calendar</Link>
        </aside>
      </section>

      <section className="section">
        <PhotoReel />
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="kicker">On the calendar</p>
            <h2>Featured events</h2>
          </div>
          <Link to="/events/signup">Sign up</Link>
        </div>
        <EventList items={featured} />
      </section>

      <section className="section">
        <p className="kicker">The four principles</p>
        <h2>Why a council exists</h2>
        <div className="principles">
          {principles.map((item) => (
            <article className="principle" key={item.name}>
              <strong>{item.name}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section grid-3">
        <article className="card">
          <p className="kicker">Membership</p>
          <h3>Catholic men, 18 and older</h3>
          <p>Practical men who want a parish job and a band of brothers. Start with Evan Frazier.</p>
          <Link to="/membership">Why men join</Link>
        </article>
        <article className="card">
          <p className="kicker">Charity</p>
          <h3>Hospitality, drives, cookouts</h3>
          <p>The work the parish already knows us for, posted where it can be kept current.</p>
          <Link to="/charity">See the work</Link>
        </article>
        <article className="card">
          <p className="kicker">Ask the room</p>
          <h3>A poll before the meeting</h3>
          <p>Breakfast, the next drive, the weeknight that actually works.</p>
          <Link to="/polls">Vote</Link>
        </article>
      </section>
    </>
  );
}
