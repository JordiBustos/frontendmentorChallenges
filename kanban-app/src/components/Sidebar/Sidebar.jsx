import SidebarTitle from "./SidebarTitle";
import { BoardContext } from "../../contexts/BoardContext";
import { useState, useContext } from "react";
import "./sidebar.css";
import BoardModal from "../Modals/BoardModal";
import { checkIfIsInArray } from "../../utils/lib";

const Sidebar = () => {
  const { boards, activeBoardIndex, updateBoardsState } = useContext(BoardContext);
  const boardNamesLength = boards ? boards.length : 0;
  const boardNames = boards?.map((board) => board.name);
  const [showModal, setShowModal] = useState(false);

  function createNewBoard(name) {
    if (!checkIfIsInArray(boards, name)) {
      updateBoardsState([
        ...boards,
        {
          name,
          columns: [],
          isActive: false,
        },
      ]);
      return true;
    }
    return false;
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img
          className="sidebar__logo"
          src="/logo-light.svg"
          alt="logo kanban light"
        />
        <h3 className="sidebar__subtitle">ALL BOARDS ({boardNamesLength})</h3>
      </div>
      {createBoardLinks(boardNames, boards[activeBoardIndex], setShowModal)}
      {showModal && (
        <BoardModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={(name) => createNewBoard(name)}
          isNewBoard={true}
        />
      )}
    </div>
  );
};

function createBoardLinks(boardNames, activeBoard, setShowModal) {
  const names = [];
  if (boardNames && boardNames.length > 0) {
    boardNames.forEach((name) =>
      names.push(
        <SidebarTitle
          key={name}
          name={name}
          isActive={activeBoard.name === name}
        />
      )
    );
  }
  names.push(
    <SidebarTitle
      key="createNewBoard"
      name={"+Create new Board"}
      isActive={false}
      setShowModal={setShowModal}
    />
  );
  return names;
}

export default Sidebar;
