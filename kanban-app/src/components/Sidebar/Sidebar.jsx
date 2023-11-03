import PropTypes from "prop-types";
import SidebarTitle from "./SidebarTitle";
import "./sidebar.css";

const Sidebar = ({ boardNames }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img className="sidebar__logo" src="/logo-light.svg" alt="logo kanban light"/>
        <h3 className="sidebar__subtitle">ALL BOARDS ({boardNames.length})</h3>
        {boardNames.map((boardName) => {
          return <SidebarTitle key={boardName} name={boardName} />;
        })}
        <SidebarTitle key="createNewBoard" name={"+Create new Board"} />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  boardNames: PropTypes.array.isRequired,
};

export default Sidebar;
