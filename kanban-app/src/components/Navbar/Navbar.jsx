import "./navbar.css";
import { useState, useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import NewTaskModal from "../Modals/NewTaskModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import EditBoardModal from "../Modals/EditBoardModal";
import { Right, Left } from "../../utils/lib";

const Navbar = () => {
  const { boards, activeBoard, updateBoardsState, activeBoardIndex } =
    useContext(BoardContext);
  const [showModal, setShowModal] = useState({
    newTask: false,
    deleteBoard: false,
    editBoard: false,
  });

  function filterBoard(boards, activeBoard) {
    const newBoards = boards.filter((b) => b.name !== activeBoard.name);
    return boards.length !== 0 ? Right(newBoards) : Left("No boards to delete");
  }

  function deleteActiveBoard() {
    filterBoard([...boards], activeBoard).fold(alert, updateBoardsState);
  }

  function onDelete() {
    deleteActiveBoard();
    showOrHideModal(false, "deleteBoard")();
  }

  // edit board
  function updateEditedBoard(boards, boardIndex, name, columns) {
    const newBoard = [...boards];
    newBoard[boardIndex].columns = columns;
    newBoard[boardIndex].name = name;
    return newBoard;
  }

  function filterColumnsByNames(columns, columnNames) {
    return columns.filter((column) => !columnNames.includes(column.name));
  }

  function editActiveBoard(name, columnsChecked) {
    return Right(boards)
      .map((boards) => boards[activeBoardIndex])
      .map((activeBoard) => activeBoard.columns)
      .map((activeColumns) =>
        filterColumnsByNames(activeColumns, columnsChecked)
      )
      .map((filteredColumns) =>
        updateEditedBoard(boards, activeBoardIndex, name, filteredColumns)
      )
      .fold(
        () => {
          alert("Something went wrong");
        },
        (result) => {
          updateBoardsState(result);
        }
      );
  }

  function onEdit(name, columnsChecked) {
    editActiveBoard(name, columnsChecked);
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
