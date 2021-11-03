import { createCRUDRests } from "../crud";
import cloneDeep from "lodash/cloneDeep";

import todos from "./todos.json";

export const data = {
  todos,
};

const store = {
  todos: cloneDeep(todos),
};

export const rests = [
  ...createCRUDRests({
    STORE_GET: () => store.todos,
    STORE_SET: (value) => (store.todos = value),
    GET_LIST: "/api/todos",
    PATCH: "/api/todos/:id",
    DELETE: "/api/todos/:id",
    POST: "/api/todos",
  }),
];
