import { useState } from "react";
import { Link } from "react-router-dom";
import { partners, programs, volunteerRoles } from "../data/content";
import { PageHero } from "../components/Layout";
import { addRecord, records } from "../lib/storage";

export function Charity() {
  return (
    <>
      <PageHero
        kicker="Charity and community"
        title="United in charity"
        lede="The impact we can claim in public is the work the parish and the Grand Knight already describe."
      />
      <div className="grid-3">
        <article className="card"><h3>After Mass</h3><p>Hospitality so a visitor is not left in the vestibule.</p></article>
        <article className="card"><h3>For the city</h3><p>Food and clothing drives for people who are homeless and for families the parish names.</p></article>
        <article className="card"><h3>At the grill</h3><p>Cookouts that raise money and put the council in one line.</p></article>
      </div>
      <p style={{ marginTop: "1rem" }}>
        <Link to="/charity/volunteer">Volunteer</Link>
        {" · "}
        <Link to="/charity/programs">Programs</Link>
        {" · "}
        <Link to="/charity/partners">Partners</Link>
      </p>
    </>
  );
}

export function Volunteer() {
  const [list, setList] = useState(() => records("volunteers"));
  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!name || !email.includes("@")) return;
    setList(addRecord("volunteers", {
      name,
      email,
      role: String(data.get("role") || ""),
    }));
    event.currentTarget.reset();
  }
  return (
    <>
      <PageHero kicker="Charity" title="Volunteer" lede="Pick a job. The list is stored on this browser so the form can be tried before a shared inbox exists." />
      <div className="grid-2">
        <form onSubmit={onSubmit}>
          <label>Name<input name="name" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Where you can help
            <select name="role">
              {volunteerRoles.map((role) => <option key={role}>{role}</option>)}
            </select>
          </label>
          <button className="btn" type="submit">Count me in</button>
        </form>
        <div className="panel">
          <h2>Offers from this browser</h2>
          {list.length === 0 ? <p className="meta">None yet.</p> : null}
          <ul>{list.map((item) => <li key={item.id}>{item.name} · {item.role}</li>)}</ul>
        </div>
      </div>
    </>
  );
}

export function Programs() {
  return (
    <>
      <PageHero kicker="Charity" title="Programs we support" lede="What this council is known for, plus the Order’s frame for choosing the rest of the year." />
      <div className="grid-2">
        {programs.map((program) => (
          <article className="card" key={program.name}>
            <h3>{program.name}</h3>
            <p>{program.text}</p>
          </article>
        ))}
      </div>
    </>
  );
}

export function Partners() {
  return (
    <>
      <PageHero kicker="Charity" title="Community partners" lede="The rooms this council actually answers to." />
      <div className="grid-3">
        {partners.map((partner) => (
          <article className="card" key={partner.name}>
            <h3><a href={partner.href}>{partner.name}</a></h3>
            <p>{partner.text}</p>
          </article>
        ))}
      </div>
    </>
  );
}
