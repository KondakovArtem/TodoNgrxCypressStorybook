import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    @Input() countTodos: number;
    @Input() currentFilter: string;
}
