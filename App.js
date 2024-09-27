import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";
import GoalItem from "./Components/GoalItem";

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
  function handleGoalDelete(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => {
        return goalObj.id != deletedId;
      });
    });
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
        ListHeaderComponent={
          goals.length > 0 ? (
            <Text style={styles.goalHeaderText}>My Goals</Text>
          ) : null
        }
        ListEmptyComponent={() => (
          <Text style={styles.noGoalsText}>No goals to show</Text>
        )}
        renderItem={({ item }) => (
          <GoalItem deleteHandler={handleGoalDelete} goalObj={item} />
        )}
      />
 
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
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: { flex: 4, backgroundColor: "#dcd" },
  noGoalsText: {
    fontSize: 20,
    color: "red",
    marginTop: 20,
    textAlign: "center",
  },
  goalHeaderText: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
});