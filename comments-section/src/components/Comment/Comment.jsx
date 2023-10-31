import Counter from "../Counter/Counter";
import User from "../User/User";
import Replies from "../../containers/RepliesContainer/RepliesContainer";
import PropTypes from "prop-types";
import "./comment.css";
import currentUser from "../../../mock-data/curr-user";
import { useState } from "react";
import Input from "./Input/Input";
import Modal from "../Modal/Modal";
import Edit from "./Edit/Edit";
import Button from "../Button/Button";
import ModalContent from "./ModalContent";

const Comment = ({ comment, setCommentsList, isReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleReply = () => {
    setShowReplyInput(!showReplyInput);
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

  return (
    <article className="comment-container">
      <div className="comment-box">
        <Counter upvotes={comment.upvotes} />
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
            {comment.user.username === currentUser.username ? (
              <div className="comment-buttons-container">
                <Button onClick={openModal} className="delete-button">
                  <img
                    src="/icon-delete.svg"
                    alt="delete"
                    className="delete-icon"
                  />
                  Delete
                </Button>
                <Button
                  className="edit-button"
                  onClick={() => setIsBeingEdited(true)}
                >
                  <img src="/icon-edit.svg" alt="edit" className="edit-icon" />
                  Edit
                </Button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                  <ModalContent
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                    title={"Delete Comment"}
                    paragraph={"Are you sure?"}
                    confirm={"YES, DELETE"}
                    cancel={"NO, CANCEL"}
                  />
                </Modal>
              </div>
            ) : (
              <Button className="reply-button" onClick={handleReply}>
                <img src="/icon-reply.svg" alt="reply" className="reply-icon" />
                Reply
              </Button>
            )}
          </div>
          <div className="comment-edit-container">
            {!isBeingEdited ? (
              <p className="comment-box--text">{commentContent}</p>
            ) : (
              <Edit
                currentText={commentContent}
                updateComment={updateContent}
                setIsBeingEdited={setIsBeingEdited}
              />
            )}
          </div>
        </div>
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
