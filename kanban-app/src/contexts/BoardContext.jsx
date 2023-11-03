import React, { useState } from "react";
import PropTypes from "prop-types";
import data from "../data.json";

const BoardContext = React.createContext();

const BoardProvider = ({ children }) => {
  const defaultActiveBoard = data.boards[0];
  const boardNames = data.boards.map((board) => board.name);

  const [activeBoard, setActiveBoard] = useState(defaultActiveBoard);

  function findBoardByName(name) {
    return data.boards.find((board) => board.name === name);
  }

  function returnActiveColumns() {
    return activeBoard.columns;
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
