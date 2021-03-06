import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';

import { TodosModuleState } from '@todos/states';
import { deleteTodoRequest, updateTodoRequest } from '@todos/actions';
import { getVisibleTodos } from '@todos/selectors';
import { Todo } from '@todos/models';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.container.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListContainer {
    todos$: Observable<Todo[]>;
    checkField: FormControl;

    constructor(private store: Store<TodosModuleState>) {
        this.checkField = new FormControl(false);
        this.todos$ = this.store.pipe(select(getVisibleTodos));
    }

    onUpdate(update: Update<Todo>): void {
        const action = updateTodoRequest({ update });
        this.store.dispatch(action);
    }

    onDelete(id: number): void {
        const action = deleteTodoRequest({ id });
        this.store.dispatch(action);
    }
}
