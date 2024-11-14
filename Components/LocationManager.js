import {
    Alert,
    Button,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import * as Location from "expo-location";
  import { useNavigation } from "@react-navigation/native";
  const windowWidth = Dimensions.get("window").width;
  
  export default function LocationManager() {
    const navigation = useNavigation();
  
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
        <Button
          title="Let me choose on the map"
          onPress={() => {
            //navigate to Map screen
            navigation.navigate("Map");
          }}
        />
        {location && (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`,
            }}
            style={styles.image}
          />
        )}
      </View>
    );
  }
  const styles = StyleSheet.create({
    image: { width: windowWidth, height: 200 },
  });