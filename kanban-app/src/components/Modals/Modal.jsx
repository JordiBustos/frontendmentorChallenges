import {useRef} from 'react';
import PropTypes from 'prop-types';
import useEscapeKey from '../../hooks/useEscapeKey';
import useOutsideClick from '../../hooks/useOutsideKey';
import './modal.css';

const Modal = ({ children, isOpen, onClose, title, isBoardModal }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);
  useEscapeKey(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div ref={modalRef} className={`modal-content ${isBoardModal ? "board-modal-content" : ""}`}>
        <h2>{title}</h2>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isBoardModal: PropTypes.bool,
}

export default Modal;
