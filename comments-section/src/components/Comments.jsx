import Comment from "./Comment";
import PropTypes from "prop-types";

const Comments = ({ comments }) => {
  Comments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default Comments;
