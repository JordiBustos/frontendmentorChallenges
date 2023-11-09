import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import {
  createTextInput,
  createStatusDropdown,
  createNewSubtaskField,
} from "../../utils/formUtils";
import {
  returnRandomSubtask,
  returnRandomDescription,
  validateSubmit,
  Right,
  Left,
} from "../../utils/lib";
import Modal from "./Modal";

const NewTaskModal = ({ isOpen, onClose }) => {
  const {
    returnActiveColumns,
    activeBoard,
    boards,
    activeBoardIndex,
    updateBoardsState,
  } = useContext(BoardContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputFields, setInputFields] = useState([""]);
  const [currentStatus, setCurrentStatus] = useState(
    returnActiveColumns()[0].name
  );

  const [randomDescription] = useState(returnRandomDescription());
  const [randomSubtask, setRandomSubtask] = useState([returnRandomSubtask()]);
  const [validationMessage, setValidationMessage] = useState("");

  function updateRandomSubtask() {
    setRandomSubtask((prev) => [...prev, returnRandomSubtask()]);
  }

  function createTask(newTask) {
    createTaskHelper(newTask, activeBoard)
      .map((activeBoard) => activeBoard.columns)
      .map((columns) => findColumnOfTask(columns, newTask))
      .map((columnIndex) =>
        createTaskInBoard(boards, activeBoardIndex, columnIndex, newTask)
      )
      .fold(alert, updateBoardsState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateSubmit(title, inputFields, setValidationMessage)) {
      return;
    }
    const newTask = createNewTask(
      title,
      description,
      inputFields,
      currentStatus
    );

    createTask(newTask);
    onClose();
  }

  function addInputField() {
    setInputFields([...inputFields, ""]);
    updateRandomSubtask();
  }

  function deleteSubtasks(index) {
    const newInputValues = [...inputFields];
    newInputValues.splice(index, 1);
    setInputFields(newInputValues);
  }

  function handleInputChange(index, value) {
    const newInputValues = [...inputFields];
    newInputValues[index] = value;
    setInputFields(newInputValues);
  }

  return (
    <Modal title={"Add New Task"} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {createTextInput("Title", "title", title, setTitle, "column")}
        {createTextInput(
          "Description",
          "description",
          description,
          setDescription,
          "column",
          randomDescription
        )}
        <h3>Subtasks: </h3>
        {createNewSubtaskField(
          inputFields,
          handleInputChange,
          deleteSubtasks,
          randomSubtask
        )}
        <button
          className="add-new-subtasks"
          type="button"
          onClick={addInputField}
        >
          +Add New Subtasks
        </button>
        {createStatusDropdown(
          currentStatus,
          setCurrentStatus,
          returnActiveColumns()
        )}
        {validationMessage && <p className="error">{validationMessage}</p>}
        <button type="submit">Create task</button>
      </form>
    </Modal>
  );
};

NewTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

function createNewTask(title, description, inputFields, currentStatus) {
  return {
    title,
    description,
    subtasks: inputFields.map((subtask) => ({
      title: subtask,
      isCompleted: false,
    })),
    status: currentStatus,
  };
}

function createTaskHelper(newTask, activeBoard) {
  return activeBoard.columns
    .flatMap((column) => column.tasks)
    .some((task) => task.title === newTask.title)
    ? Left("There is already a card with this name")
    : Right(activeBoard);
}

function findColumnOfTask(columns, newTask) {
  return columns.findIndex((column) => column.name === newTask.status);
}

function createTaskInBoard(boards, activeBoardIndex, columnIndex, newTask) {
  const newBoard = [...boards];
  newBoard[activeBoardIndex].columns[columnIndex].tasks.push(newTask);
  return newBoard;
}

export default NewTaskModal;
