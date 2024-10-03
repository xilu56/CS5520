import { StatusBar } from "expo-status-bar";
import {
  Alert,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";

  // Function to handle input data
  function handleInputData(data) {
    let newGoal = { text: data, id: Math.random().toString() }; // Convert to string
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    setModalVisible(false);
  }

  // Function to dismiss the modal
  function dismissModal() {
    setModalVisible(false);
  }

  // Function to delete a goal
  function handleGoalDelete(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => {
        return goalObj.id != deletedId;
      });
    });
  }

  // Function to delete all goals
  function handleDeleteAll() {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => setGoals([]),
        },
      ],
      { cancelable: true }
    );
  }

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

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
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
      <FlatList
          data={goals}
          ListHeaderComponent={
            goals.length > 0 ? (
              <Text style={styles.goalHeaderText}>My Goal List</Text>
            ) : null
          }
          ListEmptyComponent={() => (
            <Text style={styles.noGoalsText}>No goals to show</Text>
          )}
          ListFooterComponent={
            goals.length > 0 ? (
              <View style={styles.footer}>
                <Button title="Delete All" color="red" onPress={handleDeleteAll} />
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <GoalItem deleteHandler={handleGoalDelete} goalObj={item} />
          )}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item) => item.id}
        />
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
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 3,
    backgroundColor: "#dcd",
    padding: 50,
    textAlign: "center"
  },
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
  footer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "black",
    alignSelf: "center",
    marginVertical: 10,
  },
});
