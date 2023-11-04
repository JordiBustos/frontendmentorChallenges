import { useState } from "react";
import PropTypes from "prop-types";
import "./modal.css";

const BoardModal = ({ isOpen, onClose, onSubmit, isNewBoard }) => {
  const [inputValue, setInputValue] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>{isNewBoard ? "Board Name:" : "Column Name:"}</h2>
        <span className="close" onClick={onClose}>
          &times;
        </span>
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
          <label htmlFor="textInput">
            {isNewBoard ? "Board Name:" : "Column Name:"}
          </label>
          <input
            type="text"
            id="textInput"
            value={inputValue}
            onChange={(e) => handleInputChange(e, setInputValue)}
            placeholder="Enter column name..."
          />
          {validationMessage && <p className="error">{validationMessage}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
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

function handleInputChange(e, setInputValue) {
  setInputValue(e.target.value);
}

export default BoardModal;
