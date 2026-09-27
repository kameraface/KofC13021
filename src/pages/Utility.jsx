import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchContent } from "../data/content";
import { PageHero } from "../components/Layout";
import { PollBoard } from "../components/Widgets";

export function Polls() {
  return (
    <>
      <PageHero
        kicker="Council"
        title="Polls"
        lede="Ask the room before the meeting. One vote per browser, with the count beside the choice after you vote."
      />
      <PollBoard />
    </>
  );
}

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") || "";
  const [query, setQuery] = useState(initial);
  const results = useMemo(() => searchContent(query), [query]);

  function onSubmit(event) {
    event.preventDefault();
    setParams(query ? { q: query } : {});
  }

  return (
    <>
      <PageHero kicker="Search" title="Search the site" lede="Pages, events, and news. It does not leave this council." />
      <form onSubmit={onSubmit} style={{ gridTemplateColumns: "1fr auto", alignItems: "end" }}>
        <label>Search
          <input value={query} onChange={(event) => setQuery(event.target.value)} name="q" />
        </label>
        <button className="btn" type="submit">Search</button>
      </form>
      <div className="section grid-2">
        {query && results.length === 0 ? <p>Nothing matched “{query}”.</p> : null}
        {results.map((result) => (
          <Link className="card search-hit" key={result.href + result.title} to={result.href}>
            <p className="kicker">{result.type}</p>
            <h3>{result.title}</h3>
            <p className="meta">{result.text}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <PageHero kicker="404" title="That page is not on the council site." lede="Try the search, or go back to the hall." />
      <div className="actions">
        <Link className="btn" to="/">Home</Link>
        <Link className="btn secondary" to="/search">Search</Link>
        <Link className="btn ghost" to="/events/calendar">Calendar</Link>
      </div>
    </>
  );
}
