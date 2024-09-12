import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import React, { useState } from 'react';

export default function App() {
  const appName = "My Awesome App";
  const [text, setText] = useState("");

  function updateText(ChangeText){
    setText(ChangeText);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* pass appName as a prop to Headers */}
      <Header name={appName} />
      <TextInput 
        placeholder='Type something' 
        keyboardType='default' 
        style={{borderBottomColor: "purple", borderBottomWidth: 2}}
        value={text}
        onChangeText= {updateText}
        />
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
