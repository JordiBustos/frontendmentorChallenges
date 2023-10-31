import currentUser from "../../../../mock-data/curr-user";
import "./input.css";
import PropTypes from "prop-types";

const Input = ({
  updateComments,
  isReply,
  commentId,
}) => {
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

    newComment.replyId = commentId;

    prevComments = prevComments.map((comment) => {
      if (comment.id === commentId) {
        comment.replies = [...comment.replies, newComment];
      }
      return comment;
    });

    return [...prevComments];
  };

  return (
    <section className="input-container">
      <div>
        <img src={currentUser.image.webp} alt={currentUser.username} />
      </div>
      <form>
        <input
          className="input-comment"
          type="text"
          placeholder="Add a comment..."
        />
        <button onClick={handleSubmit}>SEND</button>
      </form>
    </section>
  );
};

Input.propTypes = {
  updateComments: PropTypes.func.isRequired,
  isReply: PropTypes.bool,
  commentId: PropTypes.number,
};

export default Input;
