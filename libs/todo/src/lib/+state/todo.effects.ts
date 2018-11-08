import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoPartialState } from './todo.reducer';
import {
  LoadTodo,
  TodoLoaded,
  TodoLoadError,
  TodoActionTypes
} from './todo.actions';

@Injectable()
export class TodoEffects {
  @Effect()
  loadTodo$ = this.actions$.pipe(
    ofType(TodoActionTypes.LoadTodo),
    map((action: TodoActionTypes.LoadTodo) => {
      return new TodoLoaded([]);
    }),
    catchError((error, caught) => {
      return of(new TodoLoadError(caught));
    })
  );

  // @Effect()
  // loadTodo$ = this.dataPersistence.fetch(TodoActionTypes.LoadTodo, {
  //   run: (action: LoadTodo, state: TodoPartialState) => {
  //     // Your custom REST 'load' logic goes here. For now just return an empty list...
  //     return new TodoLoaded([]);
  //   },
  //
  //   onError: (action: LoadTodo, error) => {
  //     console.error('Error', error);
  //     return new TodoLoadError(error);
  //   }
  // });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TodoPartialState>
  ) {}
}
