export const CREATE_TODO = "CREATE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const createTodoAction = todo => ({
  type: CREATE_TODO,
  payload: todo,
});

export const editTodoAction = value => ({
  type: EDIT_TODO,
  payload: value,
});

export const deleteTodoAction = id => ({
  type: EDIT_TODO,
  payload: id,
});
