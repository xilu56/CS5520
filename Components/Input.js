import { View, Text } from 'react-native'
import React from 'react'
import {useState} from 'react';
import { useRef} from 'react';
import { useEffect } from 'react';
import { TextInput } from 'react-native';

export default function Input({shouldFocus}) {
    const [text, setText] = useState("");
    const textInputRef = useRef(null);

  useEffect(() => {
    if(shouldFocus && textInputRef.current){
      textInputRef.current.focus();
    }
  }, [shouldFocus]); 

  return (
    <View>
      <TextInput
        ref={textInputRef} 
        placeholder='Type something' 
        keyboardType='default' 
        style={{borderBottomColor: "purple", borderBottomWidth: 2}}
        value={text}
        onChangeText= {updateText}
        />
    </View>
  )
}