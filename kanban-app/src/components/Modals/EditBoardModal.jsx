import Modal from "./Modal";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import {
  createTextInput,
  createColumnsCheckboxes,
} from "../../utils/formUtils";
import { BoardContext } from "../../contexts/BoardContext";

const EditBoardModal = ({ isOpen, onClose, onSubmit, boardName }) => {
  const [name, setName] = useState(boardName);
  const [validationMessage, setValidationMessage] = useState("");
  const [columnsChecked, setColumnsCheked] = useState([]);
  const { returnActiveColumns } = useContext(BoardContext);
  const activeColumns = returnActiveColumns();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit ${boardName}`}
      isBoardModal={true}
    >
      <form
        onSubmit={handleSubmit(
          name,
          columnsChecked,
          onSubmit,
          setValidationMessage
        )}
      >
        {createTextInput("Name", "name", name, setName, "Enter new name...")}
        <div>
          {activeColumns?.length > 0 && (
            <>
              <h3>Delete columns</h3>
              <p>
                Selected columns will be deleted with its corresponding tasks.
              </p>
              {createColumnsCheckboxes(returnActiveColumns(), setColumnsCheked)}
            </>
          )}
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

function handleSubmit(name, columnsChecked, onSubmit, setValidationMessage) {
  return (e) => {
    e.preventDefault();
    if (name === "") {
      setValidationMessage("Name cannot be empty");
      return;
    }
    onSubmit(name, columnsChecked);
  };
}

export default EditBoardModal;
