import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
// import { launchCameraAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";

//receive the callback from Input
export default function ImageManager({ receiveImageUri }) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");
  async function verifyPermission() {
    try {
      //check if user has given permission
      //if so return true
      if (response.granted) {
        return true;
      }
      //if not ask for permission and return what user has chosen
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {
      console.log("verify permission ", err);
    }
  }
  async function takeImageHandler() {
    try {
      // only launch camera if we have permission from user
      const hasPermission = await verifyPermission();
      console.log(hasPermission);
      if (!hasPermission) {
        Alert.alert("You need to give permission for camera");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      // read the fist element from assets array, and access its uri
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        // send this uri back to Input
        receiveImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.log("take image ", err);
    }
  }
  return (
    <View>
      <Button title="Take An Image" onPress={takeImageHandler} />
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
          alt="preview of the image taken"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({ image: { width: 100, height: 100 } });