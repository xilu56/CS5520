import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../Firebase/firebaseSetup";
import LocationManager from "./LocationManager";
import NotificationManager from "./NotificationManager";

export default function Profile() {
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
      <LocationManager />
      <NotificationManager />
    </View>
  );
}
const styles = StyleSheet.create({});