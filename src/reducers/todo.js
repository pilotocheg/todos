import { CREATE_TODO, EDIT_TODO, DELETE_TODO } from "../actions/todo";

export const initialState = {
  list: [],
};

export const todoReducer = (state = initialState, action) => {
  const { list } = state;
  const { payload, type } = action;

  switch (type) {
    case CREATE_TODO:
      return { ...state, list: list.concat(payload) };

    case EDIT_TODO:
      return {
        ...state,
        list: list.map(task => {
          if (task.id === payload.id) {
            Object.assign(task, payload);
          }
          return task;
        }),
      };

    case DELETE_TODO:
      return { ...state, list: list.filter(({ id }) => id !== payload) };

    default:
      return state;
  }
};
