import { useState } from "react";
import { PageHero, SampleNote } from "../components/Layout";
import { addRecord } from "../lib/storage";

export default function Donate() {
  const [done, setDone] = useState(false);
  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!name || !email.includes("@")) return;
    addRecord("pledges", {
      name,
      email,
      kind: String(data.get("kind") || ""),
      note: String(data.get("note") || "").trim(),
    });
    setDone(true);
    event.currentTarget.reset();
  }
  return (
    <>
      <PageHero
        kicker="Donate and support"
        title="Make a gift the council can use"
        lede="Online card payments are a later step. This page records an offer and tells the truth about taxes."
      />
      <SampleNote>
        Council 13021 is a Knights of Columbus council, a fraternal society. Gifts made straight to the council are generally not tax-deductible.
        If you need a deductible receipt, ask which parish or charity fund the drive supports before you give.
      </SampleNote>
      <div className="grid-2" style={{ marginTop: "1rem" }}>
        <form onSubmit={onSubmit}>
          <label>Name<input name="name" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>How you want to help
            <select name="kind">
              <option>Supplies for a drive</option>
              <option>Golf hole sponsor</option>
              <option>Foursome</option>
              <option>Cookout costs</option>
              <option>Dues question</option>
            </select>
          </label>
          <label>Note<textarea name="note" /></label>
          {done ? <p className="success">Offer saved on this browser. A person still has to answer you by email.</p> : null}
          <button className="btn" type="submit">Record an offer</button>
        </form>
        <article className="panel">
          <h2>Dues</h2>
          <p>
            Annual dues are collected by the Financial Secretary, not by this form.
            When the council chooses an online dues tool, the button belongs here and only here.
          </p>
          <h2>Sponsorship</h2>
          <p>The golf page lists foursomes, hole signs, and dinner. Name the beneficiary in the same sentence as the price.</p>
        </article>
      </div>
    </>
  );
}
