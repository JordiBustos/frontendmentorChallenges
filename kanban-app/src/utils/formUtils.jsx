function createTextInput(
  label,
  id,
  value,
  onChange,
  className = "",
  placeholder = ""
) {
  return (
    <div className={className === "column" ? className : ""}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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

function createNewSubtaskField(
  inputFields,
  handleInputChange,
  deleteSubtasks,
  subtaskPlaceholder
) {
  return inputFields.map((value, index) => (
    <div className="subtask-input-container" key={index}>
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(index, e.target.value)}
        placeholder={subtaskPlaceholder[index]}
      />
      <span onClick={(index) => deleteSubtasks(index)}>&times;</span>
    </div>
  ));
}

function createColumnsCheckboxes(columns, setColumnsCheked) {
  return columns.map((column) => {
    return (
      <span className="modal-checkbox-container" key={column.name}>
        <input
          onChange={(e) => {
            if (e.target.checked) {
              setColumnsCheked((prev) => [...prev, e.target.value]);
            } else {
              setColumnsCheked((prev) =>
                prev.filter((column) => column !== e.target.value)
              );
            }
          }}
          type="checkbox"
          id={column.name}
          name={column.name}
          value={column.name}
        />
        <label htmlFor={column.name}>{column.name}</label>
      </span>
    );
  });
}

export { createTextInput, createStatusDropdown, createNewSubtaskField, createColumnsCheckboxes };
