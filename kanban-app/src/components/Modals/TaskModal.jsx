import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { computeSubtasksCompleted } from "../../utils/lib";
import { createStatusDropdown } from "../../utils/formUtils";
import Modal from "./Modal";

const TaskModal = ({
  isOpen,
  onClose,
  title,
  description,
  subtasks,
  status,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentSubtasks, setCurrentSubtasks] = useState(subtasks);
  const { returnActiveColumns, updateCardStatusAndSubtasks, deleteTask } =
    useContext(BoardContext);

  function handleDeleteTask() {
    deleteTask(title, status);
    onClose();
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
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
        {createStatusDropdown(
          currentStatus,
          setCurrentStatus,
          returnActiveColumns()
        )}
        <button type="submit">Submit</button>
      </form>
      <p className="delete-task" onClick={handleDeleteTask}>
        Delete task
      </p>
    </Modal>
  );
};

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
};

function handleCheckboxChange(e, i, subtasks, setCurrentSubtasks) {
  const updatedSubtasks = [...subtasks];
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
  updateCardStatusAndSubtasks(
    title,
    description,
    currentSubtasks,
    currentStatus
  );
  onClose();
}

export default TaskModal;
