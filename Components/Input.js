import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import ImageManager from "./ImageManager";

export default function Input({
  textInputFocus,
  inputHandler,
  isModalVisible,
  dismissModal,
}) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const minimumChar = 3;
  function handleConfirm() {
    // console.log(text);
    inputHandler({text, imageUri});
    setText("");
  }
  function handleCancel() {
    // hide the modal
    Alert.alert("Cancel", "Are you sure you want to cancel", [
      { text: "cancel", style: "cancel" },
      {
        text: "ok",
        onPress: () => {
          setText("");
          dismissModal();
        },
      },
    ]);
  }
  function receiveImageUri(uri) {
    console.log("In Input ", uri);
    setImageUri(uri);
  }
  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
          }}
          style={styles.image}
          alt="Image of a an arrow"
        />
        <Image
          source={require("../assets/2617812.png")}
          style={styles.image}
          alt="Image of a an arrow"
        />

        <TextInput
          autoFocus={textInputFocus}
          placeholder="Type something"
          autoCorrect={true}
          keyboardType="default"
          value={text}
          style={styles.input}
          onChangeText={(changedText) => {
            setText(changedText);
          }}
          onBlur={() => {
            setBlur(true);
          }}
          onFocus={() => {
            setBlur(false);
          }}
        />

        {blur ? (
          text.length >= minimumChar ? (
            <Text>Thank you</Text>
          ) : (
            <Text>Please type more than {minimumChar} characters</Text>
          )
        ) : (
          text && <Text>{text.length}</Text>
        )}
        <ImageManager receiveImageUri={receiveImageUri}/>
        <View style={styles.buttonsRow}>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={handleCancel} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              disabled={text.length < minimumChar}
              title="Confirm"
              onPress={handleConfirm}
            />
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
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    width: "30%",
    margin: 10,
  },
  buttonsRow: { flexDirection: "row" },
  image: { width: 100, height: 100 },
});