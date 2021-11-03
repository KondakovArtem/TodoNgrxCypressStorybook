"use strict";
exports.__esModule = true;
exports.makeUniqueKey = exports.requestKey = exports.getGraphqlQueryInfo = exports.isGraphqlRequest = void 0;
var graphql_1 = require("graphql");
var node_match_path_1 = require("node-match-path");
var isGraphqlRequest = function (request) {
    var body = request.body;
    if (!body || typeof body === "string") {
        return false;
    }
    return request.method === "POST" && "variables" in body && "query" in body;
};
exports.isGraphqlRequest = isGraphqlRequest;
var getGraphqlQueryInfo = function (request) {
    var _a;
    var queryMetadata = graphql_1.parse((_a = request.body) === null || _a === void 0 ? void 0 : _a.query);
    var queryDefinition = queryMetadata.definitions[0];
    if (!queryDefinition ||
        queryDefinition.kind !== "OperationDefinition" ||
        !queryDefinition.name) {
        return null;
    }
    var operation = queryDefinition.operation, operationName = queryDefinition.name.value;
    return { operation: operation, operationName: operationName };
};
exports.getGraphqlQueryInfo = getGraphqlQueryInfo;
var requestKey = function (routes, request) {
    return Array.from(routes).find(function (r) {
        var _a = r.split(/:(.+)/), type = _a[0], routeOrOperation = _a[1];
        if (exports.isGraphqlRequest(request)) {
            var metadata = exports.getGraphqlQueryInfo(request);
            if (!metadata) {
                return false;
            }
            var operation = metadata.operation, operationName = metadata.operationName;
            return operation === type && operationName === routeOrOperation;
        }
        var routeMatched = node_match_path_1.match(routeOrOperation, request.url.pathname);
        return request.method === type && routeMatched.matches;
    });
};
exports.requestKey = requestKey;
var makeUniqueKey = function (request) {
    if (exports.isGraphqlRequest(request)) {
        var metadata = exports.getGraphqlQueryInfo(request);
        if (metadata) {
            return metadata.operation + ":" + metadata.operationName;
        }
    }
    return request.method + ":" + request.url.toString();
};
exports.makeUniqueKey = makeUniqueKey;
