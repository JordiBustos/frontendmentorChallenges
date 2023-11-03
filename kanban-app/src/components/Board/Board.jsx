import PropTypes from "prop-types";
import Column from "../Column/Column";
import "./board.css";

const Board = ({ board }) => {
  const columns = board.columns;
  return <div className="board-container">{createColumns(columns)}</div>;
};

Board.propTypes = {
  board: PropTypes.object.isRequired,
};

function createColumns(columns) {
  const arrOfColumns = columns.map((column) => {
    return <Column key={column.name} name={column.name} tasks={column.tasks} />;
  });
  arrOfColumns.push(
    <Column key="createNewColumn" name={"+ New Column"} tasks={[]} />
  );
  return arrOfColumns;
}

export default Board;
