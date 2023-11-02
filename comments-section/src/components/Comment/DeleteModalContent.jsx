import Button from "../Button/Button";
import PropTypes from "prop-types";

const DeleteModalContent = ({
  closeModal,
  handleDelete,
  title,
  paragraph,
  confirm,
  cancel,
}) => {
  return (
    <div className="delete-modal">
      <h3>{title}</h3>
      <p>{paragraph}</p>
      <div className="delete-modal-buttons">
        <Button onClick={closeModal} className="cancel-button">
          {cancel}
        </Button>
        <Button onClick={handleDelete} className="delete-modal-button">
          {confirm}
        </Button>
      </div>
    </div>
  );
};

DeleteModalContent.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  confirm: PropTypes.string.isRequired,
  cancel: PropTypes.string.isRequired,
};

export default DeleteModalContent;
