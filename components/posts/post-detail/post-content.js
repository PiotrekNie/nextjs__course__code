import ReactMarkdown from "react-markdown";
import PostHeader from "./post-header";

import classes from "./post-content.module.css";

const DUMMY_POST = {
  title: "Getting started",
  image: "getting-started-nextjs.png",
  content:
    "# Learn NextJS from the ground up and build production-ready, fullstack ReactJS apps with the NextJS framework!",
  date: "2022-11-01",
  slug: "getting-started-with-nextjs",
};

function PostContent() {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
