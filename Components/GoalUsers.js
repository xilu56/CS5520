import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllDocuments, writeToDB } from "../Firebase/firestoreHelper";
import { auth } from "../Firebase/firebaseSetup";

export default function GoalUsers({ id }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data from Firestore
        const dataFromDB = await getAllDocuments(`goals/${id}/users`);
        if (dataFromDB.length) {
          console.log("Reading data from DB");
          setUsers(dataFromDB.map((user) => user.name));
          return;
        }

        // Fetch from API if no data in Firestore
        console.log("Reading data from API");
        const response = await fetch("https://jsonplaceholder.typicode.com/users/");
        
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        
        const data = await response.json();
        
        // Write data to Firestore with owner field
        data.forEach((user) => {
          const userWithOwner = { ...user, owner: auth.currentUser.uid };
          writeToDB(userWithOwner, `goals/${id}/users`);
        });
        
        setUsers(data.map((user) => user.name));
      } catch (err) {
        console.log("Error fetching user data: ", err);
      }
    }

    fetchData();
  }, [id]);

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
