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
var UserRegisterForm_1 = require("../../viewModels/UserRegisterForm");
var UserRegisterForm_2 = require("./UserRegisterForm");
var react_native_1 = require("react-native");
var react_native_2 = require("react-native");
var UserList_1 = require("./UserList");
var UserManagement = (function (_super) {
    __extends(UserManagement, _super);
    function UserManagement(props) {
        var _this = _super.call(this, props) || this;
        _this.userStorageChangeListener = function () {
            var users = _this.props.userStore.findAll();
            _this.setState({ users: users });
        };
        _this.submitDisabled = function () {
            return _this.state.userRegisterFormState.validate.hasError();
        };
        _this.onChangeUserId = function (userId) {
            _this.setUserRegisterFormState(_this.state.userRegisterFormState.copy({ userId: userId }));
        };
        _this.onChangePassword = function (password) {
            _this.setUserRegisterFormState(_this.state.userRegisterFormState.copy({ password: password }));
        };
        _this.onChangeImgUrl = function (imgUrl) {
            _this.setUserRegisterFormState(_this.state.userRegisterFormState.copy({ imgUrl: imgUrl }));
        };
        _this.submitUser = function () {
            var _a = _this.state.userRegisterFormState, userId = _a.userId, password = _a.password, imgUrl = _a.imgUrl;
            _this.props.serviceExecute(_this.props.registerService)({
                userId: userId,
                password: password,
                imgUrl: imgUrl
            });
        };
        _this.deleteUser = function (userId) {
            _this.props.serviceExecute(_this.props.deleteService)(userId);
        };
        _this.state = {
            users: props.userStore.findAll(),
            userRegisterFormState: UserRegisterForm_1.UserRegisterForm.empty
        };
        return _this;
    }
    UserManagement.prototype.componentWillMount = function () {
        this.props.userStore.addChangeListener(this.userStorageChangeListener);
    };
    UserManagement.prototype.componentWillUnmount = function () {
        this.props.userStore.removeChangeListener(this.userStorageChangeListener);
    };
    UserManagement.prototype.errorMessages = function () {
        var validationResult = this.state.userRegisterFormState.validate;
        return validationResult.hasError() ?
            validationResult.messages.map(function (message) {
                return <react_native_2.Text>
        {message}
      </react_native_2.Text>;
            }) :
            null;
    };
    UserManagement.prototype.render = function () {
        var userRegisterFormState = this.state.userRegisterFormState;
        return (<react_native_1.View style={{ margin: 30 }}>
        {this.errorMessages()}
        <UserRegisterForm_2.UserRegisterForm onChangeUserId={this.onChangeUserId} onChangePassword={this.onChangePassword} onChangeImgUrl={this.onChangeImgUrl} password={userRegisterFormState.maskedPassword()} imgUrl={userRegisterFormState.imgUrl} userId={userRegisterFormState.userId}/>
        <react_native_2.Button disabled={this.submitDisabled()} title="登録" onPress={this.submitUser}></react_native_2.Button>
        <UserList_1.UserList users={this.state.users} onPressDelete={this.deleteUser}/>
      </react_native_1.View>);
    };
    UserManagement.prototype.setUserRegisterFormState = function (userRegisterFormState) {
        this.setState({ userRegisterFormState: userRegisterFormState });
    };
    return UserManagement;
}(React.Component));
exports.UserManagement = UserManagement;
