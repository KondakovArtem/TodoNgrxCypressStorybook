import { componentWrapperDecorator, moduleMetadata } from "@storybook/angular";
import { Story, Meta } from "@storybook/angular/types-6-0";

import { TodosModule } from "@app/todos/todos.module";
import { TodoListContainer } from "./todo-list.container";
import { TodosModuleState } from "@app/todos/states";
import { rests as todoRests } from "@/../cypress/fixtures/api/index.js";

export default {
  title: "Containers/TodoListContainer",
  component: TodoListContainer,
  decorators: [
    moduleMetadata({
      imports: [TodosModule],
    }),

    componentWrapperDecorator(
      (story) => `
      <div class="story-container" [reduxInit]="redux">
        ${story}
      </div>`
    ),
  ],
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<TodoListContainer> = (props) => ({ props });

//👇 Each story then reuses that template
export const Basic = Template.bind({});
Object.assign(Basic, {
  args: {
    redux: {
      "todos-module": {
        todos: {
          entities: {
            "1": {
              completed: true,
              title: "Title",
              id: 1,
            },
            "2": {
              completed: false,
              title: "Done",
              id: 2,
            },
          },
          ids: ["1", "2"],
        },
      } as Partial<TodosModuleState>,
    },
  },
  parameters: {
    msw: [...todoRests],
  },
});
