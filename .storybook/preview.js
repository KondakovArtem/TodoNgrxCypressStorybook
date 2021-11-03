import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { moduleMetadata } from "@storybook/angular";
import { RouterTestingModule } from "@angular/router/testing";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { StorybookHelperModule } from "storybook-ngrx-helper";

import { AppStoreModule } from "../src/app/store.module";
import docJson from "../documentation.json";

import { routes } from "../src/app/app-routing.module";

setCompodocJson(docJson);
initialize();

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
    ],
    providers: [
      { provide: "API_URL", useValue: `${window.location.origin}/api` },
    ],
  }),
];
