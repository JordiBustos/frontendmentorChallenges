import CurrentUserOptions from "./CurrentUserOptions";
import Button from "../../Button/Button";

function UserOptionsFactory(
  comment,
  currentUsername,
  setIsModalOpen,
  isModalOpen,
  setIsBeingEdited,
  width,
  showReplyInput,
  setShowReplyInput,
  setCommentsList,
) {
  if (comment.user.username === currentUsername) {
    return (
      <CurrentUserOptions
        openModal={() => setIsModalOpen(true)}
        closeModal={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
        handleDelete={() => handleDelete(setCommentsList, comment)}
        setIsBeingEdited={setIsBeingEdited}
        width={width}
      />
    );
  }
  return (
    <Button
      className="reply-button"
      onClick={() => setShowReplyInput(!showReplyInput)}
    >
      <img src="/icon-reply.svg" alt="reply" className="reply-icon" />
      Reply
    </Button>
  );
}

function handleDelete (setCommentsList, comment) {
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
}

export default UserOptionsFactory;