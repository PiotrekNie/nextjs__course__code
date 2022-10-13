import { useRef, useState } from "react";
import { useRouter } from "next/router";

import classes from "./new-comment.module.css";

function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  function sendCommentHandler(ev) {
    ev.preventDefault();

    const email = emailInputRef.current.value;
    const name = nameInputRef.current.value;
    const comment = commentInputRef.current.value;
    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    const reqBody = {
      date: new Date().toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      email: email,
      name: name,
      comment: comment,
    };

    props.onAddComment(reqBody);
  }

  return (
    <form method="post" className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} required></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} required></input>
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea
          name="comment"
          id="comment"
          rows="5"
          ref={commentInputRef}
          required
        ></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
