import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { TodoPartialState } from './todo.reducer';
import { todoQuery } from './todo.selectors';
import { LoadTodo } from './todo.actions';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade {
  loaded$ = this.store.pipe(select(todoQuery.getLoaded));
  allTodo$ = this.store.pipe(select(todoQuery.getAllTodo));
  selectedTodo$ = this.store.pipe(select(todoQuery.getSelectedTodo));

  constructor(private store: Store<TodoPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadTodo());
  }
}
