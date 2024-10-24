import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

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
        setUsers(
          data.map((user) => {
            return user.name;
          })
        );
      } catch (err) {
        console.log("fetch user data ", err);
      }
    }
    fetchData();
  }, []);
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});