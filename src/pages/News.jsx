import { Link, useParams } from "react-router-dom";
import { formatDate, headlines, news, newsBySlug } from "../data/content";
import { PageHero } from "../components/Layout";

export function NewsHome() {
  return (
    <>
      <PageHero kicker="News" title="Council news" lede="Announcements from the council, then the Catholic papers we actually read." />
      <div className="grid-2">
        {news.map((item) => (
          <article className="article" key={item.slug}>
            {item.sample ? <span className="chip warn">Note</span> : <span className="chip">Council</span>}
            <h3><Link to={`/news/${item.slug}`}>{item.title}</Link></h3>
            <p className="meta">{formatDate(item.date)}</p>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
      <section className="section">
        <h2>Catholic headlines</h2>
        <p>We link out. We do not copy their stories onto this site.</p>
        <div className="grid-3">
          {headlines.map((item) => (
            <article className="card" key={item.href}>
              <p className="kicker">{item.source}</p>
              <h3><a href={item.href}>{item.title}</a></h3>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function NewsArticle() {
  const { slug } = useParams();
  const item = newsBySlug(slug);
  if (!item) return <PageHero title="That note is gone" lede="The news list has what is still posted." />;
  return (
    <>
      <PageHero kicker="News" title={item.title} lede={item.summary} />
      <p className="meta">{formatDate(item.date)}</p>
      <article className="panel"><p>{item.body}</p></article>
      <p><Link to="/news">All news</Link></p>
    </>
  );
}
