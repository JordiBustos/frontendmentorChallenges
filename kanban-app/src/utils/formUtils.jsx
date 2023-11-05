function createTextInput(label, id, value, onChange, className = "") {
  return (
    <div className={className === "column" ? className : ""}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function createStatusDropdown(currentStatus, setCurrentStatus, options) {
  return (
    <div className="modal-select-container">
      <label htmlFor="status">Status</label>
      <select
        id="status"
        className="status-card-select"
        name="status"
        value={currentStatus}
        onChange={(e) => setCurrentStatus(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export { createTextInput, createStatusDropdown };
