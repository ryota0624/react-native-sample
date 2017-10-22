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
var Store_1 = require("./Store");
var User_1 = require("../domains/User");
var react_native_1 = require("react-native");
var UserStoreOnAsyncStorage = (function (_super) {
    __extends(UserStoreOnAsyncStorage, _super);
    function UserStoreOnAsyncStorage() {
        var _this = _super.call(this, new Map()) || this;
        _this.storagePrefix = "userStorage";
        react_native_1.AsyncStorage.getAllKeys()
            .then(function (keys) { return Array.from(keys).filter(function (key) { return key.includes(_this.storagePrefix); }); })
            .then(function (keys) { return react_native_1.AsyncStorage.multiGet(keys); })
            .then(function (keyWithEntityArray) { return keyWithEntityArray.map(function (_a) {
            var _ = _a[0], entityJson = _a[1];
            return _this.stringToEntity(entityJson);
        }); })
            .then(function (entities) {
            _this.state = new Map(entities.map(function (entity) { return [entity.id.value, entity]; }));
            _this.emitChange();
        });
        return _this;
    }
    UserStoreOnAsyncStorage.prototype.stringToEntity = function (str) {
        var _a = JSON.parse(str), id = _a.id, password = _a.password, createdAt = _a.createdAt, imageUrl = _a.imageUrl;
        return new User_1.User(new User_1.UserId(id.value), new User_1.Password(password.value), new User_1.ImageUrl(imageUrl.value), new Date(createdAt.value));
    };
    UserStoreOnAsyncStorage.prototype.save = function (entity) {
        _super.prototype.save.call(this, entity);
        react_native_1.AsyncStorage.setItem(this.toIDString(entity.id), this.toStringEntity(entity));
    };
    UserStoreOnAsyncStorage.prototype.deleteById = function (userId) {
        _super.prototype.deleteById.call(this, userId);
        react_native_1.AsyncStorage.removeItem(this.toIDString(userId));
    };
    UserStoreOnAsyncStorage.prototype.toIDString = function (id) {
        return this.storagePrefix + "-" + id.value;
    };
    UserStoreOnAsyncStorage.prototype.toStringEntity = function (entity) {
        var plainJson = {
            id: entity.id,
            password: entity.password,
            createdAt: entity.createdAt,
            imageUrl: entity.imageUrl
        };
        return JSON.stringify(plainJson);
    };
    return UserStoreOnAsyncStorage;
}(Store_1.UserStore));
exports.UserStoreOnAsyncStorage = UserStoreOnAsyncStorage;
exports.userStoreOnAsyncStorage = new UserStoreOnAsyncStorage();
