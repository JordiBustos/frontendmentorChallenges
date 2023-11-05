import "./navbar.css";
import { useState, useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import NewTaskModal from "../Modals/NewTaskModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

const Navbar = () => {
  const { activeBoard, deleteActiveBoard } = useContext(BoardContext);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function onDelete() {
    deleteActiveBoard();
    setShowDeleteModal(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>{activeBoard.name}</h1>
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="edit-board-button"
          >
            Edit Board
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="delete-board-button"
          >
            Delete Board
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="new-task-button"
          >
            +Add New Task
          </button>
        </div>
      </div>
      {showModal && (
        <NewTaskModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={onDelete}
        />
      )}
    </nav>
  );
};

export default Navbar;
