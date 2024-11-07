import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { launchCameraAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  console.log(response);
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
      console.log(result);
      // read the fist element from assets array, and access its uri
    } catch (err) {
      console.log("take image ", err);
    }
  }
  return (
    <View>
      <Button title="Take An Image" onPress={takeImageHandler} />
      <Image />
    </View>
  );
}

const styles = StyleSheet.create({});