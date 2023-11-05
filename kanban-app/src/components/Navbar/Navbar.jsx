import "./navbar.css";
import { useState, useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import NewTaskModal from "../Modals/NewTaskModal";

const Navbar = () => {
  const { activeBoard } = useContext(BoardContext);
  const [showModal, setShowModal] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>{activeBoard.name}</h1>
        <button onClick={() => setShowModal(true)} className="new-task-button">+Add New Task</button>
      </div>
      {showModal && (
        <NewTaskModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
