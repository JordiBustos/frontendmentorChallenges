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
          {createSubtasksCheckboxes(subtasks)}
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

function createSubtasksCheckboxes(subtasks) {
  return subtasks.map((subtask, i) => {
    return (
      <div key={i}>
        <input
          type="checkbox"
          id={subtask.title}
          name={subtask.title}
          value={subtask.title}
          defaultChecked={subtask.isCompleted}
        />
        <label htmlFor={subtask.title}>{subtask.title}</label>
      </div>
    );
  });
}

function createStatusDropdown(currentStatus, setCurrentStatus, options) {
  return (
    <div>
      <label htmlFor="status">Status:</label>
      <select
        id="status"
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
