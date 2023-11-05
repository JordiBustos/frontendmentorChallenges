import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { createTextInput, createStatusDropdown } from "../../utils/formUtils";
import Modal from "./Modal";

const NewTaskModal = ({ isOpen, onClose }) => {
  const { returnActiveColumns, createTask } = useContext(BoardContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputFields, setInputFields] = useState([""]);
  const [currentStatus, setCurrentStatus] = useState(
    returnActiveColumns()[0].name
  );

  function handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      title,
      description,
      subtasks: inputFields.map((subtask) => ({
        title: subtask,
        isCompleted: false,
      })),
      status: currentStatus,
    };
    createTask(newTask);
    onClose();
  }

  function addInputField() {
    setInputFields([...inputFields, ""]);
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
          "column"
        )}
        <h3>Subtasks: </h3>
        {createNewSubtaskField(inputFields, handleInputChange, deleteSubtasks)}
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
        <button type="submit">Create task</button>
      </form>
    </Modal>
  );
};

NewTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

function createNewSubtaskField(inputFields, handleInputChange, deleteSubtasks) {
  return inputFields.map((value, index) => (
    <div className="subtask-input-container" key={index}>
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(index, e.target.value)}
      />
      <span onClick={(index) => deleteSubtasks(index)}>&times;</span>
    </div>
  ));
}

export default NewTaskModal;
