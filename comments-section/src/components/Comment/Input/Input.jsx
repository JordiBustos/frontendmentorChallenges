import currentUser from "../../../../mock-data/curr-user";
import PropTypes from "prop-types";
import "./input.css";
import Button from "../../Button/Button";

const Input = ({ updateComments, isReply, commentId, setShowReplyInput }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.previousElementSibling.value;
    if (content) {
      updateComments((prev) => createComment(prev, content, commentId));
      e.target.previousElementSibling.value = "";
    }
  };

  const createComment = (prevComments, newContent, commentId) => {
    const newComment = {
      id: prevComments.length + 1,
      content: newContent,
      user: currentUser,
      upvotes: 0,
      createdAt: "today",
    };

    if (!isReply) {
      newComment.replies = [];
      return [...prevComments, newComment];
    }

    setShowReplyInput(false);
    newComment.replyId = commentId;

    prevComments = prevComments.map((comment) => {
      if (comment.id === commentId) {
        comment.replies = [...comment.replies, newComment];
      }
      return comment;
    });

    return [...prevComments];
  };

  const containerClasses = [
    "input-container",
    commentId === null ? "comment-input" : "reply-input",
  ].join(" ");

  return (
    <section className={containerClasses}>
      <div>
        <img src={currentUser.image.webp} alt={currentUser.username} />
      </div>
      <form>
        <input
          className="input-comment"
          type="text"
          placeholder="Add a comment..."
        />
        <Button className="input-button" onClick={handleSubmit}>
          {commentId !== null ? "Reply" : "Send"}
        </Button>
      </form>
    </section>
  );
};

Input.propTypes = {
  updateComments: PropTypes.func.isRequired,
  isReply: PropTypes.bool,
  commentId: PropTypes.number,
  setShowReplyInput: PropTypes.func,
};

export default Input;
