import Column from "../Column/Column";
import BoardModal from "../Modals/BoardModal";
import { BoardContext } from "../../contexts/BoardContext";
import { useContext, useState } from "react";
import "./board.css";

const Board = () => {
  const { returnActiveColumns, createNewColumnInActiveBoard } =
    useContext(BoardContext);
  const columns = returnActiveColumns();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="board-container">
        {createColumns(columns, setShowModal)}
      </div>
      <BoardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(name) => createNewColumnInActiveBoard(name)}
        isNewBoard={false}
      />
    </>
  );
};

function createColumns(columns, setShowModal) {
  const arrOfColumns = columns.map((column) => {
    return <Column key={column.name} name={column.name} tasks={column.tasks} />;
  });
  arrOfColumns.push(
    <Column
      key="createNewColumn"
      name={"+ New Column"}
      tasks={[]}
      setShowModal={setShowModal}
    />
  );
  return arrOfColumns;
}

export default Board;
