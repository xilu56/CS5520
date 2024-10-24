import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-web";

export default function GoalUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/"
        );
        if (!response.ok) {
          throw new Error(
            `An HTTP error happened with status: ${response.status}`
          );
        }
        const data = await response.json();
      } catch (err) {
        console.log("fetch user data ", err);
      }
    }
    fetchData();
  }, []);
  return (
    <View>
      <FlatList />
    </View>
  );
}

const styles = StyleSheet.create({});