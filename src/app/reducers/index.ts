import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
} from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { storeLogger } from "ngrx-store-logger";
import { metaReducerForStorybook } from "storybook-ngrx-helper";

import { RouterStateUrl } from "./custom-route-serializer";
import { environment } from "@environments/environment";

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [
      metaReducerForStorybook,
      (reducer: ActionReducer<any>) =>
        storeLogger({ collapsed: true })(reducer),
    ]
  : [];

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>("router");
