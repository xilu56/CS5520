import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";

  // Update to receive data
  function handleInputData(data) {
    console.log("App.js ", data);
    //setReceivedData(data);
    let newGoal = { text: data, id: Math.random() };
    //make a new obj and store the received data as the obj's text property
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    setModalVisible(false);
  }

  // Callback function to handle modal cancel action
  function handleCancel() {
    Alert.alert(
      "Cancel",
      "Are you sure you want to cancel?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => setModalVisible(false),  // Only hide the modal
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}></Header>
        <Button
          title="Add a Goal"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        onCancel={handleCancel}  // Pass handleCancel directly
      />
      <View style={styles.bottomView}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id} style={styles.textContainer}>
                <Text style={styles.text}>{goalObj.text}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
  },
  text: {
    color: "red",
    padding: 50,
    fontSize: 50,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginTop: 50,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
  spacer: {
    width: 10,
  },
  bottomView: { flex: 4, backgroundColor: "#dcd"},
});
