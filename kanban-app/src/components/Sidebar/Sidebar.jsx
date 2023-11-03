import SidebarTitle from "./SidebarTitle";
import { BoardContext } from "../../contexts/BoardContext";
import { useState, useContext } from "react";
import "./sidebar.css";
import BoardModal from "../Modals/BoardModal";

const Sidebar = () => {
  const { boardNames, activeBoard, createNewBoard } = useContext(BoardContext);
  const boardNamesLength = boardNames.length;
  const [showModal, setShowModal] = useState(false);

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
      {createBoardLinks(boardNames, activeBoard, setShowModal)}
      <BoardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(name) => createNewBoard(name)}
        isNewBoard={true}
      />
    </div>
  );
};

function createBoardLinks(boardNames, activeBoard, setShowModal) {
  const names = boardNames.map((name) => (
    <SidebarTitle key={name} name={name} isActive={activeBoard.name === name} />
  ));
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
