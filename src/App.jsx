"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var UserManagement_1 = require("./chatapp/views/userManagement/UserManagement");
var asyncStorage_1 = require("./chatapp/stores/asyncStorage");
var UserService_1 = require("./chatapp/services/UserService");
var ErrorCacheView_1 = require("./chatapp/views/general/ErrorCacheView");
var Router_1 = require("./routing/Router");
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super.call(this) || this;
    }
    App.prototype.render = function () {
        var userRegisterService = new UserService_1.UserRegisterService(asyncStorage_1.userStoreOnAsyncStorage);
        var userDeleteService = new UserService_1.UserDeleteService(asyncStorage_1.userStoreOnAsyncStorage);
        return Router_1.makeRoutes({
            users: function (routingProps) { return ErrorCacheView_1.debugErrorView(function () { return <UserManagement_1.UserManagement userStore={asyncStorage_1.userStoreOnAsyncStorage} deleteService={userDeleteService} registerService={userRegisterService}/>; }, routingProps); },
        });
    };
    return App;
}(React.Component));
exports.default = App;
