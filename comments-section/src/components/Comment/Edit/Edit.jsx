import PropTypes from "prop-types";
import { useState } from "react";
import "./edit.css";

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
    <section className="edit-container">
      <form>
        <textarea
          placeholder="Update comment..."
          value={tmpText}
          onChange={(event) => setTmpText(event.target.value)}
          name="text"
          rows="2"
          cols="8"
          wrap="soft"
        ></textarea>
        <button onClick={handleSubmit}>UPDATE</button>
      </form>
    </section>
  );
};

Edit.propTypes = {
  currentText: PropTypes.string.isRequired,
  updateComment: PropTypes.func.isRequired,
  setIsBeingEdited: PropTypes.func.isRequired,
};

export default Edit;
