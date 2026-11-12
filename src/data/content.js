/** Public facts and sample listings for Council 13021.
 *  Replace sample events, news, and empty officer seats as the council publishes them.
 */

export const council = {
  number: "13021",
  name: "Father Damen McCaddon Council",
  parish: "Our Lady of Lourdes",
  parishUrl: "https://lourdesdenver.org/",
  address: "2200 S. Logan St.",
  city: "Denver, CO 80210",
  neighborhood: "Rosedale",
  phone: "303.722.6861",
  phoneHref: "tel:+13037226861",
  email: "kofc13021@gmail.com",
  emailHref: "mailto:kofc13021@gmail.com",
  map: {
    lat: 39.6752232,
    lon: -104.9822271,
  },
  joinUrl: "https://www.kofc.org/join",
  supremeUrl: "https://www.kofc.org/",
  stateUrl: "https://www.coloradokofc.org/",
  denverCatholic: "https://denvercatholic.org/",
  usccb: "https://www.usccb.org/news",
  vatican: "https://www.vaticannews.va/en.html",
  insuranceUrl: "https://www.kofc.org/en/what-we-do/insurance.html",
};

export const principles = [
  {
    name: "Charity",
    text: "The first principle. Knights put time and money where the parish and the city actually need them.",
  },
  {
    name: "Unity",
    text: "None of the work holds if it is one man’s project. We show up together.",
  },
  {
    name: "Fraternity",
    text: "A council is a band of brothers: we look after one another’s families, not only the calendar.",
  },
  {
    name: "Patriotism",
    text: "The patriotic degree asks Catholic men to serve the community they live in, in public.",
  },
];

export const officers = [
  {
    role: "Grand Knight",
    name: "J.D. Munn",
    term: "July 2026 – July 2028",
    email: council.email,
    note: "Elected Grand Knight for the 2026–2028 term. Leads meetings, fundraisers, and the council’s books.",
  },
  {
    role: "Membership",
    name: "Evan Frazier",
    term: "",
    email: council.email,
    note: "Our Lady of Lourdes lists Evan as the person to ask about joining.",
  },
  { role: "Chaplain", name: "", term: "", email: "", note: "The pastor of Our Lady of Lourdes serves by invitation of the council." },
  { role: "Deputy Grand Knight", name: "", term: "", email: "", note: "" },
  { role: "Chancellor", name: "", term: "", email: "", note: "" },
  { role: "Recorder", name: "", term: "", email: "", note: "" },
  { role: "Financial Secretary", name: "", term: "", email: "", note: "" },
  { role: "Treasurer", name: "", term: "", email: "", note: "" },
  { role: "Advocate", name: "", term: "", email: "", note: "" },
  { role: "Warden", name: "", term: "", email: "", note: "" },
  { role: "Lecturer", name: "", term: "", email: "", note: "" },
  { role: "Inside Guard", name: "", term: "", email: "", note: "" },
  { role: "Outside Guard", name: "", term: "", email: "", note: "" },
];

/** Sample rows for the members-only roster layout. Not the council roll. */
export const sampleRoster = [
  { name: "Sample Brother A.", joined: "2014", degree: "4th" },
  { name: "Sample Brother B.", joined: "2018", degree: "3rd" },
  { name: "Sample Brother C.", joined: "2022", degree: "3rd" },
  { name: "Sample Brother D.", joined: "2025", degree: "1st" },
];

function isoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(days) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return isoDate(date);
}

function nextWeekday(weekday) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  const delta = (weekday - date.getDay() + 7) % 7 || 7;
  date.setDate(date.getDate() + delta);
  return isoDate(date);
}

function nextMonthOnDay(monthIndex, day) {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  let year = today.getFullYear();
  const candidate = new Date(year, monthIndex, day, 12);
  if (candidate < today) year += 1;
  return isoDate(new Date(year, monthIndex, day, 12));
}

