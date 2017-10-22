"use strict";
/**
 * Created by ryota on 2017/10/21.
 */
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
var ValueObject_1 = require("../../modelingSupport/ValueObject");
var UserId = (function (_super) {
    __extends(UserId, _super);
    function UserId() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserId;
}(ValueObject_1.StringValue));
exports.UserId = UserId;
var Password = (function (_super) {
    __extends(Password, _super);
    function Password() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Password;
}(ValueObject_1.StringValue));
exports.Password = Password;
var ImageUrl = (function (_super) {
    __extends(ImageUrl, _super);
    function ImageUrl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImageUrl;
}(ValueObject_1.StringValue));
exports.ImageUrl = ImageUrl;
var User = (function () {
    function User(id, password, imageUrl, createdAt) {
        this.id = id;
        this.password = password;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }
    return User;
}());
exports.User = User;
