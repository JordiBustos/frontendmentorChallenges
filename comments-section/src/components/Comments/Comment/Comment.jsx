import Counter from "../../Counter/Counter";
import User from "../../User/User";
import Replies from "../../Replies/Replies";
import PropTypes from "prop-types";
import "./comment.css";
import currentUser from "../../../../mock-data/curr-user";
import { useState } from "react";
import Input from "../Input/Input";

const Comment = ({ comment, setCommentsList, isReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReply = () => {
    setShowReplyInput(!showReplyInput);
  };

  return (
    <article className="comment-container">
      <div className="comment-box">
        <Counter upvotes={comment.upvotes} />
        <div className="comment-box--user">
          <div className="comment-box--user_date">
            <User
              user={comment.user}
              isCurrent={currentUser.username === comment.user.username}
            />
            <p>{comment.createdAt}</p>
          </div>
          <p className="comment-box--text">{comment.content}</p>
        </div>
        <button className="reply-button" onClick={handleReply}>
          <img src="/icon-reply.svg" alt="reply" className="reply-icon" />
          Reply
        </button>
      </div>
      {showReplyInput ? (
        <Input
          updateComments={setCommentsList}
          isReply={isReply}
          commentId={comment?.replyId ? comment.replyId : comment.id}
        />
      ) : null}
      {comment?.replies.length > 0 ? (
        <Replies replies={comment.replies} updateComments={setCommentsList} />
      ) : null}
    </article>
  );
};

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
    createdAt: PropTypes.string.isRequired,
    replyId: PropTypes.number,
    id: PropTypes.number.isRequired,
  }).isRequired,
  isReply: PropTypes.bool,
  setCommentsList: PropTypes.func,
};

export default Comment;
