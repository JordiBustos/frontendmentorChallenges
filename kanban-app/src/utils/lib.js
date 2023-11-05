function computeSubtasksCompleted(subtasks) {
  return subtasks.filter((subtask) => subtask.isCompleted).length;
}

function checkIfIsInArray(array, name) {
  return array.some(
    (element) => element.name.toLowerCase() === name.toLowerCase()
  );
}

export { computeSubtasksCompleted, checkIfIsInArray };
