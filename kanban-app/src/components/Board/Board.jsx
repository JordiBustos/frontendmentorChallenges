import Column from "../Column/Column";
import { BoardContext } from "../../contexts/BoardContext";
import { useContext } from "react";
import "./board.css";

const Board = () => {
  const { returnActiveColumns } = useContext(BoardContext);
  const columns = returnActiveColumns();

  


  return <div className="board-container">{createColumns(columns)}</div>;
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
