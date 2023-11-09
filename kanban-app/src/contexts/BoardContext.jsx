import React, { useState } from "react";
import PropTypes from "prop-types";
import data from "../data.json";

const BoardContext = React.createContext();

const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(data.boards);
  const [activeBoard, setActiveBoard] = useState(
    boards.length > 0 ? boards[0] : null
  );
  const boardNames = boards?.map((board) => board.name);
  const findBoardIndex = (boards, name) =>
    boards.findIndex((board) => board.name === name);
  const activeBoardIndex = findBoardIndex(boards, activeBoard?.name);
  const findBoardByName = (name) => boards.find((board) => board.name === name);
  const returnActiveColumns = () => activeBoard?.columns;

  const updateBoardsState = (newBoards) => {
    setBoards(newBoards);
    setActiveBoard(newBoards?.length > 0 ? newBoards[0] : null);
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        activeBoard,
        setActiveBoard,
        activeBoardIndex,
        updateBoardsState,
        boardNames,
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
