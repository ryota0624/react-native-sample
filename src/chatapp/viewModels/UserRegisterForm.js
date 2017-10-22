"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validateion_1 = require("../validations/Validateion");
/**
 * Created by ryota on 2017/10/21.
 */
var UserRegisterForm = (function () {
    function UserRegisterForm(userId, password, imgUrl) {
        this.userId = userId;
        this.password = password;
        this.imgUrl = imgUrl;
        this.validateUserId = validateUserId(this.userId);
        this.validatePassword = validatePassword(this.password);
        this.validateImgUrl = validateUrl(this.imgUrl);
        this.validate = Validateion_1.and(this.validateUserId, this.validatePassword, this.validateImgUrl);
    }
    UserRegisterForm.prototype.copy = function (_a) {
        var _b = _a.userId, userId = _b === void 0 ? this.userId : _b, _c = _a.password, password = _c === void 0 ? this.password : _c, _d = _a.imgUrl, imgUrl = _d === void 0 ? this.imgUrl : _d;
        return new UserRegisterForm(userId, password, imgUrl);
    };
    UserRegisterForm.prototype.maskedPassword = function () {
        return maskedString(this.password);
    };
    return UserRegisterForm;
}());
UserRegisterForm.empty = new UserRegisterForm("", "", "");
exports.UserRegisterForm = UserRegisterForm;
function validateUserId(userId) {
    return Validateion_1.and(Validateion_1.Validation.require(userId.length > 0, ["too short"]));
}
exports.validateUserId = validateUserId;
function validateUserName(userName) {
    return Validateion_1.Validation.require(userName.length > 0, ["too short"]);
}
exports.validateUserName = validateUserName;
function validatePassword(password) {
    return Validateion_1.Validation.require(password.length > 0, ["too short"]);
}
exports.validatePassword = validatePassword;
function validateUrl(url) {
    return Validateion_1.Validation.require(url.length > 0, ["too short"]);
}
exports.validateUrl = validateUrl;
function maskedString(password) {
    return Array.from({ length: password.length }).map(function () { return "*"; }).join();
}
exports.maskedString = maskedString;
