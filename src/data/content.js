export const council = {
  title: "Knights of Columbus Council 13021",
  subtitle: "Father Damen McCaddon Council  ·  Our Lady of Lourdes Parish",
  parish: "Our Lady of Lourdes Catholic Parish",
  address: "2200 S. Logan St., Denver, CO 80210",
  phone: "303.722.6861",
  phoneHref: "tel:+13037226861",
  email: "kofc13021@gmail.com",
  emailHref: "mailto:kofc13021@gmail.com",
  grandKnight: { role: "Grand Knight", name: "J.D. Munn", term: "July 2026–July 2028" },
  membership: { role: "Membership contact", name: "Evan Frazier", email: "kofc13021@gmail.com" },
  // Intentionally blank until council publishes them (Pen placeholders):
  boardPdfUrl: "",
  interestFormUrl: "",
  charityYtd: "",
  officersNote: "Other officer seats and the charter roll are left blank until the council publishes them.",
};
export const intro = "The Knights of Columbus is a fraternal group of men engaged in prayer, charitable works and fellowship. They help out at parish events and often host hospitality after Mass on Sundays.";
export const projects = [
  "Sunday hospitality after Mass (confirmed on parish site)",
  "Help at Lourdes parish events (confirmed on parish site)",
  "[Project / charity — add a current council initiative]",
  "[Project / charity — add a current council initiative]",
];
export const video = { embed: "https://www.youtube.com/embed/ss0i4xuSffQ?si=zKocZ1aQfmE2CTrv", watch: "https://www.youtube.com/watch?v=ss0i4xuSffQ" };
function addDays(n){const d=new Date();d.setDate(d.getDate()+n);return d.toISOString();}
export const sampleEvents = [
  { id:"s1", title:"[Sample] Sunday hospitality", start:addDays(3), location:"Our Lady of Lourdes", sample:true },
  { id:"s2", title:"[Sample] Council meeting — Grand Knight J.D. Munn", start:addDays(7), location:"Our Lady of Lourdes", sample:true },
  { id:"s3", title:"[Sample] Food & clothing drive", start:addDays(12), location:"Parish hall, 2200 S. Logan St.", sample:true },
  { id:"s4", title:"[Sample] Council cookout", start:addDays(19), location:"Parish grounds", sample:true },
  { id:"s5", title:"[Sample] Parish festival support", start:addDays(26), location:"Our Lady of Lourdes", sample:true },
];
