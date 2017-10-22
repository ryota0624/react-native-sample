"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
function UserRegisterForm(props) {
    var userId = props.userId, imgUrl = props.imgUrl, password = props.password, onChangeUserId = props.onChangeUserId, onChangePassword = props.onChangePassword, onChangeImgUrl = props.onChangeImgUrl;
    return (<react_native_1.View>
      <react_native_1.Text>userId</react_native_1.Text>
      <react_native_1.TextInput style={style} value={userId} onChangeText={onChangeUserId} editable={true}></react_native_1.TextInput>
      <react_native_1.Text>password</react_native_1.Text>
      <react_native_1.TextInput style={style} value={password} onChangeText={onChangePassword} editable={true}></react_native_1.TextInput>
      <react_native_1.Text>imgUrl</react_native_1.Text>
      <react_native_1.TextInput style={style} value={imgUrl} onChangeText={onChangeImgUrl} editable={true}></react_native_1.TextInput>
    </react_native_1.View>);
}
exports.UserRegisterForm = UserRegisterForm;
var style = {
    borderColor: "gray",
    height: 20,
    borderWidth: 1
};
