import { Button, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function GoalItem({ goalObj, deleteHandler }) {
  const navigation = useNavigation();
  function handleDelete() {
    deleteHandler(goalObj.id);
  }

  function showDeleteConfirmation() {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDelete,
          style: "destructive",
        },
      ]
    );
  }
  function handlePress() {
    // call a callbackfn received from parent
    //pass the goal obj back to Home.js
    // pressHandler(goalObj);
    navigation.navigate("Details", { goalData: goalObj });
  }
  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={handlePress}
        onLongPress={showDeleteConfirmation}
        style={({ pressed }) => {
          return [styles.horizontalContainer, pressed && styles.pressedStyle];
        }}
        android_ripple={{ color: "red", radius: 30 }}
      >
        <Text style={styles.text}>{goalObj.text}</Text>
        <PressableButton
          componentStyle={styles.deleteButton}
          pressedFunction={handleDelete}
          pressedStyle={styles.pressedStyle}
        >
          <AntDesign name="delete" size={24} color="black" />
        </PressableButton>
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
    backgroundColor: "#aaa",
  },
  pressedStyle: {
    opacity: 0.5,
    backgroundColor: "red",
      deleteButton: {
    backgroundColor: "grey",
  },
  deleteText: {
    fontSize: 20,
    color: "white",
  },
  deleteButton: {
    backgroundColor: "grey",
  },
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    color: "grey",
  },
  },
});