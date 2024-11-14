import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";

export default function LocationManager() {
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();
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
  async function locateUserHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give location permission");
        return;
      }
      const response = await Location.getCurrentPositionAsync();
      console.log(response);
      setLocation({
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      });
    } catch (err) {
      console.log("locate user ", err);
    }
  }
  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});
