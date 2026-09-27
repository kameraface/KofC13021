import { council } from "../data/content";
import { PageHero } from "../components/Layout";
import { Intentions } from "../components/Widgets";

export default function Faith() {
  return (
    <>
      <PageHero
        kicker="Faith and family"
        title="Prayer, fathers, and the parish schedule"
        lede="The council does not invent holy hours. We point at the parish, and we keep a place for intentions the men actually name."
      />
      <div className="grid-2">
        <article className="panel">
          <h2>Adoration</h2>
          <p>
            Hours for adoration are set by {council.parish}, not by the council. Check the parish before you promise a slot,
            then tell the Grand Knight if the Knights are covering a particular hour.
          </p>
          <p><a href={council.parishUrl}>lourdesdenver.org</a></p>
        </article>
        <article className="panel">
          <h2>Fatherhood and family</h2>
          <p>
            The Order’s family programs — including Into the Breach — give a council a text and a night to use it.
            Run one when the chaplain and the Grand Knight agree it fits the year. Households are welcome at hospitality and at the cookout either way.
          </p>
        </article>
      </div>
      <section className="section">
        <h2>Prayer intentions</h2>
        <p className="meta">Posted intentions stay in this browser until the council connects a shared list.</p>
        <Intentions />
      </section>
    </>
  );
}
