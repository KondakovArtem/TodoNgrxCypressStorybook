import { componentWrapperDecorator, moduleMetadata, Story, Meta } from '@storybook/angular';
import { TodosModule } from '@app/todos/todos.module';
import { rest } from 'msw';

import { Todo } from '@app/todos/models';
import { LayoutContainer } from './layout.container';
import { rests as todoRests } from '@/../cypress/fixtures/api/index.js';

export default {
    title: 'Containers/LayoutContainer',
    component: LayoutContainer,
    decorators: [
        moduleMetadata({
            imports: [TodosModule],
        }),

        componentWrapperDecorator(
            (story) => `
      <div class="story-container" routerInit="/">
        ${story}
      </div>`,
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

// 👇 Each story then reuses that template
export const BasicSimpleAnswer = Template.bind({});
Object.assign(BasicSimpleAnswer, {
    parameters: {
        msw: [
            rest.get('/api/todos', (req, res, ctx) => {
                return res(
                    ctx.delay(2000),
                    ctx.json([
                        {
                            id: 1,
                            completed: false,
                            title: 'Test1',
                        },
                        {
                            id: 2,
                            completed: true,
                            title: 'Test2',
                        },
                    ] as Todo[]),
                );
            }),
        ],
    },
});
