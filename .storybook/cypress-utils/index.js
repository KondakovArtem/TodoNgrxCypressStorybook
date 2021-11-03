"use strict";
exports.__esModule = true;
exports.createCommands = void 0;
require("cypress-wait-until");
var utils_1 = require("./utils");
function createCommands() {
  var requests = {};
  // let worker: SetupWorkerApi;
  var routes = new Set();
  var registerRequest = function (request) {
    var _a;
    var key =
      (_a = utils_1.requestKey(routes, request)) !== null && _a !== void 0
        ? _a
        : utils_1.makeUniqueKey(request);
    if (!requests[key]) {
      requests[key] = { complete: false, calls: [] };
    }
    requests[key].complete = false;
    requests[key].calls.push({
      id: request.id,
      request: request,
      complete: false,
    });
  };
  var completeRequest = function (request) {
    var key = utils_1.requestKey(routes, request);
    if (!key || !requests[key]) {
      return;
    }
    requests[key].complete = true;
    var call = requests[key].calls.find(function (r) {
      return r.id === request.id;
    });
    if (!call) {
      return;
    }
    call.complete = true;
  };

  let mswWorker;

  Object.defineProperty(window.parent, "mswWorker", {
    set: (value) => {

      mswWorker = value;
      if (mswWorker) {
        mswWorker.events.on("request:start", (request) => {
          registerRequest(request);
        });
        mswWorker.events.on("request:end", (request) => {
          completeRequest(request);
        });
      }
    },
    get: () => {
      return mswWorker;
    },
    configurable: true,
  });

  // before(() => {
  // cy.waitUntil(function () { return cy.window().then(function (win) { return !!win.mswWorker; }); }).then(function () {
  //     debugger;
  //     window.mswWorker.events.on("request:start", function (request) {
  //         registerRequest(request);
  //     });
  //     window.mswWorker.on("request:end", function (request) {
  //         completeRequest(request);
  //     });
  // });
  // cy.wrap(
  //   worker.start({
  //     serviceWorker: {
  //       url: serviceWorkerPath,
  //     },
  //   }),
  //   { log: false, timeout: beforeTimeout }
  // );
  // });
  // const Cypress = (window as any).Cypress;
  Cypress.on("test:before:run", function () {
    if (!window.mswWorker) {
      return;
    }
    window.resetHandlers();
    requests = {};
    routes = new Set();
  });
  Cypress.Commands.add(
    "mswRestIntercept",
    function restIntercept(type, route, fn) {
      var key = type + ":" + route;
      // if (fn) {
      //   const restMethod = type.toLowerCase() as LowercasedRestMethod;
      //   worker.use(rest[restMethod](route, fn));
      // }
      routes.add(key);
      return cy.wrap(key, { log: false });
    }
  );
  Cypress.Commands.add(
    "mswGraphqlIntercept",
    function graphqlIntercept(operation, operationName, fn) {
      var key = operation + ":" + operationName;
      // if (fn) {
      //   worker.use(graphql[operation](operationName, fn));
      // }
      routes.add(key);
      return cy.wrap(key, { log: false });
    }
  );
  Cypress.Commands.add("mswWait", function (alias) {
    cy.get(alias, { log: false }).then(function (key) {
      Cypress.log({
        displayName: "mswWait",
        message: alias + " \u2014 " + key.replace(":", " "),
      });
      cy.waitUntil(
        function () {
          return requests[key] && requests[key].complete;
        },
        {
          log: false,
        }
      ).then(function () {
        var calls = requests[key].calls;
        cy.wrap(calls[calls.length - 1], { log: false });
      });
    });
  });
}
exports.createCommands = createCommands;
