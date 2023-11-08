import React, { useState } from "react";
import { checkIfIsInArray, Right, Left } from "../utils/lib";
import PropTypes from "prop-types";
import data from "../data.json";

const BoardContext = React.createContext();

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

  function filterBoard(boards, activeBoard) {
    const newBoards = boards.filter((b) => b.name !== activeBoard.name);
    return boards.length !== 0 ? Right(newBoards) : Left("No boards to delete");
  }

  function deleteActiveBoard() {
    filterBoard([...boards], activeBoard).fold(alert, updateBoardsState);
  }

  function newColumnHelper(boards, columnName) {
    return !checkIfIsInArray(boards[activeBoardIndex].columns, columnName)
      ? Right(boards)
      : Left("A column with the same name already exists");
  }

  function createNewColumnInActiveBoard(columnName) {
    if (activeBoardIndex !== -1) {
      newColumnHelper(boards, columnName)
        .map((boards) => {
          const newBoard = [...boards];
          newBoard[activeBoardIndex].columns.push({
            name: columnName,
            tasks: [],
          });
          return newBoard;
        })
        .fold(alert, updateBoardsState);
    }
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

    Right(boards)
      .map((boards) => boards[activeBoardIndex])
      .map((activeBoard) => activeBoard.columns)
      .map((activeColumns) =>
        activeColumns.findIndex((column) =>
          column.tasks.some((task) => task.title === cardTitle)
        )
      )
      .map((columnOfTaskIndex) => {
        const filteredTasks = boards[activeBoardIndex].columns[
          columnOfTaskIndex
        ].tasks.filter((task) => task.title !== cardTitle);
        const newBoard = [...boards];
        newBoard[activeBoardIndex].columns[columnOfTaskIndex].tasks =
          filteredTasks;
        return newBoard;
      })
      .map((board) => {
        board[activeBoardIndex].columns[
          activeBoard.columns.findIndex((c) => c.name === newStatus)
        ].tasks.push(newTask);
        return board;
      })
      .fold(null, updateBoardsState);
  }

  function createTaskHelper(newTask, activeBoard) {
    return activeBoard.columns
      .flatMap((column) => column.tasks)
      .some((task) => {
        if (task.title === newTask.title) {
          return true;
        }
        return false;
      })
      ? Left("There is already a card with this name")
      : Right(activeBoard);
  }

  function createTask(newTask) {
    createTaskHelper(newTask, activeBoard)
      .map((activeBoard) => activeBoard.columns)
      .map((columns) =>
        columns.findIndex((column) => column.name === newTask.status)
      )
      .map((columnIndex) => {
        const newBoard = [...boards];
        newBoard[activeBoardIndex].columns[columnIndex].tasks.push(newTask);
        return newBoard;
      })
      .fold(alert, updateBoardsState);
  }

  function editBoard(name, columnsChecked) {
    Right(boards)
      .map((boards) => boards[activeBoardIndex])
      .map((activeBoard) => activeBoard.columns)
      .map((activeColumns) =>
        activeColumns.filter((column) => !columnsChecked.includes(column.name))
      )
      .map((filteredColum) => {
        const newBoard = [...boards];
        newBoard[activeBoardIndex].columns = filteredColum;
        newBoard[activeBoardIndex].name = name;
        return newBoard;
      })
      .fold(null, updateBoardsState);
  }

  function deleteTask(title, status) {
    Right(boards)
      .map((boards) => boards[activeBoardIndex])
      .map((activeBoard) => activeBoard.columns)
      .map((activeColumns) =>
        activeColumns.findIndex((column) => column.name === status)
      )
      .map((columnIndex) => {
        return [
          columnIndex,
          boards[activeBoardIndex].columns[columnIndex].tasks.filter(
            (task) => task.title !== title
          ),
        ];
      })
      .map((indexAndFilteredTasks) => {
        const newBoard = [...boards];
        newBoard[activeBoardIndex].columns[indexAndFilteredTasks[0]].tasks =
          indexAndFilteredTasks[1];
        return newBoard;
      })
      .fold(null, updateBoardsState);
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
