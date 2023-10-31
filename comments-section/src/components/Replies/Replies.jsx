import PropTypes from "prop-types";
import Reply from "./Reply/Reply";
import "./replies.css";

const Replies = ({ replies, updateComments }) => {
  return (
    <div className="replies">
      <div className="line-container">
        <span className="replies-line"></span>
      </div>
      <div className="replies-container">
        {replies.map((reply) => (
          <Reply key={reply.id} reply={reply} updateComments={updateComments} />
        ))}
      </div>
    </div>
  );
};

Replies.propTypes = {
  replies: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateComments: PropTypes.func.isRequired,
};

export default Replies;
