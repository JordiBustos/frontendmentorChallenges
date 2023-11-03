import PropTypes from "prop-types";
import { useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";

const SidebarTitle = ({ name, isActive }) => {
  const { setActiveBoard, findBoardByName } = useContext(BoardContext);
  const className =
    name === "+Create new Board"
      ? "sidebar__title--create"
      : isActive
      ? "sidebar__title--active"
      : "sidebar__title";

  const renderTitle = () => {
    const isCreateNewBoard = name === "+Create new Board";

    const titleContent = (
      <>
        <img src="icon-board.svg" alt="board icon" className="sidebar__icon" />
        <h3>{name}</h3>
      </>
    );

    if (isCreateNewBoard) return titleContent;
    return (
      <button className="sidebar__button" onClick={() => setActiveBoard(findBoardByName(name))}>
        {titleContent}
      </button>
    );
  };

  return <div className={className}>{renderTitle()}</div>;
};

SidebarTitle.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SidebarTitle;
