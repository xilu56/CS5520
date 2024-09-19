import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  const appName = "My Awesome App";
  const [receivedData, setReceivedData] = useState(""); // State to hold data received from Input

  // Callback function to handle the input data from Input component
  function handleInputData(data) {
    console.log(data);
    setReceivedData(data); // Update the state with the received data
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Pass appName as a prop to Header */}
      <Header name={appName} />
      
      {/* Pass handleInputData as a prop to Input */}
      <Input shouldFocus={true} inputHandler={handleInputData} />

      {/* Display the received data */}
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        You typed: {receivedData}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

