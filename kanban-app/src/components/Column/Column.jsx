import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./column.css";

const Column = ({ name, tasks, setShowModal }) => {
  const isNewColumn = name === "+ New Column";
  const classNameContainer = isNewColumn
    ? "column-container--create"
    : "column-container";

  return (
    <>
      {isNewColumn ? (
        <button
          className={classNameContainer}
          onClick={() => setShowModal(true)}
        >
          <h2 className="column__name--create">{name}</h2>
        </button>
      ) : (
        <div className={classNameContainer}>
          {tasks.length > 0 ? (
            <section>
              <h3 className="column__name">
                {name} ({tasks.length})
              </h3>
              <ul className="column-card-container">{createTasks(tasks)}</ul>
            </section>
          ) : (
            <h3 className="column__name">{name} (0 tasks)</h3>
          )}
        </div>
      )}
    </>
  );
};

Column.propTypes = {
  name: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  setShowModal: PropTypes.func,
};

function createTasks(tasks) {
  return tasks.map((task) => {
    return (
      <Card
        title={task.title}
        description={task.description}
        subtasks={task.subtasks}
        status={task.status}
        key={task.title}
      />
    );
  });
}

export default Column;
