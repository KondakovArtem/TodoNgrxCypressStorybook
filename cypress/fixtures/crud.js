import { rest } from "msw";
import get from "lodash/get";

export function createCRUDRests({
  STORE_GET,
  STORE_SET,
  GET_LIST,
  POST,
  PUT,
  DELETE,
  PATCH,
  DELAY = 500,
}) {
  const result = [];
  if (PATCH) {
    if (typeof PATCH === "string") PATCH = { url: PATCH };
    const { uidName = "id", uidPath, dataFn, url } = PATCH;
    const fn = dataFn
      ? dataFn
      : (req, res, ctx) => {
          const data = STORE_GET();
          const uid = uidPath ? get(req, uidPath) : req.body[uidName];
          STORE_SET(
            data.map((item) =>
              item[uidName] === uid ? { ...item, ...req.body } : item
            )
          );
          return res(ctx.delay(DELAY), ctx.json({}));
        };
    result.push(rest.patch(url, fn));
  }
  if (PUT) {
    if (typeof PUT === "string") PUT = { url: PUT };
    const { uidName = "id", uidPath, dataFn, url } = PUT;
    const fn = dataFn
      ? dataFn
      : (req, res, ctx) => {
          const data = STORE_GET();
          const uid = uidPath ? get(req, uidPath) : req.body[uidName];
          STORE_SET(
            data.map((item) =>
              item[uidName] === uid ? { ...item, ...req.body } : item
            )
          );
          return res(ctx.delay(DELAY), ctx.json({}));
        };
    result.push(rest.put(url, fn));
  }
  if (GET_LIST) {
    if (typeof GET_LIST === "string") GET_LIST = { url: GET_LIST };
    const { dataFn, url, preProcessor = (i) => i } = GET_LIST;
    const fn = dataFn
      ? dataFn
      : (req, res, ctx) =>
          res(
            ctx.delay(DELAY),
            ctx.json(STORE_GET().map((i) => preProcessor(i)))
          );
    result.push(rest.get(url, fn));
  }
  if (POST) {
    if (typeof POST === "string") POST = { url: POST };
    const { uidName = "id", dataFn, url } = POST;
    const fn = dataFn
      ? dataFn
      : (req, res, ctx) => {
          const data = STORE_GET();
          const newItem = {
            ...req.body,
            [uidName]: `${Math.random()}`,
          };
          data.push(newItem);
          STORE_SET(data);
          return res(ctx.delay(DELAY), ctx.json(newItem));
        };

    result.push(rest.post(url, fn));
  }

  if (DELETE) {
    if (typeof DELETE === "string") DELETE = { url: DELETE };
    const { url, dataFn, uidName = "id", uidPath } = DELETE;
    const fn = dataFn
      ? dataFn
      : (req, res, ctx) => {
          const data = STORE_GET();
          const uid = uidPath ? get(req, uidPath) : req.params[uidName];
          STORE_SET(data.filter((item) => item[uidName] !== uid));
          return res(ctx.delay(DELAY), ctx.json({}));
        };
    result.push(rest.delete(url, fn));
  }
  return result;
}
