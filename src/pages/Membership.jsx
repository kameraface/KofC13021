import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { council, events, formatDate, sampleRoster } from "../data/content";
import { PageHero, SampleNote } from "../components/Layout";
import { isMember, setMember } from "../lib/storage";

export function WhyJoin() {
  return (
    <>
      <PageHero
        kicker="Membership"
        title="Why join the Knights"
        lede="Catholic men, 18 and older, who want a parish to work in and brothers who will notice if they disappear."
      />
      <div className="grid-2">
        <article className="card">
          <h3>A family life with other men in it</h3>
          <p>Degrees, breakfasts, and the hall are built for households. Wives and children are not an afterthought at a council event.</p>
        </article>
        <article className="card">
          <h3>Work you can point at</h3>
          <p>Hospitality, a clothing drive, a cookout. The parish already knows these jobs. Joining means taking a turn.</p>
        </article>
        <article className="card">
          <h3>A faith that meets on a weeknight</h3>
          <p>Prayer at the start of business, and the programs the Order calls Faith in Action when the officers choose a year.</p>
        </article>
        <article className="card">
          <h3>Practical protection</h3>
          <p>
            The Order still offers insurance to members, in the line McGivney started for widows.
            A field agent explains the products; this site does not.{" "}
            <a href={council.insuranceUrl}>Knights insurance</a>
          </p>
        </article>
      </div>
      <p style={{ marginTop: "1rem" }}><Link className="btn" to="/membership/join">How to join</Link></p>
    </>
  );
}

export function Join() {
  return (
    <>
      <PageHero
        kicker="Membership"
        title="How to join"
        lede="Talk to a brother, then complete the Order’s online form. The council will walk you to the exemplification."
      />
      <ol className="grid-3" style={{ padding: 0, listStyle: "none" }}>
        <li className="card"><h3>1. Write Evan</h3><p>Membership questions go to Evan Frazier at <a href={council.emailHref}>{council.email}</a>, or ask a Knight at Sunday hospitality.</p></li>
        <li className="card"><h3>2. Join online</h3><p>The Supreme Council’s e-membership form is the paperwork. You will need your parish and a proposer if you have one.</p><p><a href={council.joinUrl}>kofc.org/join</a></p></li>
        <li className="card"><h3>3. Take the degree</h3><p>Charity, Unity, and Fraternity are conferred together. Watch the degree dates, then tell the council you are coming.</p><p><Link to="/membership/degrees">Degree dates</Link></p></li>
      </ol>
    </>
  );
}

export function Degrees() {
  const degree = events.find((event) => event.slug === "exemplification");
  return (
    <>
      <PageHero
        kicker="Membership"
        title="Degree dates"
        lede="New members enter through the exemplification of Charity, Unity, and Fraternity. The patriotic degree is a later step for those who want it."
      />
      <SampleNote>The date below is a planning marker so the page has a shape. Replace it when Colorado publishes the next hosted degree.</SampleNote>
      {degree ? (
        <article className="event-card" style={{ marginTop: "1rem" }}>
          <span className="chip">{degree.category}</span>
          <h3>{degree.title}</h3>
          <p className="meta">{formatDate(degree.date)} · {degree.time} · {degree.place}</p>
          <p>{degree.details}</p>
          <Link to={`/events/${degree.slug}`}>Sign up</Link>
        </article>
      ) : null}
      <article className="panel" style={{ marginTop: "1rem" }}>
        <h2>Fourth Degree</h2>
        <p>
          The patriotic degree is its own assembly, not a second council. Men who have completed the exemplification may be invited.
          Ask the Grand Knight which assembly sits nearest Lourdes before you promise a Saturday.
        </p>
      </article>
    </>
  );
}

export function Roster() {
  const member = isMember();
  return (
    <>
      <PageHero
        kicker="Membership"
        title="Member roster"
        lede="Officers are public. The brotherhood roll is for members, and it should be the real roll — not a list this site invented."
      />
      <p><Link to="/about/officers">Public officers</Link></p>
      {member ? (
        <>
          <SampleNote>
            You are signed in on this browser. The rows below are a design sample so the table can be judged. They are not Council {council.number}’s roll. Replace them in the site content before anyone relies on this page.
          </SampleNote>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Joined</th><th>Degree</th></tr>
              </thead>
              <tbody>
                {sampleRoster.map((row) => (
                  <tr key={row.name}><td>{row.name}</td><td>{row.joined}</td><td>{row.degree}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <article className="panel">
          <h2>Members sign in</h2>
          <p>The roster stays behind the sign-in until the council decides what belongs in public.</p>
          <Link className="btn" to="/login">Sign in</Link>
        </article>
      )}
    </>
  );
}

export function Resources() {
  if (!isMember()) {
    return (
      <>
        <PageHero kicker="Members" title="Member resources" lede="Minutes, forms, and the working files of the council." />
        <article className="panel">
          <p>This page is for brothers. Sign in to open it. The preview passphrase is on the sign-in page and is not real security.</p>
          <Link className="btn" to="/login">Sign in</Link>
        </article>
      </>
    );
  }
  return (
    <>
      <PageHero kicker="Members" title="Member resources" lede="A shelf for minutes and forms. Drop PDFs in the site when you have them." />
      <div className="grid-2">
        <article className="card">
          <h3>Minutes</h3>
          <p className="meta">None posted. The Recorder’s latest set belongs here.</p>
        </article>
        <article className="card">
          <h3>Forms</h3>
          <p>Membership interest, degree registration, and the volunteer sheet can live as files. Until then, use the sign-up and volunteer pages.</p>
          <p><Link to="/events/signup">Event sign-up</Link> · <Link to="/charity/volunteer">Volunteer</Link></p>
        </article>
      </div>
    </>
  );
}

export function Login() {
  const [error, setError] = useState("");
  const [go, setGo] = useState(false);
  if (go) return <Navigate to="/membership/resources" replace />;
  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phrase = String(data.get("phrase") || "");
    if (phrase.trim().toLowerCase() === "council13021") {
      setMember(true);
      setGo(true);
      return;
    }
    setError("That passphrase does not match the preview.");
  }
  return (
    <>
      <PageHero
        kicker="Members"
        title="Sign in"
        lede="A browser session for the roster and the resource shelf. It is a prototype, not an account system."
      />
      <SampleNote>
        Preview passphrase: council13021. Anyone who can read this page can use it. Replace it with real member authentication before the site is public.
      </SampleNote>
      <form onSubmit={onSubmit} style={{ maxWidth: "28rem", marginTop: "1rem" }}>
        <label>Passphrase<input name="phrase" type="password" autoComplete="current-password" /></label>
        {error ? <p className="error">{error}</p> : null}
        <button className="btn" type="submit">Enter</button>
      </form>
    </>
  );
}
