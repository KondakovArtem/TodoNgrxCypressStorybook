import {
  componentWrapperDecorator,
  moduleMetadata,
  Story,
  Meta,
} from "@storybook/angular";
import { TodosModule } from "@app/todos/todos.module";
import { LayoutContainer } from "./layout.container";
import { rests as todoRests } from "@/../cypress/fixtures/api/index.js";

export default {
  title: "Containers/LayoutContainer",
  component: LayoutContainer,
  decorators: [
    moduleMetadata({
      imports: [TodosModule],
    }),

    componentWrapperDecorator(
      (story) => `
      <div class="story-container" routerInit="/">
        ${story}
      </div>`
    ),
  ],
} as Meta;

// 👇 We create a “template” of how args map to rendering
const Template: Story<LayoutContainer> = (props) => ({ props });

// 👇 Each story then reuses that template
export const Basic = Template.bind({});
Object.assign(Basic, {
  parameters: {
    msw: [...todoRests],
  },
});
