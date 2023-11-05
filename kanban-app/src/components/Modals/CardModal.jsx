import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import "./modal.css";

const CardModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  subtasks,
  status,
}) => {
  const [validationMessage, setValidationMessage] = useState("");
  const [currentStatus, setCurrentStatus] = useState(status);

  const [currentSubtasksCompletion, setCurrentSubtasksCompletion] = useState(
    subtasks.map((subtask) => {
      return { [subtask.title]: subtask.isCompleted };
    })
  );

  

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;
    setCurrentSubtasksCompletion({ ...currentSubtasksCompletion, [name]: checked });
  }

  const { returnActiveColumns } = useContext(BoardContext);
  const columnsName = returnActiveColumns();

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>{title}</h2>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>{description}</p>
        <form
          onSubmit={(e) =>
            handleSubmit(e, onSubmit, onClose, setValidationMessage)
          }
        >
          <h3>Subtasks</h3>
          {createSubtasksCheckboxes(subtasks, handleCheckboxChange, currentSubtasksCompletion)}
          {createStatusDropdown(currentStatus, setCurrentStatus, columnsName)}
          {validationMessage && <p className="error">{validationMessage}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

CardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
};

function createSubtasksCheckboxes(subtasks, handleCheckboxChange, currentSubtasksCompletion) {
  return subtasks.map((subtask, i) => {
    return (
      <div className={`modal-checkbox-container ${currentSubtasksCompletion[subtask.title] ? "completed" : ""}`} key={i}>
        <input
          type="checkbox"
          id={subtask.title}
          name={subtask.title}
          value={subtask.title}
          defaultChecked={subtask.isCompleted}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={subtask.title}>{subtask.title}</label>
      </div>
    );
  });
}

function createStatusDropdown(currentStatus, setCurrentStatus, options) {
  return (
    <div className="modal-select-container">
      <label htmlFor="status">Status</label>
      <select
        id="status"
        className="status-card-select"
        name="status"
        value={currentStatus}
        onChange={(e) => setCurrentStatus(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function handleSubmit() {
  // ...
}

export default CardModal;
