import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  Entity,
  initialState,
  TodoFacade,
  todoReducer,
  TodoState,
  TODO_FEATURE_KEY,
  TodoLoaded
} from '@ngrx7/todo';
import { AppComponent } from './app.component';

interface TestSchema {
  todo: TodoState;
}

describe('AppComponent', () => {

  let facade: TodoFacade;
  let store: Store<TestSchema>;
  let createTodo;

  beforeEach(( done ) => {
    createTodo = ( id: string, name = '' ): Entity => ({
      id,
      name: name || `name-${id}`
    });

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(TODO_FEATURE_KEY, todoReducer, { initialState })
        // EffectsModule.forFeature([TodoEffects]) // Do not load features
      ],
      providers: [ TodoFacade ],
      declarations: [ AppComponent ]
    }).compileComponents().then(() => {
      facade = TestBed.get(TodoFacade);
      store = TestBed.get(Store);
      spyOn(store, 'dispatch').and.callThrough();
      done();
    });

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to my-app!'
    );
  });

  it('should get todo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    store.dispatch(new TodoLoaded([ createTodo('AAA'), createTodo('BBB') ]));
    console.log(comp.todoResult);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to my-app!'
    );

    expect(comp.todoResult).toEqual([
      { id: 'AAA', name: 'name-AAA' },
      { id: 'BBB', name: 'name-BBB' } ]);
  });
});
