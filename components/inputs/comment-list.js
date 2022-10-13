import classes from "./comment-list.module.css";

function CommentsList(props) {
  const { items } = props;

  return (
    <div className={classes.comments}>
      {items.map((comment) => (
        <li key={comment.id}>
          <p className={classes.name}>
            {comment.name}, {comment.date}
          </p>
          <p>{comment.comment}</p>
        </li>
      ))}
    </div>
  );
}

export default CommentsList;
