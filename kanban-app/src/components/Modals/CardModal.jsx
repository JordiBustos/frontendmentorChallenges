import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { computeSubtasksCompleted } from "../../utils/lib";
import "./modal.css";

const CardModal = ({
  isOpen,
  onClose,
  title,
  description,
  subtasks,
  status,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentSubtasks, setCurrentSubtasks] = useState(subtasks);
  const { returnActiveColumns, updateCardStatusAndSubtasks } =
    useContext(BoardContext);
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
            handleSubmit(
              e,
              title,
              description,
              updateCardStatusAndSubtasks,
              onClose,
              currentSubtasks,
              currentStatus
            )
          }
        >
          <h3>Subtasks {computeCompletedOutOfTotal(currentSubtasks)}</h3>
          {createSubtasksCheckboxes(
            currentSubtasks,
            handleCheckboxChange,
            setCurrentSubtasks
          )}
          {createStatusDropdown(currentStatus, setCurrentStatus, columnsName)}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

CardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
};

function handleCheckboxChange(e, i, subtasks, setCurrentSubtasks) {
  const updatedSubtasks = [...subtasks]; // Create a new array to avoid mutating the original state
  updatedSubtasks[i].isCompleted = !updatedSubtasks[i].isCompleted;
  setCurrentSubtasks(updatedSubtasks);
}

function createSubtasksCheckboxes(
  subtasks,
  handleCheckboxChange,
  setCurrentSubtasks
) {
  return subtasks.map((subtask, i) => {
    return (
      <div
        className={`modal-checkbox-container${
          subtask.isCompleted ? " completed" : ""
        }`}
        key={i}
      >
        <input
          type="checkbox"
          id={subtask.title}
          name={subtask.title}
          value={subtask.title}
          checked={subtask.isCompleted}
          onChange={(e) =>
            handleCheckboxChange(e, i, subtasks, setCurrentSubtasks)
          }
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

function computeCompletedOutOfTotal(subtasks) {
  return `(${computeSubtasksCompleted(subtasks)} of ${subtasks.length})`;
}

function handleSubmit(
  e,
  title,
  description,
  updateCardStatusAndSubtasks,
  onClose,
  currentSubtasks,
  currentStatus
) {
  e.preventDefault();
  updateCardStatusAndSubtasks(title, description, currentSubtasks, currentStatus);
  onClose();
}

export default CardModal;
