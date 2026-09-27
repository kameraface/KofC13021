import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { council } from "../data/content";
import { isMember, setMember } from "../lib/storage";

const groups = [
  {
    label: "About",
    links: [
      ["/about", "Our council"],
      ["/about/officers", "Officers"],
      ["/about/charter", "Charter members"],
      ["/about/history", "History of the Order"],
      ["/about/founder", "Fr. McGivney"],
      ["/about/emblem", "Emblem"],
      ["/about/john-paul-ii", "John Paul II"],
    ],
  },
  {
    label: "Membership",
    links: [
      ["/membership", "Why join"],
      ["/membership/join", "How to join"],
      ["/membership/degrees", "Degree dates"],
      ["/membership/roster", "Roster"],
      ["/membership/resources", "Member resources"],
    ],
  },
  {
    label: "Charity",
    links: [
      ["/charity", "United in charity"],
      ["/charity/volunteer", "Volunteer"],
      ["/charity/programs", "Programs"],
      ["/charity/partners", "Partners"],
    ],
  },
  {
    label: "Events",
    links: [
      ["/events", "Upcoming"],
      ["/events/calendar", "Calendar"],
      ["/events/signup", "Sign up"],
      ["/events/golf", "Golf tournament"],
      ["/events/gallery", "Photo gallery"],
    ],
  },
];

function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 4l22 10v18c0 14-10 24-22 28C20 56 10 46 10 32V14L32 4z" fill="#1c2c49" />
      <path d="M32 16v30M20 28h24" stroke="#e6d3a1" strokeWidth="3" />
    </svg>
  );
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const member = isMember();

  function close() {
    setOpen(false);
  }

  function logout() {
    setMember(false);
    close();
    window.location.assign("/");
  }

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <div className="topbar">
        <div className="topbar-inner">
          <span>Council {council.number} · {council.parish}, {council.neighborhood}</span>
          <span>
            <a href={council.emailHref}>{council.email}</a>
            {" · "}
            <a href={council.phoneHref}>{council.phone}</a>
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="nav-inner">
          <Link className="brand" to="/" onClick={close}>
            <Mark />
            <span>
              <strong>{council.name}</strong>
              <span>Knights of Columbus</span>
            </span>
          </Link>
          <button className="nav-toggle" type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? "Close" : "Menu"}
          </button>
          <div className={open ? "nav-panel open" : "nav-panel"}>
          <nav className="nav" aria-label="Primary" key={location.pathname}>
            <NavLink to="/" end onClick={close}>Home</NavLink>
            {groups.map((group) => (
              <div className="nav-item" key={group.label}>
                <button className="nav-parent" type="button">{group.label}</button>
                <div className="menu">
                  {group.links.map(([href, label]) => (
                    <NavLink key={href} to={href} onClick={close}>{label}</NavLink>
                  ))}
                </div>
              </div>
            ))}
            <NavLink to="/faith" onClick={close}>Faith</NavLink>
            <NavLink to="/news" onClick={close}>News</NavLink>
            <NavLink to="/donate" onClick={close}>Donate</NavLink>
            <NavLink to="/contact" onClick={close}>Contact</NavLink>
          </nav>
          <div className={open ? "nav-tools open" : "nav-tools"}>
            <NavLink to="/polls" onClick={close}>Polls</NavLink>
            <NavLink to="/search" onClick={close}>Search</NavLink>
            {member ? (
              <button className="btn ghost" type="button" onClick={logout}>Sign out</button>
            ) : (
              <NavLink to="/login" onClick={close}>Sign in</NavLink>
            )}
          </div>
          </div>
        </div>
      </header>
      <main id="content" className="wrap">{children}</main>
      <footer className="footer">
        <div className="footer-inner footer-grid">
          <div>
            <h2>{council.name}</h2>
            <p>Council {council.number} at {council.parish} Parish.</p>
            <p>{council.address}<br />{council.city}</p>
          </div>
          <div>
            <h2>Visit</h2>
            <ul>
              <li><Link to="/events/calendar">Calendar</Link></li>
              <li><Link to="/membership/join">Join the council</Link></li>
              <li><Link to="/events/signup">Sign up for an event</Link></li>
              <li><Link to="/polls">Council polls</Link></li>
            </ul>
          </div>
          <div>
            <h2>Also</h2>
            <ul>
              <li><a href={council.parishUrl}>Our Lady of Lourdes</a></li>
              <li><a href={council.stateUrl}>Colorado State Council</a></li>
              <li><a href={council.supremeUrl}>Knights of Columbus</a></li>
              <li><a href={council.insuranceUrl}>Insurance</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-inner legal">
          Charity, unity, fraternity, and patriotism. This is the council’s own site, written for Council {council.number}.
        </div>
      </footer>
    </>
  );
}

export function PageHero({ kicker, title, lede }) {
  return (
    <header className="page-hero">
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <h1>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  );
}

export function SampleNote({ children }) {
  return <p className="note">{children}</p>;
}
