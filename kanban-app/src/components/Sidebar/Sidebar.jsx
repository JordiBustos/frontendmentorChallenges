import SidebarTitle from "./SidebarTitle";
import { BoardContext } from "../../contexts/BoardContext";
import { useContext } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const { boardNames, activeBoard } = useContext(BoardContext);
  const boardNamesLength = boardNames.length;
  
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
      {createBoardLinks(boardNames, activeBoard)}
    </div>
  );
};

function createBoardLinks(boardNames, activeBoard) {
  const names = boardNames.map((name) => (
    <SidebarTitle key={name} name={name} isActive={activeBoard.name === name} />
  ));
  names.push(<SidebarTitle key="createNewBoard" name={"+Create new Board"} isActive={false} />);
  return names;
}

export default Sidebar;
