import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./column.css";

const Column = ({ name, tasks }) => {
  const classNameContainer =
    name === "+ New Column" ? "column-container--create" : "column-container";

  return (
    <div className={classNameContainer}>
      {tasks.length > 0 ? (
        <section>
          <h3 className="column__name">
            {name} ({tasks.length})
          </h3>
          <ul className="column-card-container">{createTasks(tasks)}</ul>
        </section>
      ) : (
        <h2 className="column__name--create">{name}</h2>
      )}
    </div>
  );
};

Column.propTypes = {
  name: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
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
