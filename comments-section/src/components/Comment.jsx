import Counter from "./Counter";
import User from "./User";
import PropTypes from "prop-types";

const Comment = ({ comment }) => {
  Comment.propTypes = {
    comment: PropTypes.shape({
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        image: PropTypes.shape({
          png: PropTypes.string.isRequired,
          webp: PropTypes.string.isRequired,
        }),
      }).isRequired,
      content: PropTypes.string.isRequired,
      upvotes: PropTypes.number.isRequired,
      replies: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  };

  return (
    <div>
      <Counter upvotes={comment.upvotes} />
      <User user={comment.user} />
      <p>{comment.content}</p>
    </div>
  );
};

export default Comment;