export const events = [
  {
    slug: "sunday-hospitality",
    title: "Sunday hospitality",
    date: nextWeekday(0),
    time: "After the morning Masses",
    place: "Our Lady of Lourdes",
    category: "Parish",
    sample: true,
    signup: true,
    summary: "Coffee and a welcome after Mass. The parish asks the Knights to host this.",
    details:
      "Come early enough to set the urn and stay long enough to talk. Families, visitors, and brothers are all welcome at the table. This listing repeats the kind of Sunday the council already serves; confirm the Mass you are covering with the Grand Knight.",
  },
  {
    slug: "food-clothing-drive",
    title: "Food and clothing drive",
    date: addDays(12),
    time: "9:00 a.m. – 1:00 p.m.",
    place: "Parish hall, 2200 S. Logan St.",
    category: "Charity",
    sample: true,
    signup: true,
    summary: "Sort donations and pack them for neighbors in Denver.",
    details:
      "The council runs food and clothing drives for people who are homeless and for families the parish points us toward. Bring a coat, a canned good, or an hour of sorting. Sample date until the Grand Knight posts the next drive.",
  },
  {
    slug: "charity-cookout",
    title: "Charity cookout",
    date: addDays(21),
    time: "5:30 p.m.",
    place: "Parish grounds",
    category: "Fundraiser",
    sample: true,
    signup: true,
    summary: "A council cookout that raises money for local charities.",
    details:
      "Grill, serve, and stay for the meal. Proceeds from council cookouts go to the charities the officers name for that month. Bring a side if you can. Sample date.",
  },
  {
    slug: "business-meeting",
    title: "Council business meeting",
    date: addDays(9),
    time: "7:00 p.m.",
    place: "Our Lady of Lourdes",
    category: "Council",
    sample: true,
    signup: false,
    summary: "Monthly meeting of the council. Rosary beforehand when the chaplain is available.",
    details:
      "The standing weeknight is set by the Grand Knight and is not published on the parish site yet. This entry is a placeholder so the calendar has a meeting to point at. Replace the date when the council confirms it.",
  },
  {
    slug: "exemplification",
    title: "Exemplification of Charity, Unity, and Fraternity",
    date: addDays(35),
    time: "To be announced",
    place: "Denver metro",
    category: "Membership",
    sample: true,
    signup: true,
    summary: "The degree that brings a new Knight fully into the Order.",
    details:
      "Candidates and their families are welcome. Watch the Colorado State Council calendar for the hosted council, then tell Evan Frazier you want to attend. This date is a planning marker, not a published degree.",
  },
  {
    slug: "golf-tournament",
    title: "Annual golf tournament",
    date: nextMonthOnDay(6, 18),
    time: "Morning shotgun",
    place: "Denver area course",
    category: "Fundraiser",
    sample: true,
    signup: true,
    summary: "The evergreen fundraiser. The course and the year change; the page does not.",
    details:
      "Foursomes, hole sponsors, and a dinner after the round. The July date is a save-the-date for planning. Officers should replace the course, the fee, and the beneficiary when they are set.",
  },
];

export const news = [
  {
    slug: "grand-knight-term",
    title: "J.D. Munn begins the 2026–2028 term",
    date: "2026-07-01",
    sample: false,
    summary: "The council’s Grand Knight for this term is J.D. Munn.",
    body: "J.D. Munn was elected Grand Knight for July 2026 through July 2028. He is responsible for the council’s meetings, finances, and the fundraisers that support charities around Denver. Questions about a project go to him through kofc13021@gmail.com.",
  },
  {
    slug: "hospitality-and-drives",
    title: "What the council is already doing",
    date: addDays(-6),
    sample: true,
    summary: "Hospitality after Mass, food and clothing drives, and cookouts.",
    body: "Our Lady of Lourdes describes the Knights as the men who help at parish events and host hospitality after Sunday Mass. The Grand Knight has also described food and clothing drives for people who are homeless, and cookouts that raise money for local charities. This note is a standing description, not a report from a single weekend.",
  },
  {
    slug: "website-welcome",
    title: "A council site the officers can keep current",
    date: addDays(-1),
    sample: true,
    summary: "Events, sign-ups, and polls live on the site so they do not go stale in a PDF.",
    body: "This site is the working home for Council 13021. Dates in the calendar, the sign-up list, and the polls are meant to be edited in the open. Until a shared database is connected, sign-ups and votes stay in the browser that submitted them — useful for trying the pages, and a clear next step before launch.",
  },
];

export const headlines = [
  { title: "Denver Catholic", href: council.denverCatholic, source: "Archdiocese of Denver" },
  { title: "U.S. bishops’ newsroom", href: council.usccb, source: "USCCB" },
  { title: "Vatican News", href: council.vatican, source: "Vatican News" },
];

