import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function GoalItem({ goalObj, deleteHandler }) {
  const navigation = useNavigation();
  function handleDelete() {
    console.log("deleted");
    deleteHandler(goalObj.id);
  }
  function handlePress() {
    // call a callbackfn received from parent
    //pass the goal obj back to Home.js
    // pressHandler(goalObj);
    navigation.navigate("Details", { goalData: goalObj });
  }
  return (
    <View style={styles.textContainer}>
      <Pressable onPress={handlePress} style={styles.horizontalContainer}>
        <Text style={styles.text}>{goalObj.text}</Text>
        <Button title="X" color="grey" onPress={handleDelete} />
        {/* <Button title="i" color="grey" onPress={handlePress} /> */}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "purple",
    padding: 5,
    fontSize: 30,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});