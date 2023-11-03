import "./App.css";
import Board from "./components/Board/Board";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

// replace for context
import data from "./data.json";

function App() {
  const activeBoard = data.boards[0];
  const boards = data.boards.map(board => board.name);
  return (
    <div className="main__container">
      <Sidebar boardNames={boards} />
      <div className="board-navbar__container">
        <Navbar />
        <Board board={activeBoard} />
      </div>
    </div>
  );
}

export default App;
