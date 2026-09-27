import { Link } from "react-router-dom";
import { council, officers, principles } from "../data/content";
import { PageHero, SampleNote } from "../components/Layout";

export function About() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="Our council"
        lede={`${council.name} meets at ${council.parish} Parish, ${council.address}, ${council.city}. The state directory lists us as Council ${council.number}, in the Denver metro chapter.`}
      />
      <div className="grid-2">
        <article className="panel">
          <h2>Mission</h2>
          <p>
            Support the parish, look after one another’s families, and do charitable work a neighbor can see:
            hospitality after Mass, food and clothing for people who need them, and fundraisers the Grand Knight can explain in one sentence.
          </p>
          <p>
            Grand Knight J.D. Munn serves the July 2026 – July 2028 term. Membership questions go to Evan Frazier at{" "}
            <a href={council.emailHref}>{council.email}</a>.
          </p>
        </article>
        <article className="panel">
          <h2>On this site</h2>
          <ul>
            <li><Link to="/about/officers">Officers and leadership</Link></li>
            <li><Link to="/about/charter">Charter members</Link></li>
            <li><Link to="/about/history">History of the Knights of Columbus</Link></li>
            <li><Link to="/about/founder">Our founder, Fr. Michael J. McGivney</Link></li>
            <li><Link to="/about/emblem">Emblem of the Order</Link></li>
            <li><Link to="/about/john-paul-ii">The Knights and Pope St. John Paul II</Link></li>
          </ul>
        </article>
      </div>
    </>
  );
}

export function Officers() {
  return (
    <>
      <PageHero
        kicker="Leadership"
        title="Officers"
        lede="Two seats are public. The rest of the roll is waiting on the council, and the page leaves them blank rather than inventing brothers."
      />
      <div className="person-grid">
        {officers.map((officer) => {
          const initials = officer.name
            ? officer.name.split(" ").map((part) => part[0]).slice(0, 2).join("")
            : "—";
          return (
            <article className="person" key={officer.role}>
              <div className="initials" aria-hidden="true">{initials}</div>
              <p className="kicker">{officer.role}</p>
              <h3>{officer.name || "To be published"}</h3>
              {officer.term ? <p className="meta">{officer.term}</p> : null}
              {officer.email ? <p><a href={`mailto:${officer.email}`}>{officer.email}</a></p> : null}
              {officer.note ? <p>{officer.note}</p> : <p className="meta">Seat reserved for the elected officer.</p>}
            </article>
          );
        })}
      </div>
    </>
  );
}

export function Charter() {
  return (
    <>
      <PageHero
        kicker="The roll"
        title="Charter members"
        lede="The men who opened the council belong on this page by name. That list is not in the public directory, so the page is ready and empty."
      />
      <SampleNote>
        Send the charter roll to the Financial Secretary. Names added in the site content will appear here as a simple list, not a private roster.
      </SampleNote>
      <div className="panel" style={{ marginTop: "1rem" }}>
        <p className="meta">No charter names have been entered.</p>
      </div>
    </>
  );
}

export function History() {
  return (
    <>
      <PageHero
        kicker="The Order"
        title="A short history"
        lede="Written for this council. The long history lives at kofc.org; this is the version a new man can read before a meeting."
      />
      <article className="panel">
        <p>
          The Knights of Columbus began in 1882 in New Haven, Connecticut. Father Michael J. McGivney, a parish priest,
          gathered laymen to look after families when a working man died, and to give Catholic men a public life that was not borrowed from a non-Catholic lodge.
        </p>
        <p>
          The Order took the name of Christopher Columbus and organized around four principles: charity, unity, fraternity, and patriotism.
          Local councils sit inside parishes. State councils coordinate degrees and programs. The Supreme Council is the international body.
        </p>
        <p>
          Council {council.number}, {council.name}, is the council at {council.parish} in Denver’s {council.neighborhood} neighborhood.
          A year-by-year history of this council — charter date, past Grand Knights, the drives that mattered — still needs to be written from the minute books.
        </p>
        <p><a href={council.supremeUrl}>Read the Order’s own history</a></p>
      </article>
      <div className="principles" style={{ marginTop: "1rem" }}>
        {principles.map((item) => (
          <article className="principle" key={item.name}>
            <strong>{item.name}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </>
  );
}

export function Founder() {
  return (
    <>
      <PageHero
        kicker="Founder"
        title="Father Michael J. McGivney"
        lede="A parish priest who built a lay order so that widows would not be left alone and Catholic men would have a place to stand."
      />
      <article className="panel">
        <p>
          Michael Joseph McGivney was born in 1852 in Waterbury, Connecticut, ordained in 1877, and died in 1890 during an influenza outbreak, still a young priest.
          In the years between, at St. Mary’s in New Haven, he founded the Knights of Columbus.
        </p>
        <p>
          He was beatified in 2020. Councils keep his name in the work: practical charity, close to a parish, run by the men who live there.
          Our council’s own patron in the directory is Father Damen McCaddon; McGivney remains the founder of the Order every council belongs to.
        </p>
        <p><a href="https://www.fathermcgivney.org/">Father McGivney Guild</a></p>
      </article>
    </>
  );
}

export function Emblem() {
  return (
    <>
      <PageHero
        kicker="The mark"
        title="Emblem of the Order"
        lede="The emblem is a trademark of the Knights of Columbus. This page explains it. It does not redraw it."
      />
      <div className="grid-2">
        <article className="panel">
          <h2>What the pieces mean</h2>
          <p>A shield hangs on a formée cross, the cross associated with the crusades and, here, with a public Catholic faith.</p>
          <p>The shield is a knight’s defense. A bundle of rods, the fasces, is strength that comes from being bound together; the axe in that bundle stands for authority used in common.</p>
          <p>The anchor recalls Columbus the mariner. The sword is the knight’s weapon, turned toward the defense of the Church rather than a private quarrel.</p>
        </article>
        <article className="panel">
          <h2>The principles, beside the emblem</h2>
          <p>Charity, unity, fraternity, and patriotism are the four principles a man is asked to practice. They are not a second logo. They are the test of whether the shield means anything in Rosedale.</p>
          <p><a href={council.supremeUrl}>The Order’s own site</a></p>
        </article>
      </div>
    </>
  );
}

export function JohnPaul() {
  return (
    <>
      <PageHero
        kicker="The Church"
        title="The Knights and Pope St. John Paul II"
        lede="John Paul II treated the Knights as a lay body the Church could count on, and he said so in public more than once."
      />
      <article className="panel">
        <p>
          Across his pontificate he received Knights, blessed their work for families and for the persecuted Church, and tied lay charity to the mission of the parish.
          The Order has marked that relationship in programs and in print ever since.
        </p>
        <p>
          For this council the useful part is local: a pope who expected Catholic men to be visible in their own parishes.
          That is hospitality after Mass at Lourdes, a drive with a name on it, and a meeting that starts from prayer.
        </p>
        <p><a href={council.supremeUrl}>Knights of Columbus</a></p>
      </article>
    </>
  );
}
