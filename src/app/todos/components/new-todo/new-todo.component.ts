import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CustomValidators } from '@utils/validators';

@Component({
    selector: 'app-new-todo',
    templateUrl: './new-todo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTodoComponent {
    textField: FormControl;

    @Output() saveTodo: EventEmitter<string> = new EventEmitter();

    constructor() {
        this.textField = new FormControl('', [Validators.required, CustomValidators.isBlank]);
    }

    addTodo(): void {
        if (this.textField.valid) {
            const text: string = this.textField.value;
            this.textField.setValue('', { emitEvent: false });
            this.saveTodo.emit(text);
        }
    }
}
