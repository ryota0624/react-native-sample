"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by ryota on 2017/10/21.
 */
var Validation = (function () {
    function Validation(messages) {
        if (messages === void 0) { messages = []; }
        this.messages = messages;
    }
    Validation.prototype.isSuccess = function () {
        return this.messages.length === 0;
    };
    Validation.prototype.hasError = function () {
        return !this.isSuccess();
    };
    Validation.require = function (bool, messages) {
        if (bool) {
            return exports.ValidationSuccess;
        }
        else {
            return new Validation(messages);
        }
    };
    return Validation;
}());
exports.Validation = Validation;
function and() {
    var validations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        validations[_i] = arguments[_i];
    }
    return new Validation(validations.reduce(function (p, c) { return p.concat(c.messages); }, []));
}
exports.and = and;
exports.ValidationSuccess = new Validation([]);
