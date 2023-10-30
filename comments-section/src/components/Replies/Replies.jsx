import PropTypes from "prop-types";
import Reply from "./Reply/Reply";
import "./replies.css";



const Replies = ({ replies }) => {
  Replies.propTypes = {
    replies: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  return (
    <div className="replies">
      <div className="line-container">
        <span className="replies-line"></span>
      </div>
      <div className="replies-container">
        {replies.map((reply) => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
};

export default Replies;