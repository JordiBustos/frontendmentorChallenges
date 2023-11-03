import "./App.css";
import Board from "./components/Board/Board";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { BoardProvider } from "./contexts/BoardContext";

function App() {
  return (
    <BoardProvider>
      <div className="main__container">
        <Sidebar />
        <div className="board-navbar__container">
          <Navbar />
          <Board />
        </div>
      </div>
    </BoardProvider>
  );
}

export default App;
