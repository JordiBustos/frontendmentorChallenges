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

  // create new board
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

  // delete board
  function filterBoard(boards, activeBoard) {
    const newBoards = boards.filter((b) => b.name !== activeBoard.name);
    return boards.length !== 0 ? Right(newBoards) : Left("No boards to delete");
  }

  function deleteActiveBoard() {
    filterBoard([...boards], activeBoard).fold(alert, updateBoardsState);
  }

  // create new column
  function newColumnHelper(boards, columnName) {
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

  function createNewColumnInActiveBoard(columnName) {
    if (activeBoardIndex !== -1) {
      newColumnHelper(boards, columnName)
        .map((boards) => putColumnInBoard(boards, activeBoardIndex, columnName))
        .fold(alert, updateBoardsState);
    }
  }

  // edit card
  function findColumnIndexByTaskTitle(columns, taskTitle) {
    const idx = columns.findIndex((column) =>
      column.tasks.some((task) => task.title === taskTitle)
    );
    return idx === -1 ? Left("Task not found") : Right(idx);
  }

  function moveTaskToNewColumn(
    boards,
    boardIndex,
    oldColumnIndex,
    newColumnIndex,
    newTask
  ) {
    const newBoard = [...boards];
    const oldColumn = newBoard[boardIndex].columns[oldColumnIndex];
    oldColumn.tasks = oldColumn.tasks.filter(
      (task) => task.title !== newTask.title
    );
    newBoard[boardIndex].columns[newColumnIndex].tasks.push(newTask);
    return newBoard;
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

    return Right(boards)
      .map((boards) => boards[activeBoardIndex])
      .map((activeBoard) => activeBoard.columns)
      .chain((activeColumns) =>
        findColumnIndexByTaskTitle(activeColumns, cardTitle).map(
          (oldColumnIndex) =>
            moveTaskToNewColumn(
              boards,
              activeBoardIndex,
              oldColumnIndex,
              activeColumns.findIndex((c) => c.name === newStatus),
              newTask
            )
        )
      )
      .fold(
        (error) => {
          console.error(error);
        },
        (result) => {
          updateBoardsState(result);
        }
      );
  }

  // create task
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

  function findColumnOfTask(columns, newTask) {
    return columns.findIndex((column) => column.name === newTask.status);
  }

  function createTaskInBoard(boards, activeBoardIndex, columnIndex, newTask) {
    const newBoard = [...boards];
    newBoard[activeBoardIndex].columns[columnIndex].tasks.push(newTask);
    return newBoard;
  }

  function createTask(newTask) {
    createTaskHelper(newTask, activeBoard)
      .map((activeBoard) => activeBoard.columns)
      .map((columns) => findColumnOfTask(columns, newTask))
      .map((columnIndex) =>
        createTaskInBoard(boards, activeBoardIndex, columnIndex, newTask)
      )
      .fold(alert, updateBoardsState);
  }

  // edit board
  function updateEditedBoard(boards, boardIndex, name, columns) {
    const newBoard = [...boards];
    newBoard[boardIndex].columns = columns;
    newBoard[boardIndex].name = name;
    return newBoard;
  }

  function filterColumnsByNames(columns, columnNames) {
    return columns.filter((column) => !columnNames.includes(column.name));
  }

  function editBoard(name, columnsChecked) {
    return Right(boards)
      .map((boards) => boards[activeBoardIndex])
      .map((activeBoard) => activeBoard.columns)
      .map((activeColumns) =>
        filterColumnsByNames(activeColumns, columnsChecked)
      )
      .map((filteredColumns) =>
        updateEditedBoard(boards, activeBoardIndex, name, filteredColumns)
      )
      .fold(
        () => {
          alert("Something went wrong");
        },
        (result) => {
          updateBoardsState(result);
        }
      );
  }

  // delete tasks
  function findColumnIndexByName(columns, name) {
    return Right(columns.findIndex((column) => column.name === name));
  }

  function updateColumnTasks(boards, boardIndex, columnIndex, newTasks) {
    const newBoards = [...boards];
    newBoards[boardIndex].columns[columnIndex].tasks = newTasks;
    return newBoards;
  }

  function deleteTask(title, status) {
    Right(boards)
      .map((boards) => boards[activeBoardIndex])
      .map((activeBoard) => activeBoard.columns)
      .chain((activeColumns) =>
        findColumnIndexByName(activeColumns, status).map((columnIndex) => [
          columnIndex,
          activeColumns[columnIndex].tasks.filter(
            (task) => task.title !== title
          ),
        ])
      )
      .map(([columnIndex, newTasks]) =>
        updateColumnTasks(boards, activeBoardIndex, columnIndex, newTasks)
      )
      .fold(
        () => {
          alert("Something went wrong");
        },
        (result) => {
          updateBoardsState(result);
        }
      );
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
