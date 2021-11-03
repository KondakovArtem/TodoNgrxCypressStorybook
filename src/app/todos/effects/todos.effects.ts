import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap } from "rxjs/operators";

import {
  loadTodos,
  loadTodosRequest,
  loadTodosSuccess,
  loadTodosFail,
  addTodo,
  addTodoRequest,
  addTodoSuccess,
  addTodoFail,
  updateTodo,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFail,
  deleteTodo,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFail,
} from "@todos/actions";

import { TodosService } from "@todos/services/todos.service";

@Injectable()
export class TodosEffects {
  loadTodosRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodosRequest),
      switchMap(() => {
        return this.todosService.getAllTodos().pipe(
          mergeMap((todos) => [loadTodos({ todos }), loadTodosSuccess()]),
          catchError((error) => of(loadTodosFail({ error })))
        );
      })
    )
  );

  addTodoRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodoRequest),
      switchMap((action) => {
        return this.todosService.createTodo(action.todo).pipe(
          mergeMap((newTodo) => [addTodo({ todo: newTodo }), addTodoSuccess()]),
          catchError((error) => of(addTodoFail({ error })))
        );
      })
    )
  );

  updateTodoRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodoRequest),
      switchMap((action) => {
        const { update } = action;
        return this.todosService
          .updateTodo({
            ...update.changes,
            id: update.id as number,
          })
          .pipe(
            mergeMap(() => [updateTodo({ update }), updateTodoSuccess()]),
            catchError((error) => of(updateTodoFail({ error })))
          );
      })
    )
  );

  deleteTodoRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodoRequest),
      switchMap((action) => {
        const id = action.id;
        return this.todosService.deleteTodo(id).pipe(
          mergeMap(() => [deleteTodo({ id }), deleteTodoSuccess()]),
          catchError((error) => of(deleteTodoFail({ error })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private todosService: TodosService) {}
}
