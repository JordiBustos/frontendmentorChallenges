import PropTypes from "prop-types";
import "./card.css";
import { useState } from "react";
import CardModal from "../Modals/CardModal";

const Card = ({ title, description, subtasks, status }) => {
  const totalSubtasks = subtasks.length;
  const totalSubtasksCompleted = computeSubtasksCompleted(subtasks);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
        <CardModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={() => console.log("TODO")}
          title={title}
          description={description}
          subtasks={subtasks}
          status={status}
        />
      )}
    </>
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
