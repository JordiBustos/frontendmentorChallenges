import Counter from "../Counter/Counter";
import User from "../User/User";
import Replies from "../../containers/RepliesContainer/RepliesContainer";
import PropTypes from "prop-types";
import Input from "./Input/Input";
import Edit from "./Edit/Edit";
import Button from "../Button/Button";
import CurrentUserOptions from "./CurrentUserOptions";

import "./comment.css";

import { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimension";

import currentUser from "../../../mock-data/curr-user";

const Comment = ({ comment, setCommentsList, isReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const { width } = useWindowDimensions();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleReply = () => {
    setShowReplyInput(!showReplyInput);
  };

  const createUserOptions = (username, currentUsername) => {
    return username === currentUsername ? (
      <CurrentUserOptions
        openModal={openModal}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        handleDelete={handleDelete}
        setIsBeingEdited={setIsBeingEdited}
        width={width}
      />
    ) : (
      <Button className="reply-button" onClick={handleReply}>
        <img src="/icon-reply.svg" alt="reply" className="reply-icon" />
        Reply
      </Button>
    );
  };

  const handleDelete = () => {
    setCommentsList((prev) => {
      if (comment.replyId) {
        return prev.map((com) => {
          if (com.id === comment.replyId) {
            return {
              ...com,
              replies: com.replies.filter((rep) => rep.id !== comment.id),
            };
          }
          return com;
        });
      }
      return prev.filter((com) => com.id !== comment.id);
    });
  };

  const updateContent = (newContent) => {
    // update db or whatever
    setCommentContent(newContent);
  };

  const renderedReplies = comment?.replies ? (
    <Replies replies={comment.replies} updateComments={setCommentsList} />
  ) : null;

  const renderedInput = showReplyInput ? (
    <Input
      updateComments={setCommentsList}
      isReply={isReply}
      commentId={comment?.replyId ? comment.replyId : comment.id}
      setShowReplyInput={setShowReplyInput}
    />
  ) : null;

  const renderedCommentBox = !isBeingEdited ? (
    <p className="comment-box--text">{commentContent}</p>
  ) : (
    <Edit
      currentText={commentContent}
      updateComment={updateContent}
      setIsBeingEdited={setIsBeingEdited}
    />
  )

  return (
    <article className="comment-container">
      <div className="comment-box">
        <div className={width < 768 ? "mobile-counter-container" : null}>
          <Counter upvotes={comment.upvotes} />
          {width < 768
            ? createUserOptions(comment.user.username, currentUser.username)
            : null}
        </div>
        <div className="comment-box--user">
          <div className="comment-box--user_date">
            <div className="user-date-container">
              <User
                user={comment.user}
                isCurrent={currentUser.username === comment.user.username}
                createdAt={comment.createdAt}
              />
              <p>{comment.createdAt}</p>
            </div>
            {width > 768
              ? createUserOptions(comment.user.username, currentUser.username)
              : null}
          </div>
          <div className="comment-edit-container">
            { renderedCommentBox }
          </div>
        </div>
      </div>
      { renderedInput }
      { renderedReplies }
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
