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
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
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
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    marginVertical: 10,
  },
  modalContainer: {
    borderRadius: 6,
    backgroundColor: "#999",
    alignItems: "center",
  },
  buttonContainer: {
    width: "30%",
    margin: 10,
  },
  buttonsRow: { flexDirection: "row" },
  image: { width: 100, height: 100 },
});