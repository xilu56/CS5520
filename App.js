import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";

export default function App() {
  const [receivedData, setReceivedData] = useState(""); // State for received input
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const appName = "My app!";

  // Function to handle data received from the Input component
  function handleInputData(data) {
    console.log("App.js received: ", data);
    setReceivedData(data); // Update state with received data
    setModalVisible(false); // Close modal after receiving data
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Display header */}
      <Header name={appName} />

      {/* Button to open the modal */}
      <Button
        title="Add a Goal"
        onPress={() => setModalVisible(true)} // Open modal
      />

      {/* Input modal component */}
      <Input
        textInputFocus={true}
        inputHandler={handleInputData} // Handle the input from Input component
        isModalVisible={modalVisible} // Control modal visibility
      />

      {/* Display the received data */}
      <Text style={styles.text}>Goal: {receivedData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "black",
    marginTop: 20,
  },
});
