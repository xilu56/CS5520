import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";
export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";
  // update to receive data
  function handleInputData(data) {
    console.log("App.js ", data);
    let newGoal = { text: data, id: Math.random() };
    //make a new obj and store the received data as the obj's text property
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    // setReceivedData(data);
    setModalVisible(false);
  }
  function dismissModal() {
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
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item }) => {
            return (
              <View key={item.id} style={styles.textContainer}>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            );
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id} style={styles.textContainer}>
                <Text style={styles.text}>{goalObj.text}</Text>
              </View>
            );
          })}
        </ScrollView>
        </ScrollView> */}
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
  scrollViewContainer: {
    alignItems: "center",
  },
  text: {
    color: "purple",
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
  bottomView: { flex: 4, backgroundColor: "#dcd" },
});