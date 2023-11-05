function computeSubtasksCompleted(subtasks) {
  return subtasks.filter((subtask) => subtask.isCompleted).length;
}

export {
  computeSubtasksCompleted,
}