import PropTypes from "prop-types";
import { BoardContext } from "../../contexts/BoardContext";
import { useContext } from "react";


const SidebarTitle = ({ name, isActive, setShowModal }) => {

  const { setActiveBoard, findBoardByName } =
    useContext(BoardContext);
  const className =
    name === "+Create new Board"
      ? "sidebar__title--create"
      : isActive
      ? "sidebar__title--active"
      : "sidebar__title";

  return (
    <div className={className}>
      {renderTitle(name, setActiveBoard, findBoardByName, setShowModal)}
    </div>
  );
};

function renderTitle(name, setActiveBoard, findBoardByName, setShowModal) {
  const isCreateNewBoard = name === "+Create new Board";

  const titleContent = (
    <>
      <img src="icon-board.svg" alt="board icon" className="sidebar__icon" />
      <h3>{name}</h3>
    </>
  );

  const fn = createButtonFn(
    isCreateNewBoard,
    setShowModal,
    setActiveBoard,
    findBoardByName,
    name
  );

  return (
    <button className="sidebar__button" onClick={fn}>
      {titleContent}
    </button>
  );
}

function createButtonFn(
  isCreateNewBoard,
  setShowModal,
  setActiveBoard,
  findBoardByName,
  name
) {
  if (isCreateNewBoard) return () => setShowModal(true);
  return () => setActiveBoard(findBoardByName(name));
}

SidebarTitle.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func,
};

export default SidebarTitle;
