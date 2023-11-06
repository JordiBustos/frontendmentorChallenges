import { useState } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";
import { createTextInput } from "../../utils/formUtils";

const BoardModal = ({ isOpen, onClose, onSubmit, isNewBoard }) => {
  const [inputValue, setInputValue] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  return (
    <Modal
      title={isNewBoard ? "Board Name" : "Column Name"}
      isOpen={isOpen}
      onClose={onClose}
      isBoardModal={true}
    >
      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            onSubmit,
            onClose,
            inputValue,
            setValidationMessage,
            setInputValue
          )
        }
      >
        {createTextInput(
          isNewBoard ? "Board Name" : "Column Name",
          "textInput",
          inputValue,
          setInputValue
        )}
        {validationMessage && <p className="error">{validationMessage}</p>}

        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

BoardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isNewBoard: PropTypes.bool,
};

function handleSubmit(
  e,
  onSubmit,
  onClose,
  inputValue,
  setValidationMessage,
  setInputValue
) {
  e.preventDefault();
  if (inputValue !== "") {
    const response = onSubmit(inputValue);
    setInputValue("");
    if (response) onClose();
    else setValidationMessage("The name is already in use");
  } else setValidationMessage("Please enter a board name");
}

export default BoardModal;
