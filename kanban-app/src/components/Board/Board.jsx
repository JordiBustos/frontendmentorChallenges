import Column from "../Column/Column";
import BoardModal from "../Modals/BoardModal";
import { BoardContext } from "../../contexts/BoardContext";
import { useContext, useState } from "react";
import "./board.css";

const Board = () => {
  const { returnActiveColumns, createNewColumnInActiveBoard, activeBoard } =
    useContext(BoardContext);
  const [showModal, setShowModal] = useState(false);

  const columns = returnActiveColumns();

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
  const createNewColumn = (
    <Column
      key="createNewColumn"
      name={"+ New Column"}
      tasks={[]}
      setShowModal={setShowModal}
    />
  );

  if (columns?.length === 0 || columns === undefined) {
    return (
      <>
        <h2 className="empty-title">This Board is empty</h2>
        {createNewColumn}
      </>
    );
  }

  const arrOfColumns = columns.map((column) => {
    return <Column key={column.name} name={column.name} tasks={column.tasks} />;
  });

  arrOfColumns.push(createNewColumn);

  return arrOfColumns;
}

export default Board;
