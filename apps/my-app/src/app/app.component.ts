import { Component, OnDestroy, OnInit } from '@angular/core';
import { Entity, TodoFacade } from '@ngrx7/todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'scwx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-app';
  todoSub: Subscription = Subscription.EMPTY;
  todoResult: Entity;

  constructor(
    private facade: TodoFacade,
  ) {}

  ngOnInit(): void {
    this.todoSub = this.facade.allTodo$
      .subscribe((r: Entity) => {
        this.todoResult = r;
      })
  }

  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
  }
}
