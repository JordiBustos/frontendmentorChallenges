import PropTypes from "prop-types";
import "./card.css";

// eslint-disable-next-line no-unused-vars
const Card = ({ title, description, subtasks, status }) => {
  const totalSubtasks = subtasks.length;
  const totalSubtasksCompleted = computeSubtasksCompleted(subtasks);

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{title}</h2>
      </div>
      <div className="card__body">
        <p className="card__text">
          {totalSubtasksCompleted} of {totalSubtasks} substasks
        </p>
      </div>
    </li>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
};

function computeSubtasksCompleted(subtasks) {
  return subtasks.filter((subtask) => subtask.isCompleted).length;
}

export default Card;
