import PropTypes from "prop-types";
import Reply from "../../components/Reply/Reply";
import "./replies.css";

const RepliesContainer = ({ replies, updateComments }) => {
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

RepliesContainer.propTypes = {
  replies: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateComments: PropTypes.func.isRequired,
};

export default RepliesContainer;
