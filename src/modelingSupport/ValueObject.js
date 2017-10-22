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
var Value = (function () {
    function Value(value) {
        this.value = value;
    }
    Value.prototype.get = function () {
        return this.value;
    };
    Value.prototype.equals = function (other) {
        return other.value === this.value;
    };
    return Value;
}());
exports.Value = Value;
var StringValue = (function (_super) {
    __extends(StringValue, _super);
    function StringValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StringValue;
}(Value));
exports.StringValue = StringValue;
var NumberValue = (function (_super) {
    __extends(NumberValue, _super);
    function NumberValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NumberValue;
}(Value));
exports.NumberValue = NumberValue;
var BoolValue = (function (_super) {
    __extends(BoolValue, _super);
    function BoolValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BoolValue;
}(Value));
exports.BoolValue = BoolValue;
function valueObject(defaultValue) {
    var Klass = ((function () {
        function class_1(args) {
            var _this = this;
            Object.keys(args).forEach(function (key) {
                (_this[key]) = args[key];
            });
        }
        class_1.prototype.copy = function (args) {
            var instance = new Klass(Object.assign({}, this, args));
            instance.__proto__ = this.__proto__;
            return instance;
        };
        return class_1;
    }()));
    return Klass;
}
exports.valueObject = valueObject;
