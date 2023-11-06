import Modal from "./Modal";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { createTextInput } from "../../utils/formUtils";
import { BoardContext } from "../../contexts/BoardContext";

const EditBoardModal = ({ isOpen, onClose, onSubmit, boardName }) => {
  const [name, setName] = useState(boardName);
  const [validationMessage, setValidationMessage] = useState("");
  const [columnsChecked, setColumnsCheked] = useState([]);
  const { returnActiveColumns } = useContext(BoardContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (name === "") {
      setValidationMessage("Name cannot be empty");
      return;
    }
    onSubmit(name, columnsChecked);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit ${boardName}`}
      isBoardModal={true}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        {createTextInput("Name", "name", name, setName, "Enter new name...")}
        <div>
          <h3>Delete columns</h3>
          <p>Selected columns will be deleted with its corresponding tasks.</p>
          {createColumnsCheckboxes(returnActiveColumns(), setColumnsCheked)}
        </div>
        {validationMessage && <p className="error">{validationMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

EditBoardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  boardName: PropTypes.string.isRequired,
};

function createColumnsCheckboxes(columns, setColumnsCheked) {
  return columns.map((column) => {
    return (
      <span className="modal-checkbox-container" key={column.name}>
        <input
          onChange={(e) => {
            if (e.target.checked) {
              setColumnsCheked((prev) => [...prev, e.target.value]);
            } else {
              setColumnsCheked((prev) =>
                prev.filter((column) => column !== e.target.value)
              );
            }
          }}
          type="checkbox"
          id={column.name}
          name={column.name}
          value={column.name}
        />
        <label htmlFor={column.name}>{column.name}</label>
      </span>
    );
  });
}

export default EditBoardModal;
