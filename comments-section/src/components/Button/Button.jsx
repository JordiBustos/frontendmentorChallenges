import PropTypes from "prop-types";
import "./button.css";

const Button = ({
  onClick,
  type,
  className,
  disabled,
  children,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`button ${className || ""}`}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
};

export default Button;
