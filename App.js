import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";
export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const appName = "My app!";
  // update to receive data
  function handleInputData(data) {
    console.log("App.js ", data);
    setReceivedData(data);
    setModalVisible(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}></Header>
        <Button
          title="Add a Goal"
          onPress={function () {
            setModalVisible(true);
          }}
        />
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
      />
      <View style={styles.bottomView}>
        <Text style={styles.text}>{receivedData}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: { flex: 4, backgroundColor: "#d5d", alignItems: "center" },
});