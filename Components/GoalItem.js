import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GoalItem({ goalObj }) {
  return (
    <View key={goalObj.id} style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    padding: 50,
    fontSize: 50,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginTop: 50,
  },
});