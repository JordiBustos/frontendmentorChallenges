import Column from "../Column/Column";
import BoardModal from "../Modals/BoardModal";
import { BoardContext } from "../../contexts/BoardContext";
import { useContext, useState } from "react";
import "./board.css";

const Board = () => {
  const { returnActiveColumns, createNewColumnInActiveBoard, activeBoard } =
    useContext(BoardContext);
  const [showModal, setShowModal] = useState(false);

  let columns;

  if (activeBoard !== null) {
    columns = returnActiveColumns();
  }

  return (
    <section>
      {activeBoard !== null ? (
        <>
          <div className="board-container">
            {createColumns(columns, setShowModal)}
          </div>
          {showModal && (
            <BoardModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSubmit={(name) => createNewColumnInActiveBoard(name)}
              isNewBoard={false}
            />
          )}
        </>
      ) : (
        <h2 className="empty-title">Please create a board</h2>
      )}
    </section>
  );
};

function createColumns(columns, setShowModal) {
  const arrOfColumns = [];

  if (columns?.length === 0 || columns === undefined) {
    arrOfColumns.push(
      <Column
        key="createNewColumn"
        name={"+ New Column"}
        tasks={[]}
        setShowModal={setShowModal}
      />
    );

    return (
      <>
        <h2 className="empty-title">This Board is empty</h2>
        {arrOfColumns}
      </>
    );
  }

  columns.forEach((column) => {
    arrOfColumns.push(
      <Column key={column.name} name={column.name} tasks={column.tasks} />
    );
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
