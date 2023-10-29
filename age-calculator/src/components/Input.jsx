import PropTypes from "prop-types";

// Remove this line since PropTypes has already been imported above
// import PropTypes from 'prop-types';

export const Input = ({ label, type, id, placeholder, onChangeFn }) => {
  Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChangeFn: PropTypes.func.isRequired,
  };

  return (
    <div>
      <div>
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChangeFn(e.target.value)}
      />
    </div>
  );
};
