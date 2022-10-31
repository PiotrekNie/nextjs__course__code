import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";

const DUMMY_POSTS = [
  {
    title: "Getting started",
    image: "getting-started-nextjs.png",
    excerpt:
      "Learn NextJS from the ground up and build production-ready, fullstack ReactJS apps with the NextJS framework!",
    date: "2022-11-01",
    slug: "getting-started-with-nextjs",
  },
  {
    title: "Getting started",
    image: "getting-started-nextjs.png",
    excerpt:
      "Learn NextJS from the ground up and build production-ready, fullstack ReactJS apps with the NextJS framework!",
    date: "2022-11-01",
    slug: "getting-started-with-nextjs2",
  },
  {
    title: "Getting started",
    image: "getting-started-nextjs.png",
    excerpt:
      "Learn NextJS from the ground up and build production-ready, fullstack ReactJS apps with the NextJS framework!",
    date: "2022-11-01",
    slug: "getting-started-with-nextjs3",
  },
  {
    title: "Getting started",
    image: "getting-started-nextjs.png",
    excerpt:
      "Learn NextJS from the ground up and build production-ready, fullstack ReactJS apps with the NextJS framework!",
    date: "2022-11-01",
    slug: "getting-started-with-nextjs4",
  },
];

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
}

export default HomePage;
