import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./column.css";

const Column = ({ name, tasks }) => {
  const classNameContainer =
    name === "+ New Column" ? "column-container--create" : "column-container";

  return (
    <div className={classNameContainer}>
      <h2>{name}</h2>
      {tasks.length > 0 ? (
        <ul className="column-card-container">
          {tasks.map((task) => {
            return (
              <Card
                title={task.title}
                description={task.description}
                subtasks={task.subtasks}
                status={task.status}
                key={task.title}
              />
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

Column.propTypes = {
  name: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default Column;
