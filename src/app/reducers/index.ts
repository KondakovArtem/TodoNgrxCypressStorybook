import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

import { metaReducers as envMetaReducers } from "@environments/environment";
import { RouterStateUrl } from "./custom-route-serializer";

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

export const metaReducers = envMetaReducers;

export const getRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>("router");
