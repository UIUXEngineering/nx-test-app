import { TodoAction, TodoActionTypes } from './todo.actions';

export const TODO_FEATURE_KEY = 'todo';

/**
 * Interface for the 'Todo' data used in
 *  - TodoState, and
 *  - todoReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface TodoState {
  list: Entity[]; // list of Todo; analogous to a sql normalized table
  selectedId?: string | number; // which Todo record has been selected
  loaded: boolean; // has the Todo list been loaded
  error?: any; // last none error (if any)
}

export interface TodoPartialState {
  readonly [TODO_FEATURE_KEY]: TodoState;
}

export const initialState: TodoState = {
  list: [],
  loaded: false
};

export function todoReducer(
  state: TodoState = initialState,
  action: TodoAction
): TodoState {
  switch (action.type) {
    case TodoActionTypes.TodoLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
