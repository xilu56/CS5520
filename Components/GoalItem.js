import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GoalItem({ goalObj, deleteHandler }) {
    function handleDelete() {
      console.log("deleted");
      deleteHandler(goalObj.id);
    }
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
      <Button title="X" color="grey" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    padding: 5,
    fontSize: 20,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
});