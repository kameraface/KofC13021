import { Link, useParams } from "react-router-dom";
import { events, eventBySlug, formatDate, slides } from "../data/content";
import { PageHero, SampleNote } from "../components/Layout";
import { Calendar, EventList, SignupForm } from "../components/Widgets";
import { upcomingEvents } from "../data/content";

export function EventsHome() {
  return (
    <>
      <PageHero kicker="Events" title="Upcoming" lede="Dates with a sample chip are placeholders so the calendar is never blank. Swap them when the Grand Knight publishes the month." />
      <EventList items={upcomingEvents(8)} />
    </>
  );
}

export function CalendarPage() {
  return (
    <>
      <PageHero kicker="Events" title="Calendar" lede="A month at a time. Select a day to see what is posted." />
      <Calendar />
    </>
  );
}

export function SignupPage() {
  const open = events.filter((event) => event.signup);
  return (
    <>
      <PageHero kicker="Events" title="Sign up" lede="Pick an event. Your name stays in this browser until the council connects a shared list." />
      {open.map((event) => (
        <section className="section" key={event.slug}>
          <SignupForm event={event} />
        </section>
      ))}
    </>
  );
}

export function EventDetail() {
  const { slug } = useParams();
  const event = eventBySlug(slug);
  if (!event) {
    return (
      <PageHero title="That event is not posted" lede="It may have been renamed. The calendar has what is current." />
    );
  }
  return (
    <>
      <PageHero kicker={event.category} title={event.title} lede={event.summary} />
      {event.sample ? <SampleNote>Sample date. Confirm before you print it in a bulletin.</SampleNote> : null}
      <p className="meta">{formatDate(event.date)} · {event.time} · {event.place}</p>
      <p>{event.details}</p>
      {event.signup ? (
        <section className="section">
          <SignupForm event={event} />
        </section>
      ) : <p><Link to="/events/calendar">Back to the calendar</Link></p>}
    </>
  );
}

export function Golf() {
  const golf = events.find((event) => event.slug === "golf-tournament");
  return (
    <>
      <PageHero
        kicker="Every year"
        title="Annual golf tournament"
        lede="One page, not a new page every July. Change the course, the fee, and the beneficiary. Leave the address alone."
      />
      {golf ? (
        <article className="panel">
          <p className="meta">Save the date · {formatDate(golf.date)} · {golf.place}</p>
          <p>{golf.details}</p>
          <Link className="btn" to={`/events/${golf.slug}`}>Hold a foursome</Link>
        </article>
      ) : null}
      <div className="grid-3" style={{ marginTop: "1rem" }}>
        <article className="card"><h3>Foursome</h3><p>Four players, one check-in. Fee to be set by the committee.</p></article>
        <article className="card"><h3>Hole sponsor</h3><p>A sign on a tee and a line in the program. Good for a parish business.</p></article>
        <article className="card"><h3>Dinner only</h3><p>For the brother who does not play and still wants the room.</p></article>
      </div>
      <p style={{ marginTop: "1rem" }}><Link to="/donate">Sponsorship and gifts</Link></p>
    </>
  );
}

export function Gallery() {
  return (
    <>
      <PageHero
        kicker="Past events"
        title="Photo gallery"
        lede="Plates for the council’s own photographs. The captions are the work; the pictures should be yours."
      />
      <div className="grid-3">
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
    </>
  );
}
