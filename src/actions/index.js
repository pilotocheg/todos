export const CREATE_TODO = "CREATE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_COMPLETE_TODO = "TOGGLE_COMPLETE_TODO";
export const TOGGLE_ALL_COMPLETE = "TOGGLE_ALL_COMPLETE";
export const DELETE_ALL_COMPLETED = "DELETE_ALL_COMPLETED";
export const CHANGE_FILTER = "CHANGE_FILTER";

/**
 * Redux action for creating a new todo item
 * @param {object} todo new todo's data
 */
export const createTodoAction = todo => ({
  type: CREATE_TODO,
  payload: todo,
});

/**
 * Redux action for edit an existing todo item
 * @param {object} data edited todo's data ({ id, value })
 */
export const editTodoAction = data => ({
  type: EDIT_TODO,
  payload: data,
});

/**
 * Redux action for delete todo item
 * @param {string|number} id todo's id
 */
export const deleteTodoAction = id => ({
  type: DELETE_TODO,
  payload: { id },
});

/**
 * Redux action for change filter of items list
 * @param {string} filter filter value ("all", "active", "completed")
 */
export const changeFilterAction = filter => ({
  type: CHANGE_FILTER,
  payload: { filter },
});

/**
 * Redux action for toggle todo's 'complete' button
 * @param {string|number} id todo's id
 */
export const toggleCompleteTodoAction = id => ({
  type: TOGGLE_COMPLETE_TODO,
  payload: { id },
});

/**
 * Redux action for make all todos completed or uncompleted
 * @param {boolean} value value for each todo
 */
export const toggleAllCompleteAction = value => ({
  type: TOGGLE_ALL_COMPLETE,
  payload: { value },
});

/**
 * Redux action for delete all completed todos
 */
export const deleteAllCompletedAction = () => ({
  type: DELETE_ALL_COMPLETED,
});
