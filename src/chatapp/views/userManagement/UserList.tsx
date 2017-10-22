import {FlatList,Text, View, Button} from "react-native";
import {User, UserId} from "../../domains/User";
import * as React from "react";

interface Props {
  users: User[]
  onPressDelete: (userId: UserId) => void
}
export function UserList({users, onPressDelete}: Props): JSX.Element {
  return (
    <FlatList
      data={users}
      keyExtractor={(user, _) => user.id.value}
      renderItem={({item: user}) => {
        return (
          <View>
            <Text>{user.id.value}</Text>
            <Text>{user.createdAt.toString()}</Text>
            <Button title="削除" onPress={() => onPressDelete(user.id)} />
          </View>);
        }
      }
    />
  )
}