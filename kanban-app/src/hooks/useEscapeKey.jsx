import { useEffect } from "react";

function useEscapeKey(isOpen, onClose) {
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);
}

export default useEscapeKey;