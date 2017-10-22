import * as React from "react";
import {View, Text, TextInput} from "react-native";

type Props = {
  userId: string,
  password: string,
  imgUrl: string,
  onChangeUserId: (id: string) => void,
  onChangePassword: (password: string) => void;
  onChangeImgUrl: (url: string) => void;
}
export function UserRegisterForm(props: Props): JSX.Element {
  const {userId, imgUrl, password, onChangeUserId, onChangePassword, onChangeImgUrl} = props;
  return (
    <View>
      <Text>userId</Text>
      <TextInput style={style}
                 value={userId}
                 onChangeText={onChangeUserId}
                 editable={true}
      ></TextInput>
      <Text>password</Text>
      <TextInput style={style}
                 value={password}
                 onChangeText={onChangePassword}
                 editable={true}
      ></TextInput>
      <Text>imgUrl</Text>
      <TextInput style={style}
                 value={imgUrl}
                 onChangeText={onChangeImgUrl}
                 editable={true}
      ></TextInput>
    </View>
  )
}

const style = {
  borderColor: "gray",
  height: 20,
  borderWidth: 1
};