"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
function UserList(_a) {
    var users = _a.users, onPressDelete = _a.onPressDelete;
    return (<react_native_1.FlatList data={users} keyExtractor={function (user, _) { return user.id.value; }} renderItem={function (_a) {
        var user = _a.item;
        return (<react_native_1.View>
            <react_native_1.Text>{user.id.value}</react_native_1.Text>
            <react_native_1.Text>{user.createdAt.toString()}</react_native_1.Text>
            <react_native_1.Button title="削除" onPress={function () { return onPressDelete(user.id); }}/>
          </react_native_1.View>);
    }}/>);
}
exports.UserList = UserList;
