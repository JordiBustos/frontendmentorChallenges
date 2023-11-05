import Modal from "./Modal";
import PropTypes from "prop-types";

const ConfirmDeleteModal = ({isOpen, onClose, onDelete}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Confirm Delete"}>
      <p>Are you sure you want to delete this board?</p>
      <div className="confirmation-container">
        <button className="modal-cancel-button" onClick={onClose}>Cancel</button>
        <button className="modal-delete-button" onClick={onDelete}>Delete</button>
      </div>
    </Modal>
  )
}

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ConfirmDeleteModal;