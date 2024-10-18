import { Button, StyleSheet, Text, View } from "react-native";
import React, {useEffect, useState} from "react";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addWarningToGoal } from "../Firebase/firestoreHelper";

export default function GoalDetails({ navigation, route }) {
  console.log(route);
  
  function moreDetailsHandler() {
    navigation.push("Details");
  }

  const [warning, setWarning] = useState(false);
  
  async function warningHandler() {
    console.log("warning");
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });

    // Call Firestore function to update the goal document with warning
    if (route.params && route.params.goalData) {
      const goalId = route.params.goalData.id;
      await addWarningToGoal(goalId);
    }
  }
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressedFunction={warningHandler}
            componentStyle={{ backgroundColor: "purple" }}
            pressedStyle={{ opacity: 0.5, backgroundColor: "purple" }}
          >
            <AntDesign name="warning" size={24} color="white" />
          </PressableButton>
        );
      },
    });
  }, []);

  return (
    <View>
      {route.params ? (
        <Text style={warning && styles.warningStyle}>
          Details of {route.params.goalData.text} goal with 
          {route.params.goalData.id}
        </Text>
      ) : (
        <Text style={warning && styles.warningStyle}>
          More details
        </Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
});
