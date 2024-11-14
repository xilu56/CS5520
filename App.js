import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./Components/GoalDetails";
import { Button } from "react-native";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { auth } from "./Firebase/firebaseSetup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Profile from "./Components/Profile";
import PressableButton from "./Components/PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Map from "./Components/Map";

const Stack = createNativeStackNavigator();

const authStack = (
  <>
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Login" component={Login} />
  </>
);
const appStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => {
        return {
          title: "My Goals",
          headerRight: () => {
            return (
              <PressableButton
                componentStyle={{ backgroundColor: "purple" }}
                pressedHandler={() => {
                  navigation.navigate("Profile");
                }}
              >
                <AntDesign name="user" size={24} color="white" />
              </PressableButton>
            );
          },
        };
      }}
    />
    <Stack.Screen
      name="Details"
      component={GoalDetails}
      options={({ route }) => {
        return {
          title: route.params ? route.params.goalData.text : "More Details",
          // headerRight: () => {
          //   return (
          //     <Button
          //       title="Warning"
          //       onPress={() => {
          //         console.log("warning");
          //       }}
          //     />
          //   );
          // },
        };
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerRight: () => {
          return (
            <PressableButton
              componentStyle={{ backgroundColor: "purple" }}
              pressedHandler={() => {
                signOut(auth);
              }}
            >
              <AntDesign name="logout" size={24} color="white" />
            </PressableButton>
          );
        },
      }}
    />
    <Stack.Screen name="Map" component={Map} />
  </>
);
export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
      //based on the user variable, set the state variable isUserLoggedIn
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
        }}
      >
        {isUserLoggedIn ? appStack : authStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}