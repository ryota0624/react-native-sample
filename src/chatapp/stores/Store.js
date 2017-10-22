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
/**
 * Created by ryota on 2017/10/21.
 */
var eventemitter3_1 = require("eventemitter3");
var onChange = "onChange";
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(initialState) {
        var _this = _super.call(this) || this;
        _this.state = initialState;
        return _this;
    }
    Store.prototype.save = function (entity) {
        this.state.set(entity.id.value, entity);
        this.emitChange();
    };
    Store.prototype.deleteById = function (id) {
        this.state.delete(id.value);
        this.emitChange();
    };
    Store.prototype.findAll = function () {
        return Array.from(this.state.values());
    };
    Store.prototype.addChangeListener = function (fn) {
        this.addListener(onChange, fn);
    };
    Store.prototype.removeChangeListener = function (fn) {
        this.removeListener(onChange, fn);
    };
    Store.prototype.emitChange = function () {
        this.emit(onChange);
    };
    return Store;
}(eventemitter3_1.EventEmitter));
var UserStore = (function (_super) {
    __extends(UserStore, _super);
    function UserStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserStore;
}(Store));
exports.UserStore = UserStore;
var ApplicationContext = (function () {
    function ApplicationContext() {
    }
    ApplicationContext.prototype.loginUser = function (me) {
        this.me = me;
    };
    Object.defineProperty(ApplicationContext.prototype, "loginedUser", {
        get: function () {
            return this.me;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationContext.prototype.logout = function () {
        this.me = undefined;
    };
    return ApplicationContext;
}());
exports.ApplicationContext = ApplicationContext;
exports.applicationContext = new ApplicationContext();
var TalkStore = (function (_super) {
    __extends(TalkStore, _super);
    function TalkStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TalkStore;
}(Store));
exports.TalkStore = TalkStore;
