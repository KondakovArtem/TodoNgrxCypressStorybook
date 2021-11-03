import { initialize, mswDecorator } from "msw-storybook-addon";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { moduleMetadata } from "@storybook/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { AppStoreModule } from "../src/app/store.module";
import docJson from "../documentation.json";

import { StorybookHelperModule } from "storybook-ngrx-helper";
import { routes } from "../src/app/app-routing.module";
import { RoouterInitModule } from "../src/stories/directives/init-router.directive";
// import { createCommands } from "./cypress-utils";

setCompodocJson(docJson);

window.parent.mswWorker = initialize();
// if (window.Cypress) {
//   const {createCommands} = require('./cypress-utils');
//   createCommands(window.mswWorker);
// }

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
};

export const decorators = [
  mswDecorator,

  moduleMetadata({
    imports: [
      BrowserAnimationsModule,
      AppStoreModule,
      HttpClientModule,
      RouterTestingModule.withRoutes(routes),
      StorybookHelperModule,
      RoouterInitModule,
    ],
    providers: [
      { provide: "API_URL", useValue: `${window.location.origin}/api` },
    ],
  }),
];
