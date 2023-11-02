import Counter from "../Counter/Counter";
import User from "../User/User";
import Replies from "../../containers/RepliesContainer/RepliesContainer";
import PropTypes from "prop-types";
import Input from "./Input/Input";
import Edit from "./Edit/Edit";
import UserOptionsFactory from "./UserOptions/UserOptionsFactory";

import "./comment.css";

import { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimension";

import currentUser from "../../../mock-data/curr-user";

const Comment = ({ comment, setCommentsList, isReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const isCurrentUser = currentUser.username === comment.user.username;

  const { width } = useWindowDimensions();

  const updateContent = (newContent) => {
    // update db or whatever
    setCommentContent(newContent);
  };

  const renderedReplies = comment?.replies && (
    <Replies replies={comment.replies} updateComments={setCommentsList} />
  );

  const renderedInput = showReplyInput && (
    <Input
      updateComments={setCommentsList}
      isReply={isReply}
      commentId={comment.replyId ? comment.replyId : comment.id}
      setShowReplyInput={setShowReplyInput}
    />
  );

  const renderedCommentBox = !isBeingEdited ? (
    <p className="comment-box--text">{commentContent}</p>
  ) : (
    <Edit
      currentText={commentContent}
      updateComment={updateContent}
      setIsBeingEdited={setIsBeingEdited}
    />
  );

  const userOptionsRendered = UserOptionsFactory(
    comment,
    currentUser.username,
    setIsModalOpen,
    isModalOpen,
    setIsBeingEdited,
    width,
    showReplyInput,
    setShowReplyInput,
    setCommentsList
  );

  return (
    <article className="comment-container">
      <div className="comment-box">
        <div className={width < 768 ? "mobile-counter-container" : null}>
          <Counter upvotes={comment.upvotes} />
          {width < 768 && userOptionsRendered}
        </div>
        <div className="comment-box--user">
          <div className="comment-box--user_date">
            <div className="user-date-container">
              <User
                user={comment.user}
                isCurrent={isCurrentUser}
                createdAt={comment.createdAt}
              />
              <p>{comment.createdAt}</p>
            </div>
            {width >= 768 && userOptionsRendered}
          </div>
          <div className="comment-edit-container">{renderedCommentBox}</div>
        </div>
      </div>
      {renderedInput}
      {renderedReplies}
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
