import GoogleCalendarAgenda from "./components/GoogleCalendarAgenda";
import { council, intro, projects, video } from "./data/content";

export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        {/* Logo: original artwork from lourdesdenver.org (olol_centered_white-01.png, 2100x735), resized copy in public/ */}
        <a className="parish-brand" href="https://lourdesdenver.org/" aria-label="Our Lady of Lourdes Catholic Parish — parish home">
          <img className="parish-logo" src={`${import.meta.env.BASE_URL}lourdes-logo.png`} alt="Our Lady of Lourdes Catholic Parish" />
        </a><span className="menu-icon" aria-hidden="true">☰</span>
      </header>
      <main className="content">
        <div className="council-header">
          <img className="emblem" src={`${import.meta.env.BASE_URL}kofc-emblem.png`} alt="Knights of Columbus emblem" />
          <div><h1>{council.title}</h1><p className="subtitle">{council.subtitle}</p></div>
        </div>

        <section className="card intro"><p>{intro}</p>
          {council.boardPdfUrl
            ? <a className="gold-link" href={council.boardPdfUrl} target="_blank" rel="noreferrer">▤ View current board (PDF)</a>
            : <span className="gold-link" aria-disabled="true">▤ [LINK] View current board (PDF)</span>}
          <p className="facts">Grand Knight {council.grandKnight.name}, {council.grandKnight.term} · Membership: {council.membership.name} — <a href={council.emailHref}>{council.email}</a>. {council.officersNote} Gifts straight to the council are generally not tax-deductible.</p>
        </section>

        <div className="events-projects">
          <section className="card"><h2>Upcoming Events</h2><GoogleCalendarAgenda /></section>
          <section className="card"><h2>Current Projects &amp; Charities</h2>
            <ul className="projects">{projects.map(p => <li key={p}>{p}</li>)}</ul>
            <div className="ytd"><span className="ytd-label">CHARITY GIVEN YTD</span><span className="ytd-amount">{council.charityYtd || "[$XX,XXX]"}</span><span className="ytd-note">{council.charityYtd ? "" : "[Placeholder — council provides real YTD total]"}</span></div>
          </section>
        </div>

        <section className="get-involved"><div><h2>Get involved →</h2><p>Join the council or volunteer — open the interest form when ready.</p></div>
          {council.interestFormUrl
            ? <a className="gold-btn" href={council.interestFormUrl} target="_blank" rel="noreferrer">[LINK] Open interest form →</a>
            : <span className="gold-btn" aria-disabled="true">[LINK] Open interest form →</span>}
        </section>

        <section className="breach"><h2>Into the Breach</h2><p className="muted">Embed the Knights of Columbus “Into the Breach” YouTube series (iframe on the live page).</p>
          <div className="video"><iframe src={video.embed} title="Into the Breach — YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
          <a className="gold-link" href={video.watch} target="_blank" rel="noreferrer">Open trailer on YouTube</a>
        </section>

        <div className="contact-row"><span className="contact-label">Contact</span><span className="arrow">→</span><a href={council.emailHref}>{council.email}</a></div>
      </main>
      <footer className="site-footer"><p className="footer-brand">{council.parish}</p><p>{council.address} · {council.phone}</p><span className="rule" /><p className="copy">© 2026 Our Lady of Lourdes Catholic Parish · Archdiocese of Denver</p></footer>
    </div>
  );
}
