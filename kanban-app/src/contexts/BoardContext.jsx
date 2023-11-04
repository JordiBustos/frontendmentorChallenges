import React, { useState } from "react";
import PropTypes from "prop-types";
import data from "../data.json";

const BoardContext = React.createContext();

const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(data.boards);
  const [activeBoard, setActiveBoard] = useState(boards[0]);
  const boardNames = boards.map((board) => board.name);

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

  function createNewColumnInActiveBoard(columnName) {
    const activeBoardIndex = boards.findIndex((board) => board.name === activeBoard.name);
  
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
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function checkIfIsInArray(array, name) {
  return array.some((element) => element.name.toLowerCase() === name.toLowerCase());
}

export { BoardContext, BoardProvider };
