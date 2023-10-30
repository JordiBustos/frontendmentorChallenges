import Counter from "../Counter";
import User from "../../User/User";
import Replies from "../../Replies/Replies";

import PropTypes from "prop-types";
import "./comment.css";

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
    <article className="comment-container">
      <div className='comment-box'>
        <Counter upvotes={comment.upvotes} />
        <div className="comment-box--user">
          <User user={comment.user} />
          <p>{comment.content}</p>
        </div>
        <button className="reply-button">Reply</button>
      </div>
      {comment.replies.length > 0 ? (
        <Replies replies={comment.replies} />
      ) : null}
    </article>
  );
};

export default Comment;
