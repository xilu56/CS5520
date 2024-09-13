import { View, Text } from 'react-native'
import React from 'react'
import {useState} from 'react';
import { TextInput } from 'react-native';

export default function Input({shouldFocus}) {
    const [text, setText] = useState("");

    // function to update the text
    function updateText(ChangeText){
      setText(ChangeText);
    }
  return (
    <View>
      <TextInput 
        placeholder='Type something' 
        keyboardType='default' 
        style={{borderBottomColor: "purple", borderBottomWidth: 2}}
        value={text}
        onChangeText= {updateText}
        autoFocus={shouldFocus} //set autoFocus based on the prop
        />
    </View>
  )
}