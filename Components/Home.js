import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import Header from "./Header";
import { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";

export default function Home({ navigation }) {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";
  
  function handleInputData(data) {
    let newGoal = { text: data, id: Math.random() };
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    setModalVisible(false);
  }

  function dismissModal() {
    setModalVisible(false);
  }

  function handleGoalDelete(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => goalObj.id != deletedId);
    });
  }

  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }

  const renderSeparator = ({ highlighted }) => (
    <View
      style={[
        styles.separator,
        { backgroundColor: highlighted ? "purple" : "grey" },
      ]}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}></Header>
        <PressableButton
          pressedFunction={() => setModalVisible(true)}
          componentStyle={{ backgroundColor: "beige" }}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={
            <Text style={styles.header}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length ? <Text style={styles.header}>My Goals List</Text> : null
          }
          ListFooterComponent={
            goals.length ? <Button title="Delete all" onPress={deleteAll} /> : null
          }
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item, separators }) => {
            return (
              <GoalItem
                deleteHandler={handleGoalDelete}
                goalObj={item}
                separators={separators}
              />
            );
          }}
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
  scrollViewContainer: {
    alignItems: "center",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: { flex: 4, backgroundColor: "#dcd" },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },
  separator: {
    height: 5,
  },
});
