import React, { useState } from "react";
import { checkIfIsInArray } from "../utils/lib";
import PropTypes from "prop-types";
import data from "../data.json";

const BoardContext = React.createContext();

// as the app isn't big we can keep all the state in this context

const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(data.boards);
  const [activeBoard, setActiveBoard] = useState(
    boards.length > 0 ? boards[0] : null
  );
  const boardNames = boards?.map((board) => board.name);
  const activeBoardIndex = findBoardIndex(boards, activeBoard?.name);
  const findBoardByName = (name) => boards.find((board) => board.name === name);
  const returnActiveColumns = () => activeBoard?.columns;

  const updateBoardsState = (newBoards) => {
    setBoards(newBoards);
    setActiveBoard(newBoards?.length > 0 ? newBoards[0] : null);
  };

  function createNewBoard(name) {
    if (!checkIfIsInArray(boards, name)) {
      updateBoardsState([
        ...boards,
        {
          name,
          columns: [],
          isActive: false,
        },
      ]);
      return true;
    }
    return false;
  }

  function deleteActiveBoard() {
    const newBoards = [...boards];
    newBoards.splice(activeBoardIndex, 1);
    updateBoardsState(newBoards);
  }

  function createNewColumnInActiveBoard(columnName) {
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

    const activeBoard = boards[activeBoardIndex];
    const activeColumns = activeBoard.columns;
    const newBoard = [...boards];

    const currentColumnIndex = activeColumns.findIndex((column) =>
      column.tasks.some((task) => task.title === cardTitle)
    );

    const currentTaskInColumnIndex = activeColumns[
      currentColumnIndex
    ].tasks.findIndex((task) => task.title === cardTitle);

    const newColumnIndex = newStatus
      ? activeColumns.findIndex((column) => column.name === newStatus)
      : currentColumnIndex;

    newBoard[activeBoardIndex].columns[currentColumnIndex].tasks.splice(
      currentTaskInColumnIndex,
      1
    );
    newBoard[activeBoardIndex].columns[newColumnIndex].tasks.push(newTask);
    setBoards(newBoard);
  }

  function createTask(newTask) {
    const currentColumnIndex = activeBoard.columns.findIndex(
      (column) => column.name === newTask.status
    );
    const newBoard = [...boards];
    newBoard[activeBoardIndex].columns[currentColumnIndex].tasks.push(newTask);
    setBoards(newBoard);
  }

  function editBoard(name, columnsChecked) {
    const newBoard = [...boards];
    newBoard[activeBoardIndex].name = name;
    if (columnsChecked.length > 0) {
      newBoard[activeBoardIndex].columns = newBoard[
        activeBoardIndex
      ].columns.filter((column) => !columnsChecked.includes(column.name));
    }
    setBoards(newBoard);
  }

  function deleteTask(title, status) {
    const newBoard = [...boards];
    const columnIndex = newBoard[activeBoardIndex].columns.findIndex(
      (column) => column.name === status
    );
    const taskIndex = newBoard[activeBoardIndex].columns[
      columnIndex
    ].tasks.findIndex((task) => task.title === title);
    newBoard[activeBoardIndex].columns[columnIndex].tasks.splice(taskIndex, 1);
    setBoards(newBoard);
  }

  return (
    <BoardContext.Provider
      value={{
        activeBoard,
        setActiveBoard,
        boardNames,
        editBoard,
        deleteTask,
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
