import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { updateDB } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";
export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);
  const [imageUri, setImageUri] = useState("");
  function warningHandler() {
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
    updateDB(route.params.goalData.id, { warning: true }, "goals");
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          // <Button title="Warning" color="white" onPress={warningHandler} />
          <PressableButton
            pressedHandler={warningHandler}
            componentStyle={{ backgroundColor: "purple" }}
            pressedStyle={{ opacity: 0.5, backgroundColor: "purple" }}
          >
            <AntDesign name="warning" size={24} color="white" />
          </PressableButton>
        );
      },
    });
  }, []);
  useEffect(() => {
    async function getImageUri() {
      try {
        if (route.params && route.params.goalData.imageUri) {
          const imageRef = ref(storage, route.params.goalData.imageUri);
          const httpsImageURi = await getDownloadURL(imageRef);
          setImageUri(httpsImageURi);
        }
      } catch (err) {
        console.log("get image ", err);
      }
    }
    getImageUri();
  }, []);
  function moreDetailsHandler() {
    navigation.push("Details");
  }
  return (
    <View>
      {route.params ? (
        <Text style={warning && styles.warningStyle}>
          This is details of a goal with text {route.params.goalData.text} and
          id {route.params.goalData.id}
        </Text>
      ) : (
        <Text style={warning && styles.warningStyle}>More details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler} />
      {route.params && <GoalUsers id={route.params.goalData.id} />}
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
          alt="Image of the goal"
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
  image: { width: 100, height: 100 },
});