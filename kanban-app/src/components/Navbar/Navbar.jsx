import "./navbar.css";
import { useState, useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import NewTaskModal from "../Modals/NewTaskModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import EditBoardModal from "../Modals/EditBoardModal";

const Navbar = () => {
  const { activeBoard, deleteActiveBoard, editBoard } =
    useContext(BoardContext);
  const [showModal, setShowModal] = useState({
    newTask: false,
    deleteBoard: false,
    editBoard: false,
  });

  function onDelete() {
    deleteActiveBoard();
    showOrHideModal(false, "deleteBoard")();
  }

  function onEdit(name, columnsChecked) {
    editBoard(name, columnsChecked);
    showOrHideModal(false, "editBoard")();
  }

  function showOrHideModal(value, board) {
    return () => setShowModal((prev) => ({ ...prev, [board]: value }));
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>{activeBoard && activeBoard.name}</h1>
        <div>
          {activeBoard && (
            <>
              <button
                onClick={showOrHideModal(true, "editBoard")}
                className="edit-board-button"
              >
                Edit Board
              </button>
              <button
                onClick={showOrHideModal(true, "deleteBoard")}
                className="delete-board-button"
              >
                Delete Board
              </button>
              <button
                onClick={showOrHideModal(true, "newTask")}
                className="new-task-button"
              >
                +Add New Task
              </button>
            </>
          )}
        </div>
      </div>
      {showModal.newTask && (
        <NewTaskModal
          isOpen={showModal.newTask}
          onClose={showOrHideModal(false, "newTask")}
        />
      )}
      {showModal.deleteBoard && (
        <ConfirmDeleteModal
          isOpen={showModal.deleteBoard}
          onClose={showOrHideModal(false, "deleteBoard")}
          onDelete={onDelete}
        />
      )}
      {showModal.editBoard && (
        <EditBoardModal
          isOpen={showModal.editBoard}
          onClose={showOrHideModal(false, "editBoard")}
          onSubmit={(name, columnsChecked) => onEdit(name, columnsChecked)}
          boardName={activeBoard.name}
        />
      )}
    </nav>
  );
};

export default Navbar;
