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
var Store_1 = require("../stores/Store");
var User_1 = require("../domains/User");
var Validateion_1 = require("../validations/Validateion");
/**
 * Created by ryota on 2017/10/22.
 */
var Service = (function () {
    function Service() {
        this.applicationContext = Store_1.applicationContext;
    }
    Service.prototype.start = function (input) {
        try {
            var validationResult = this.validation(input);
            if (validationResult.hasError()) {
                throw new Error(validationResult.messages.join("\n"));
            }
            this.execute(input);
        }
        catch (e) {
            return e;
        }
    };
    return Service;
}());
exports.Service = Service;
var UserRegisterService = (function (_super) {
    __extends(UserRegisterService, _super);
    function UserRegisterService(userStore) {
        var _this = _super.call(this) || this;
        _this.userStore = userStore;
        return _this;
    }
    UserRegisterService.prototype.validation = function (input) {
        return this.existDuplicateIdValidate(input.userId);
    };
    UserRegisterService.prototype.execute = function (_a) {
        var userId = _a.userId, password = _a.password, imgUrl = _a.imgUrl;
        var user = new User_1.User(new User_1.UserId(userId), new User_1.Password(password), new User_1.ImageUrl(imgUrl), new Date());
        this.userStore.save(user);
    };
    UserRegisterService.prototype.existDuplicateIdValidate = function (userId) {
        var existUser = this.userStore.findAll().some(function (user) { return user.id.value === userId; });
        return Validateion_1.Validation.require(!existUser, ["same id is already"]);
    };
    return UserRegisterService;
}(Service));
exports.UserRegisterService = UserRegisterService;
var UserDeleteService = (function (_super) {
    __extends(UserDeleteService, _super);
    function UserDeleteService(userStore) {
        var _this = _super.call(this) || this;
        _this.userStore = userStore;
        return _this;
    }
    UserDeleteService.prototype.validation = function (userId) {
        return Validateion_1.ValidationSuccess;
    };
    UserDeleteService.prototype.execute = function (userId) {
        this.userStore.deleteById(userId);
    };
    return UserDeleteService;
}(Service));
exports.UserDeleteService = UserDeleteService;
var UserLoginService = (function (_super) {
    __extends(UserLoginService, _super);
    function UserLoginService(userStore) {
        var _this = _super.call(this) || this;
        _this.userStore = userStore;
        return _this;
    }
    UserLoginService.prototype.validation = function (_) {
        return Validateion_1.ValidationSuccess;
    };
    UserLoginService.prototype.execute = function (_a) {
        var userId = _a.userId, password = _a.password;
        var me = this.userStore.findAll().find(function (user) { return user.id.value === userId.value; });
        if (!me) {
            throw new Error("cant found user");
        }
        if (!password.equals(me.password)) {
            throw new Error("no match userId or password");
        }
        this.applicationContext.loginUser(me);
    };
    return UserLoginService;
}(Service));
exports.UserLoginService = UserLoginService;
