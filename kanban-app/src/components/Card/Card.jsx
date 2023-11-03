import PropTypes from "prop-types";
import "./card.css";

// eslint-disable-next-line no-unused-vars
const Card = ({title, description, subtasks, status }) => {
  const totalSubtasks = subtasks.length;
  let totalSubtasksCompleted = 0;
  subtasks.forEach(subtask => {
    if (subtask.isCompleted) {
      totalSubtasksCompleted++;      
    }
  });

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">{title}</h2>
      </div>
      <div className="card__body">
        <p className="card__text">
          {totalSubtasksCompleted} of {totalSubtasks} substasks
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired, 
  status: PropTypes.string.isRequired,
};

export default Card;
