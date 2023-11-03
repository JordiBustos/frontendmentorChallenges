import PropTypes from 'prop-types';

const SidebarTitle = ({ name }) => {
  const classNameContainer = name === '+Create new Board' ? 'sidebar__title--create' : 'sidebar__title';
  return (
    <div className={classNameContainer}>
      <img src="icon-board.svg" alt="board icon" className="sidebar__icon" />
      <h3>{name}</h3>
    </div>
  );
}

SidebarTitle.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SidebarTitle;