import PropTypes from "prop-types";
import Reply from "../../components/Reply/Reply";
import "./replies.css";

const RepliesContainer = ({ replies, updateComments }) => {
  const renderedReplies = replies.map((reply) => {
    return <Reply key={reply.id} reply={reply} updateComments={updateComments} />;
  });
  
  return (
    <div className="replies">
      <div className="line-container">
        <span className="replies-line"></span>
      </div>
      <div className="replies-container">
        { renderedReplies }
      </div>
    </div>
  );
};

RepliesContainer.propTypes = {
  replies: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateComments: PropTypes.func.isRequired,
};

export default RepliesContainer;
