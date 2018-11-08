import { Action } from '@ngrx/store';
import { Entity } from './todo.reducer';

export enum TodoActionTypes {
  LoadTodo = '[Todo] Load Todo',
  TodoLoaded = '[Todo] Todo Loaded',
  TodoLoadError = '[Todo] Todo Load Error'
}

export class LoadTodo implements Action {
  readonly type = TodoActionTypes.LoadTodo;
}

export class TodoLoadError implements Action {
  readonly type = TodoActionTypes.TodoLoadError;
  constructor(public payload: any) {}
}

export class TodoLoaded implements Action {
  readonly type = TodoActionTypes.TodoLoaded;
  constructor(public payload: Entity[]) {}
}

export type TodoAction = LoadTodo | TodoLoaded | TodoLoadError;

export const fromTodoActions = {
  LoadTodo,
  TodoLoaded,
  TodoLoadError
};
