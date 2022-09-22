import { useRouter } from "next/router";

import { getAllEvents } from "../../data/dummy-data";
import EventList from "../../components/events/events-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export default AllEventsPage;
