"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var _a = require('react-router-native'), NativeRouter = _a.NativeRouter, Route = _a.Route, Router = _a.Router, rest = __rest(_a, ["NativeRouter", "Route", "Router"]);
var react_router_1 = require("react-router");
var StackRoute = require('react-router-native/experimental/StackRoute').default;
var ChatAppRoute;
(function (ChatAppRoute) {
    ChatAppRoute[ChatAppRoute["Users"] = 0] = "Users";
    ChatAppRoute[ChatAppRoute["ChatRoom"] = 1] = "ChatRoom";
})(ChatAppRoute = exports.ChatAppRoute || (exports.ChatAppRoute = {}));
exports.makeRoutes = function (routes) { return (<NativeRouter>
        <StackRoute path="/" isRoot={true} renderTitle={function () { return (<react_native_1.Text>chatApp</react_native_1.Text>); }} renderContent={function (props) {
    return (<react_router_1.Switch>
                                <Route path="/" render={routes.users}/>
                                <Route path="/login" render={routes.login}/>
                            </react_router_1.Switch>);
}}/>
    </NativeRouter>); };
