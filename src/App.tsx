import * as React from "react";
import {View, Text, StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  hello: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  }
});

export default function App() {
    return (
    <View>
      <Text style={styles.hello}>
         Hello
      </Text>
    </View>);
}
