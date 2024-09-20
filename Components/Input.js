import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Input({
  textInputFocus,
  inputHandler,
  isModalVisible,
  onCancel,
}) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);

  function handleConfirm() {
    inputHandler(text);
    setText("");  // Clear the input after confirming
  }

  function handleCancelPress() {
    onCancel();   // Trigger parent cancel handler to close the modal
    setText("");  // Clear the input after canceling
  }

  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <View style={styles.container}>
        <TextInput
          autoFocus={textInputFocus}
          placeholder="Type something"
          autoCorrect={true}
          keyboardType="default"
          value={text}
          style={styles.input}
          onChangeText={(changedText) => setText(changedText)}
          onBlur={() => setBlur(true)}
          onFocus={() => setBlur(false)}
        />
        {blur ? (
          text.length >= 3 ? (
            <Text>Thank you</Text>
          ) : (
            <Text>Please type more than 3 characters</Text>
          )
        ) : (
          text && <Text>{text.length}</Text>
        )}

        {/* Horizontal button container */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Confirm" onPress={handleConfirm} />
          </View>
          <View style={styles.buttonWrapper}>
            {/* Call handleCancelPress here to clear the input */}
            <Button title="Cancel" color="red" onPress={handleCancelPress} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "green",
    borderWidth: 2,
    padding: 5,
    marginBottom: 20, // Add spacing between input and buttons
    width: "80%",  // Adjust width to fit well on screen
  },
  buttonContainer: {
    flexDirection: "row", // Lay out buttons horizontally
    justifyContent: "space-between", // Space them out
    width: "60%",  // Control the width of the button container
    marginTop: 20, // Add spacing above the buttons
  },
  buttonWrapper: {
    flex: 1, // Take equal space for both buttons
    marginHorizontal: 5, // Add space between buttons
  },
});

