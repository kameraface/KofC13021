import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { About, Charter, Emblem, Founder, History, JohnPaul, Officers } from "./pages/About";
import { Degrees, Join, Login, Resources, Roster, WhyJoin } from "./pages/Membership";
import Faith from "./pages/Faith";
import { Charity, Partners, Programs, Volunteer } from "./pages/Charity";
import { CalendarPage, EventDetail, EventsHome, Gallery, Golf, SignupPage } from "./pages/Events";
import { NewsArticle, NewsHome } from "./pages/News";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import { NotFound, Polls, SearchPage } from "./pages/Utility";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/officers" element={<Officers />} />
        <Route path="/about/charter" element={<Charter />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/founder" element={<Founder />} />
        <Route path="/about/emblem" element={<Emblem />} />
        <Route path="/about/john-paul-ii" element={<JohnPaul />} />
        <Route path="/membership" element={<WhyJoin />} />
        <Route path="/membership/join" element={<Join />} />
        <Route path="/membership/degrees" element={<Degrees />} />
        <Route path="/membership/roster" element={<Roster />} />
        <Route path="/membership/resources" element={<Resources />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faith" element={<Faith />} />
        <Route path="/charity" element={<Charity />} />
        <Route path="/charity/volunteer" element={<Volunteer />} />
        <Route path="/charity/programs" element={<Programs />} />
        <Route path="/charity/partners" element={<Partners />} />
        <Route path="/events" element={<EventsHome />} />
        <Route path="/events/calendar" element={<CalendarPage />} />
        <Route path="/events/signup" element={<SignupPage />} />
        <Route path="/events/golf" element={<Golf />} />
        <Route path="/events/gallery" element={<Gallery />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/news" element={<NewsHome />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
