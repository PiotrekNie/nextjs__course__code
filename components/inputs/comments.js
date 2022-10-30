import { useState, useEffect, useContext } from "react";
import NotificationContext from "../../store/notification-context";

import NewComment from "./new-comment";
import CommentsList from "./comment-list";

import classes from "./comments.module.css";

function Comments(props) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [fetchingComments, setFetchingComments] = useState(false);
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setFetchingComments(true);

      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => setComments(data.comments))
        .then(() => setFetchingComments(false));
    }
  }, [showComments]);

  function toggleCommentHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotifications({
      title: "Sending comment...",
      message: "Adding new comment.",
      status: "pending",
    });

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        const data = await response.json();
        throw new Error(data.message);
      })
      .then((data) => {
        setComments(data.comment);
      })
      .then(() => {
        notificationCtx.showNotifications({
          title: "Success!",
          message: "New comment added.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotifications({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <div className={classes.comments}>
      <button onClick={toggleCommentHandler}>
        {!showComments ? "Show" : "Hide"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !fetchingComments && <CommentsList items={comments} />}
      {showComments && fetchingComments && <p>Loading...</p>}
    </div>
  );
}

export default Comments;
