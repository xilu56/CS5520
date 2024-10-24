import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllDocuments, writeToDB } from "../Firebase/firestoreHelper";

export default function GoalUsers({ id }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // fetch data
    async function fetchData() {
      try {
        const dataFromDB = await getAllDocuments(`goals/${id}/users`);
        console.log(dataFromDB);
        if (dataFromDB.length) {
          console.log("reading data from DB");
          setUsers(
            dataFromDB.map((user) => {
              return user.name;
            })
          );
          return;
        }
        console.log("reading data from API");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/"
        );
        if (!response.ok) {
          throw new Error(
            `An HTTP error happened with status: ${response.status}`
          );
        }
        const data = await response.json();
        data.forEach((user) => writeToDB(user, `goals/${id}/users`));
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