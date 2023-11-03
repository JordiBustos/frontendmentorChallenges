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
    setBoards([...boards, newBoard]);
    setActiveBoard(newBoard);
  }

  return (
    <BoardContext.Provider
      value={{
        activeBoard,
        setActiveBoard,
        boardNames,
        data,
        returnActiveColumns,
        findBoardByName,
        createNewBoard
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { BoardContext, BoardProvider };
