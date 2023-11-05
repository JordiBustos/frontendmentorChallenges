import PropTypes from "prop-types";
import "./card.css";
import { useState } from "react";
import TaskModal from "../Modals/TaskModal";
import { computeSubtasksCompleted } from "../../utils/lib";

const Card = ({ title, description, subtasks, status }) => {
  const totalSubtasks = subtasks.length;
  const totalSubtasksCompleted = computeSubtasksCompleted(subtasks);
  const [showModal, setShowModal] = useState(false);

  return (
    <article>
      <div className="button-card" onClick={() => setShowModal(true)}>
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
      </div>
      {showModal && (
        <TaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={title}
          description={description}
          subtasks={subtasks}
          status={status}
        />
      )}
    </article>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  subtasks: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
};

export default Card;
