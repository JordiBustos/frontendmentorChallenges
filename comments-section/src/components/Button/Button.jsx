import PropTypes from "prop-types";

const Button = ({ onClick, type, className, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`button ${className || ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
