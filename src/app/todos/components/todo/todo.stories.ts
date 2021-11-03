import { componentWrapperDecorator, moduleMetadata } from "@storybook/angular";
import { Story, Meta } from "@storybook/angular/types-6-0";

import { TodoComponent } from "./todo.component";
import { TodosModule } from "@app/todos/todos.module";

export default {
  title: "Components/TodoComponent",
  component: TodoComponent,
  decorators: [
    moduleMetadata({
      imports: [TodosModule],
    }),

    componentWrapperDecorator(
      () => `
      <div class="story-container">
        <div class="todo-list">
          <app-todo 
            [todo]="data"
            (update)="update($event)"
            (delete)="delete($event)"
          ></app-todo>
        </div>
      </div>`
    ),
  ],
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<TodoComponent> = (props) => ({ props });

//👇 Each story then reuses that template
export const Basic = Template.bind({});
Basic.args = {
  data: {
    id: 1,
    title: "Test",
    completed: false,
  },
};
