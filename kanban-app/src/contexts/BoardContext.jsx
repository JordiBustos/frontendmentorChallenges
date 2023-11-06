import React, { useState } from "react";
import { checkIfIsInArray } from "../utils/lib";
import PropTypes from "prop-types";
import data from "../data.json";

const BoardContext = React.createContext();

const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(data.boards);
  const [activeBoard, setActiveBoard] = useState(
    boards.length > 0 ? boards[0] : null
  );
  const boardNames = boards?.map((board) => board.name);

  function findBoardByName(name) {
    return boards.find((board) => board.name === name);
  }

  function returnActiveColumns() {
    return activeBoard.columns;
  }

  function createNewBoard(name) {
    const newBoard = {
      name,
      columns: [],
      isActive: false,
    };
    if (!checkIfIsInArray(boards, name)) {
      setBoards([...boards, newBoard]);
      setActiveBoard(newBoard);
      return true;
    }
    return false;
  }

  function deleteActiveBoard() {
    const activeBoardIndex = findBoardIndex(boards, activeBoard.name);
    const newBoards = [...boards];
    newBoards.splice(activeBoardIndex, 1);
    setBoards(newBoards);
    setActiveBoard(newBoards?.length > 0 ? newBoards[0] : null);
  }

  function createNewColumnInActiveBoard(columnName) {
    const activeBoardIndex = findBoardIndex(boards, activeBoard.name);

    if (activeBoardIndex !== -1) {
      const activeBoardCopy = { ...boards[activeBoardIndex] };
      const newColumn = {
        name: columnName,
        tasks: [],
      };

      if (!checkIfIsInArray(activeBoardCopy.columns, columnName)) {
        activeBoardCopy.columns.push(newColumn);
        const updatedBoards = [...boards];
        updatedBoards[activeBoardIndex] = activeBoardCopy;
        setBoards(updatedBoards);
        return true;
      }
    }
    return false;
  }

  function updateCardStatusAndSubtasks(
    cardTitle,
    description,
    completedSubtasks,
    newStatus
  ) {
    const newTask = {
      title: cardTitle,
      status: newStatus,
      description: description,
      subtasks: completedSubtasks,
    };

    const activeBoardIndex = findBoardIndex(boards, activeBoard.name);
    const activeColumns = boards[activeBoardIndex].columns;
    const currentColumnIndex = activeColumns.findIndex((column) =>
      column.tasks.some((task) => task.title === cardTitle)
    );
    const currentTaskInColumnIndex = activeColumns[
      currentColumnIndex
    ].tasks.findIndex((task) => task.title === cardTitle);
    const newBoard = [...boards];
    const newColumnIndex = activeColumns.findIndex(
      (column) => column.name === newStatus
    );
    newBoard[activeBoardIndex].columns[currentColumnIndex].tasks.splice(
      currentTaskInColumnIndex,
      1
    );
    newBoard[activeBoardIndex].columns[newColumnIndex].tasks.push(newTask);
    setBoards(newBoard);
  }

  function createTask(newTask) {
    const activeBoardIndex = findBoardIndex(boards, activeBoard.name);
    const activeColumns = boards[activeBoardIndex].columns;
    const currentColumnIndex = activeColumns.findIndex(
      (column) => column.name === newTask.status
    );
    const newBoard = [...boards];
    newBoard[activeBoardIndex].columns[currentColumnIndex].tasks.push(newTask);
    setBoards(newBoard);
  }

  return (
    <BoardContext.Provider
      value={{
        activeBoard,
        setActiveBoard,
        boardNames,
        returnActiveColumns,
        findBoardByName,
        createNewBoard,
        createNewColumnInActiveBoard,
        updateCardStatusAndSubtasks,
        createTask,
        deleteActiveBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function findBoardIndex(boards, name) {
  return boards.findIndex((board) => board.name === name);
}

export { BoardContext, BoardProvider };
