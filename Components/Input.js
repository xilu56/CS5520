import { Button, Modal, StyleSheet, Text, TextInput, View, Image } from "react-native";
import React, { useState } from "react";

export default function Input({
  textInputFocus,
  inputHandler,
  isModalVisible,
  onCancel,
}) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);

  const MIN_CHAR_LENGTH = 3; // Set the required minimum characters

  function handleConfirm() {
    inputHandler(text);  // Pass the text to parent
    setText("");         // Clear the TextInput
  }

  function handleCancelPress() {
    onCancel();   // Call parent onCancel function to close the modal
    setText("");  // Clear the TextInput after canceling
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
          text.length >= MIN_CHAR_LENGTH ? (
            <Text>Thank you</Text>
          ) : (
            <Text>Please type at least {MIN_CHAR_LENGTH} characters</Text>
          )
        ) : (
          text && <Text>{text.length}</Text>
        )}

        {/* {/* 
          Purpose of the `alt` prop:
          - Provides accessibility support for visually impaired users.
          - Screen readers use the `alt` text to describe the content of the image.
          - Useful for accessibility tools in apps to explain what the image represents.
         */}
        <View style={styles.imageContainer}>
          {/* Network Image */}
          <Image
            style={styles.image}
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png" }}
            alt="Network image"
          />
          
          {/* Local Image */}
          <Image
            style={styles.image}
            source={require("../assets/2617812.png")} // Local image
            alt="Local image"
          />
        </View>

        {/* Horizontal button container */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              title="Confirm"
              onPress={handleConfirm}
              disabled={text.length < MIN_CHAR_LENGTH}  // Disable if too few characters
            />
          </View>
          <View style={styles.buttonWrapper}>
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
  imageContainer: {
    flexDirection: "column", // Lay out images vertically
    justifyContent: "space-around",
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100,  // Set width and height of both images
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
