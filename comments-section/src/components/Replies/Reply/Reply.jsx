import PropTypes from "prop-types";
import Comment from "../../Comments/Comment/Comment";

import "./reply.css";

const Reply = ({ reply }) => {
  const modifiedReply = reply;
  !modifiedReply.replies ? (modifiedReply.replies = []) : null;

  return (
    <div className={"comment-box reply"}>
      <Comment comment={modifiedReply} />
    </div>
  );
};

Reply.propTypes = {
  reply: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.shape({
        png: PropTypes.string.isRequired,
        webp: PropTypes.string.isRequired,
      }),
    }).isRequired,
    content: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    replyingTo: PropTypes.string.isRequired,
  }).isRequired,
};

export default Reply;
