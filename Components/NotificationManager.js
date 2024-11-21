import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export default function NotificationManager() {
  async function verifyPermission() {
    try {
      const permissionResponse = await Notifications.getPermissionsAsync();
      if (permissionResponse.granted) {
        return true;
      }
      const requestedPermission = await Notifications.requestPermissionsAsync();
      return requestedPermission.granted;
    } catch (err) {
      console.log("verify permission ", err);
    }
  }
  async function scheduleNotificationHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission for notifications");
        return;
      }
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "First Notification",
          body: "This is my first notification",
        },
        trigger: {
          seconds: 3,
        },
      });
      console.log(id);
    } catch (err) {
      console.log("Schedule notification ", err);
    }
  }
  return (
    <View>
      <Button
        title="Schedule a Notification"
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({});