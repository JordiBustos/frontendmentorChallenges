import Column from "../Column/Column";
import BoardModal from "../Modals/BoardModal";
import { BoardContext } from "../../contexts/BoardContext";
import { useContext, useState } from "react";
import "./board.css";
import { checkIfIsInArray, Right, Left } from "../../utils/lib";


const Board = () => {
  const { boards, activeBoardIndex, updateBoardsState } = useContext(BoardContext);
  const [showModal, setShowModal] = useState(false);
  const columns = boards[activeBoardIndex]?.columns;

  function createNewColumnInActiveBoard(columnName) {
    if (activeBoardIndex !== -1) {
      newColumnHelper(boards, activeBoardIndex, columnName)
        .map((boards) => putColumnInBoard(boards, activeBoardIndex, columnName))
        .fold(alert, updateBoardsState);
    }
  }

  return (
    <section>
      {boards[activeBoardIndex] !== null ? (
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

// create new column
function newColumnHelper(boards, activeBoardIndex, columnName) {
  return !checkIfIsInArray(boards[activeBoardIndex].columns, columnName)
    ? Right(boards)
    : Left("A column with the same name already exists");
}

function putColumnInBoard(boards, activeBoardIndex, columnName) {
  const newBoard = [...boards];
  newBoard[activeBoardIndex].columns.push({
    name: columnName,
    tasks: [],
  });
  return newBoard;
}

export default Board;
