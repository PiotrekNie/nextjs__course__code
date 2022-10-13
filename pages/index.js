import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/events-list";
import NewsletterRegistration from "../components/inputs/newsletter-registration";

function HomePage(props) {
  const { events } = props;

  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events!" />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEevents = await getFeaturedEvents();

  if (!featuredEevents) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (featuredEevents.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      events: featuredEevents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