export const polls = [
  {
    id: "breakfast",
    question: "What should we serve at the next Sunday hospitality?",
    options: ["Coffee and donuts", "Breakfast burritos", "Fruit and pastry", "Just coffee"],
  },
  {
    id: "drive",
    question: "Which drive should we schedule first?",
    options: ["Winter coats", "Canned food", "School supplies", "Toiletries"],
  },
  {
    id: "meeting",
    question: "Which weeknight works for the business meeting?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  },
];

export const programs = [
  {
    name: "Sunday hospitality",
    text: "The parish asks the Knights to host after Mass. It is the simplest way a visitor meets the council.",
  },
  {
    name: "Food and clothing",
    text: "Drives for people who are homeless and for families the parish names. Sorting is as needed as the donation.",
  },
  {
    name: "Cookouts",
    text: "Monthly meals that raise money and give the council a reason to stand in the same line.",
  },
  {
    name: "Faith in Action",
    text: "The Order’s program model — faith, family, community, and life — is how a council picks the year’s work. Officers choose which Supreme programs to run.",
  },
];

export const partners = [
  { name: "Our Lady of Lourdes Parish", href: council.parishUrl, text: "The council’s home. Mass times, sacraments, and parish staff live on the parish site." },
  { name: "Colorado State Council", href: council.stateUrl, text: "State programs, degrees, and the council directory." },
  { name: "Knights of Columbus", href: council.supremeUrl, text: "The Supreme Council: history, insurance, and joining online." },
];

export const volunteerRoles = [
  "Set up Sunday hospitality",
  "Sort the food and clothing drive",
  "Grill at the cookout",
  "Welcome a new candidate",
  "Help with the golf tournament",
];

export const slides = [
  { id: "hospitality", kicker: "Parish", title: "After Mass", caption: "Coffee, a handshake, and the jobs nobody puts on a poster." },
  { id: "coats", kicker: "Charity", title: "Coats and cans", caption: "Drives for neighbors in Denver, sorted by the men who collected them." },
  { id: "rosary", kicker: "Faith", title: "A shared prayer", caption: "The rosary still fits in a pocket. We pray it when the chaplain asks." },
  { id: "cookout", kicker: "Fraternity", title: "The cookout", caption: "Fundraising that looks like a meal, because it is one." },
  { id: "golf", kicker: "Every year", title: "The tournament", caption: "One golf page, updated when the course is chosen." },
  { id: "family", kicker: "Family", title: "Bring them", caption: "Degrees, breakfasts, and the hall are for households, not a closed room." },
];

export function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShort(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function upcomingEvents(limit = 3) {
  const today = isoDate(new Date());
  return [...events].filter((event) => event.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, limit);
}

export function eventBySlug(slug) {
  return events.find((event) => event.slug === slug);
}

export function newsBySlug(slug) {
  return news.find((item) => item.slug === slug);
}

export const pages = [
  { title: "Home", href: "/", section: "Home", text: "Welcome mission events photo reel join donate contact" },
  { title: "Our council", href: "/about", section: "About", text: "history mission Our Lady of Lourdes Father Damen McCaddon" },
  { title: "Officers and leadership", href: "/about/officers", section: "About", text: "Grand Knight J.D. Munn Evan Frazier officers" },
  { title: "Charter members", href: "/about/charter", section: "About", text: "charter roll founding members" },
  { title: "History of the Knights", href: "/about/history", section: "About", text: "1882 New Haven McGivney history of the order" },
  { title: "Father Michael McGivney", href: "/about/founder", section: "About", text: "founder beatified parish priest" },
  { title: "Emblem of the Order", href: "/about/emblem", section: "About", text: "shield cross anchor fasces principles charity unity fraternity patriotism" },
  { title: "The Knights and John Paul II", href: "/about/john-paul-ii", section: "About", text: "pope saint john paul ii" },
  { title: "Why join", href: "/membership", section: "Membership", text: "catholic men 18 join benefits" },
  { title: "How to join", href: "/membership/join", section: "Membership", text: "e-membership Evan Frazier steps" },
  { title: "Degree dates", href: "/membership/degrees", section: "Membership", text: "exemplification fourth degree patriotic" },
  { title: "Member roster", href: "/membership/roster", section: "Membership", text: "roster brothers members login" },
  { title: "Member resources", href: "/membership/resources", section: "Membership", text: "minutes forms login protected" },
  { title: "Faith and family", href: "/faith", section: "Faith", text: "adoration fatherhood prayer intentions rosary" },
  { title: "Charity and community", href: "/charity", section: "Charity", text: "united in charity impact hospitality drives" },
  { title: "Volunteer", href: "/charity/volunteer", section: "Charity", text: "volunteer opportunities shifts" },
  { title: "Programs we support", href: "/charity/programs", section: "Charity", text: "faith in action coats food" },
  { title: "Community partners", href: "/charity/partners", section: "Charity", text: "lourdes state council supreme" },
  { title: "Events", href: "/events", section: "Events", text: "upcoming council events" },
  { title: "Calendar", href: "/events/calendar", section: "Events", text: "council calendar upcoming events google calendar denver time" },
  { title: "Event sign-up", href: "/events/signup", section: "Events", text: "sign up register volunteer" },
  { title: "Golf tournament", href: "/events/golf", section: "Events", text: "annual golf evergreen sponsors" },
  { title: "Photo gallery", href: "/events/gallery", section: "Events", text: "past events photographs reel" },
  { title: "News", href: "/news", section: "News", text: "announcements catholic headlines" },
  { title: "Donate and support", href: "/donate", section: "Support", text: "donation sponsorship dues" },
  { title: "Contact", href: "/contact", section: "Contact", text: "map meeting email phone Logan" },
  { title: "Polls", href: "/polls", section: "Council", text: "interactive polling vote" },
  { title: "Search", href: "/search", section: "Utility", text: "search the site" },
  { title: "Member sign in", href: "/login", section: "Utility", text: "login members" },
];

export function searchContent(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const results = [];
  for (const page of pages) {
    const hay = `${page.title} ${page.section} ${page.text}`.toLowerCase();
    if (hay.includes(needle)) results.push({ type: "Page", title: page.title, href: page.href, text: page.section });
  }
  for (const event of events) {
    const hay = `${event.title} ${event.summary} ${event.category}`.toLowerCase();
    if (hay.includes(needle)) {
      results.push({ type: "Event", title: event.title, href: `/events/${event.slug}`, text: formatShort(event.date) });
    }
  }
  for (const item of news) {
    const hay = `${item.title} ${item.summary}`.toLowerCase();
    if (hay.includes(needle)) results.push({ type: "News", title: item.title, href: `/news/${item.slug}`, text: formatShort(item.date) });
  }
  return results;
}
