import Comment from "./Comment/Comment";
import PropTypes from "prop-types";

const Comments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Comments;
