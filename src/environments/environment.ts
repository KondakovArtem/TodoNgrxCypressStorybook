import type { MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { metaReducerForStorybook } from 'storybook-ngrx-helper';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    api: 'https://jsonplaceholder.typicode.com',
};

export const metaReducers: MetaReducer[] = [
    metaReducerForStorybook,
    ((reducer) => storeLogger({ collapsed: true })(reducer)) as MetaReducer,
];
