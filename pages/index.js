// import path from "path";
// import fs from "fs/promises";

// import Link from "next/link";
import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/events-list";

function HomePage(props) {
  const { events } = props;

  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events!" />
      </Head>
      <EventList items={events} />
      {/* <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul> */}
    </>
  );
}

export async function getStaticProps() {
  // const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  // const jsonData = await fs.readFile(filePath);
  // const data = JSON.parse(jsonData);
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
