import PropTypes from "prop-types";
import { useState } from "react";

const Edit = ({ currentText, updateComment, setIsBeingEdited }) => {
  const [tmpText, setTmpText] = useState(currentText);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tmpText) {
      updateComment(tmpText);
      setIsBeingEdited(false);
    }
  };

  return (
    <section className="input-container">
      <form>
        <input
          className="input-comment"
          type="text"
          placeholder="Add a comment..."
          value={tmpText}
          onChange={(event) => setTmpText(event.target.value)}
        />
        <button onClick={handleSubmit}>UPDATE</button>
      </form>
    </section>
  );
};

Edit.propTypes = {
  currentText: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  updateComment: PropTypes.func.isRequired,
  setIsBeingEdited: PropTypes.func.isRequired,
};

export default Edit;
