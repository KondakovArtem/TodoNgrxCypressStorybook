import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TodosModuleState } from '@todos/states';
import { getTodo } from '@todos/selectors';
import { Todo } from '@todos/models';

@Component({
    selector: 'app-todo-detail',
    templateUrl: './todo-detail.container.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
// tslint:disable-next-line: component-class-suffix
export class TodoDetailContainer {
    todo$: Observable<Todo>;

    constructor(private store: Store<TodosModuleState>) {
        this.todo$ = this.store.pipe(
            select(getTodo),
            filter((todo) => todo !== null),
        );
    }
}
