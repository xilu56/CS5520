import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
} from "react-native";
import Header from "./Header";
import { useEffect, useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { auth, database, storage } from "../Firebase/firebaseSetup";
import {
  writeToDB,
  deleteFromDB,
  deleteAllFromDB,
} from "../Firebase/firestoreHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import * as Notifications from "expo-notifications";
export default function Home({ navigation }) {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";
  // update to receive data
  useEffect(() => {
    console.log("Home use effect");
    async function getPushToken() {
      const pushToken = await Notifications.getExpoPushTokenAsync({});
      console.log(pushToken);
    }
    getPushToken();
  }, []);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      // we should update the listener to only listen to our own data
      query(
        collection(database, "goals"),
        where("owner", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setGoals(newArray);
      },
      (error) => {
        console.log(error);
        Alert.alert(error.message);
      }
    );
    return () => unsubscribe();
  }, []);
  async function fetchAndUploadImage(uri) {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        // what to do in case of an HTTP error e.g. 404
        // throw an error
        throw new Error(`An error happened with status: ${response.status}`);
      }
      const blob = await response.blob();
      // let's upload blob to storage
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log("fetch and upload image ", err);
    }
  }
  // receive text and image uri
  async function handleInputData(data) {
    console.log("App.js ", data);
    // upload the image to storage, and get a storage ref
    let uri = "";
    if (data.imageUri) {
      uri = await fetchAndUploadImage(data.imageUri);
    }
    let newGoal = { text: data.text };
    // add info about owner of the goal
    newGoal = { ...newGoal, owner: auth.currentUser.uid };
    if (uri) {
      newGoal = { ...newGoal, imageUri: uri };
    }
    writeToDB(newGoal, "goals");
    //make a new obj and store the received data as the obj's text property
    // setGoals((prevGoals) => {
    //   return [...prevGoals, newGoal];
    // });
    // setReceivedData(data);
    setModalVisible(false);
  }
  function dismissModal() {
    setModalVisible(false);
  }
  function handleGoalDelete(deletedId) {
    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goalObj) => {
    //     return goalObj.id != deletedId;
    //   });
    // });
    deleteFromDB(deletedId, "goals");
  }
  // function handleGoalPress(pressedGoal) {
  //   //receive the goal obj
  //   console.log(pressedGoal);
  //   // navigate to GoalDetails and pass goal obj as params
  //   navigation.navigate("Details", { goalData: pressedGoal });
  // }
  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          // setGoals([]);
          deleteAllFromDB("goals");
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}></Header>
        <PressableButton
          pressedHandler={function () {
            setModalVisible(true);
          }}
          componentStyle={{ backgroundColor: "purple" }}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
        {/* <Button
          title="Add a Goal"
          onPress={function () {
            setModalVisible(true);
          }}
        /> */}
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => {
            return (
              <View
                style={{
                  height: 5,
                  backgroundColor: highlighted ? "purple" : "gray",
                }}
              />
            );
          }}
          ListEmptyComponent={
            <Text style={styles.header}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length && <Text style={styles.header}>My Goals List</Text>
          }
          ListFooterComponent={
            goals.length && <Button title="Delete all" onPress={deleteAll} />
          }
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item, separators }) => {
            return (
              <GoalItem
                separators={separators}
                deleteHandler={handleGoalDelete}
                goalObj={item}
              />
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
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});