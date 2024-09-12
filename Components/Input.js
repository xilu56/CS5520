import { View, Text } from 'react-native'
import React from 'react'
import {useState} from 'react';
import { TextInput } from 'react-native';

export default function Input() {
    const [text, setText] = useState("");

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
        />
    </View>
  )
}