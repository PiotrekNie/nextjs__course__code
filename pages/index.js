import { getFeaturedEvents } from "../data/dummy-data";
import EventList from "../components/events/events-list";

function HomePage() {
  const featuredEevents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEevents} />
    </div>
  );
}

export default HomePage;
