import {
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  CHANGE_FILTER,
  TOGGLE_ALL_COMPLETE,
  TOGGLE_COMPLETE_TODO,
  DELETE_ALL_COMPLETED,
} from "../actions";

export const initialState = JSON.parse(localStorage.getItem("myTodo")) || {
  list: [],
  filter: "all",
};

const todoReducer = (state = initialState, action) => {
  const { list } = state;
  const { payload, type } = action;

  switch (type) {
    case CREATE_TODO:
      return { ...state, list: list.concat(payload) };

    case EDIT_TODO:
      return {
        ...state,
        list: list.map(todo => {
          const { id, value } = payload;
          if (todo.id === id) {
            todo.value = value;
          }
          return todo;
        }),
      };

    case DELETE_TODO:
      return {
        ...state,
        list: list.filter(({ id }) => id !== payload.id),
      };

    case TOGGLE_COMPLETE_TODO:
      return {
        ...state,
        list: list.map(todo => {
          if (todo.id === payload.id) {
            todo.completed = !todo.completed;
          }
          return todo;
        }),
      };

    case TOGGLE_ALL_COMPLETE:
      return {
        ...state,
        list: list.map(todo => {
          todo.completed = payload.value;
          return todo;
        }),
      };

    case DELETE_ALL_COMPLETED:
      return {
        ...state,
        list: list.filter(todo => !todo.completed),
      };

    case CHANGE_FILTER:
      return { ...state, filter: payload.filter };

    default:
      return state;
  }
};

export default todoReducer;
