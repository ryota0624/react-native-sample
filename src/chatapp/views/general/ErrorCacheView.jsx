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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var ErrorCacheComponent = (function (_super) {
    __extends(ErrorCacheComponent, _super);
    function ErrorCacheComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            errors: []
        };
        return _this;
    }
    ErrorCacheComponent.prototype.render = function () {
        if (this.state.errors.length === 0) {
            return React.cloneElement(this.props.normalView, __assign({ serviceExecute: this.executeService.bind(this) }, this.props.otherNormalProps));
        }
        else {
            return this.props.errorView(this.state.errors, this.reset.bind(this));
        }
    };
    ErrorCacheComponent.prototype.reset = function () {
        this.setState({
            errors: []
        });
    };
    ErrorCacheComponent.prototype.executeService = function (service) {
        var _this = this;
        return function (input) {
            var maybeServiceError = service.start(input);
            if (maybeServiceError) {
                _this.setState({
                    errors: _this.state.errors.concat(maybeServiceError)
                });
            }
        };
    };
    return ErrorCacheComponent;
}(React.Component));
exports.ErrorCacheComponent = ErrorCacheComponent;
function DebugView(errors, reset) {
    return <react_native_1.View>
    <react_native_1.Button title={"reset"} onPress={reset}/>
    <react_native_1.Text>{(errors.map(function (error) { return error.name + "\n" + error.message + "\n" + error.stack; }).join("\n"))}</react_native_1.Text>
  </react_native_1.View>;
}
function debugErrorView(normalView, otherProps) {
    return <ErrorCacheComponent otherNormalProps={otherProps} normalView={normalView()} errorView={DebugView}/>;
}
exports.debugErrorView = debugErrorView;
