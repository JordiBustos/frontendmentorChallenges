import PropTypes from "prop-types";
import SidebarTitle from "./SidebarTitle";
import "./sidebar.css";

const Sidebar = ({ boardNames }) => {
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
        {createBoardLinks(boardNames)}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  boardNames: PropTypes.array.isRequired,
};

function createBoardLinks(boardNames) {
  const names = boardNames.map((name) => (
    <SidebarTitle key={name} name={name} />
  ));
  names.push(<SidebarTitle key="createNewBoard" name={"+Create new Board"} />);
  return names;
}

export default Sidebar;
