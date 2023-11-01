import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import ModalContent from "../ModalContent";
import PropTypes from "prop-types";

const CurrentUserOptions = ({
  openModal,
  closeModal,
  isModalOpen,
  handleDelete,
  setIsBeingEdited,
  width,
}) => {
  return (
    <div
      className={
        width < 768
          ? "comment-buttons-container mobile-buttons"
          : "comment-buttons-container"
      }
    >
      <Button onClick={openModal} className="delete-button">
        <img src="/icon-delete.svg" alt="delete" className="delete-icon" />
        Delete
      </Button>
      <Button className="edit-button" onClick={() => setIsBeingEdited(true)}>
        <img src="/icon-edit.svg" alt="edit" className="edit-icon" />
        Edit
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent
          closeModal={closeModal}
          handleDelete={handleDelete}
          title={"Delete Comment"}
          paragraph={"Are you sure?"}
          confirm={"YES, DELETE"}
          cancel={"NO, CANCEL"}
        />
      </Modal>
    </div>
  );
};

CurrentUserOptions.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setIsBeingEdited: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export default CurrentUserOptions;
