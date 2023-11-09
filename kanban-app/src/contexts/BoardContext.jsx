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

  function updateActiveBoard(newBoard, activeBoardIndex) {
    if (newBoard.length === boards.length) return activeBoardIndex;
    if (newBoard.length === 0) return null;
    if (activeBoardIndex === newBoard.length -1) return newBoard.length-1;
    else if (activeBoardIndex > 0) return activeBoardIndex-1;
    else return 0;
  }

  const updateBoardsState = (newBoards) => {
    setBoards(newBoards);
    const newActiveBoardIndex = updateActiveBoard(newBoards, activeBoardIndex);
    setActiveBoard(newBoards[newActiveBoardIndex]);
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
