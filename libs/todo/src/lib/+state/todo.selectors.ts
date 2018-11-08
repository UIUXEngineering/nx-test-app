import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

// Lookup the 'Todo' feature state managed by NgRx
const getTodoState = createFeatureSelector<TodoState>('todo');

const getLoaded = createSelector(
  getTodoState,
  (state: TodoState) => state.loaded
);
const getError = createSelector(
  getTodoState,
  (state: TodoState) => state.error
);

const getAllTodo = createSelector(
  getTodoState,
  getLoaded,
  (state: TodoState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getTodoState,
  (state: TodoState) => state.selectedId
);
const getSelectedTodo = createSelector(
  getAllTodo,
  getSelectedId,
  (todo, id) => {
    const result = todo.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const todoQuery = {
  getLoaded,
  getError,
  getAllTodo,
  getSelectedTodo
};
