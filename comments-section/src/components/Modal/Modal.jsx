import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./modal.css";

const Modal = ({ children, isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">{children}</div>
      <Button
        className={"modal-close is-large"}
        ariaLabel="close"
        onClick={onClose}
      />
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
