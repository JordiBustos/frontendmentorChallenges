import "./navbar.css";
import { useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";

const Navbar = () => {
  const { activeBoard } = useContext(BoardContext);
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <h1>{activeBoard.name}</h1>
      </div>
    </nav>
  );
};

export default Navbar;
