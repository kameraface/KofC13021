import { council } from "../data/content";
import { PageHero } from "../components/Layout";
import { ContactForm } from "../components/Widgets";

export default function Contact() {
  const { lat, lon } = council.map;
  const pad = 0.01;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - pad}%2C${lat - pad}%2C${lon + pad}%2C${lat + pad}&layer=mapnik&marker=${lat}%2C${lon}`;
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Find the council"
        lede="We meet at the parish. The standing weeknight is published on the calendar once the Grand Knight sets it."
      />
      <div className="grid-2">
        <article className="panel">
          <h2>{council.parish}</h2>
          <p>
            {council.address}<br />
            {council.city}
          </p>
          <p>Parish phone <a href={council.phoneHref}>{council.phone}</a></p>
          <p>Council email <a href={council.emailHref}>{council.email}</a></p>
          <p className="meta">Social accounts are not linked until the council names the real ones.</p>
          <iframe className="map" title="Map of Our Lady of Lourdes" src={src} />
        </article>
        <ContactForm />
      </div>
    </>
  );
}
