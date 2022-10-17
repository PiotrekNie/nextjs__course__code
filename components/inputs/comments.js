import { useState, useEffect } from "react";

import NewComment from "./new-comment";
import CommentsList from "./comment-list";

import classes from "./comments.module.css";

function Comments(props) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const { eventId } = props;

  useEffect(() => {
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => setComments(data.comments));
    }
  }, [showComments]);

  function toggleCommentHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setComments(data.comments));
  }

  return (
    <div className={classes.comments}>
      <button onClick={toggleCommentHandler}>
        {!showComments ? "Show" : "Hide"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentsList items={comments} />}
    </div>
  );
}

export default Comments;
