import { View, Text } from 'react-native'
import React from 'react'
import {useState} from 'react';
import { useRef} from 'react';
import { useEffect } from 'react';
import { TextInput } from 'react-native';

export default function Input({shouldFocus}) {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showMessage, setShowMessage] = useState("");
    const textInputRef = useRef(null);

  // function to update the text
  function updateText(ChangeText) {
    setText(ChangeText);
    setShowMessage(false);
  }

  useEffect(() => {
    if(shouldFocus && textInputRef.current){
      textInputRef.current.focus();
    }
  }, [shouldFocus]);
  
  function handleBlur() {
    setIsFocused(false); // No longer focused
    setShowMessage(true); // Show the message after blur
}

  function handleFocus() {
    setIsFocused(true); // TextInput is focused
    setShowMessage(false); // Hide message on focus
  }
  

  return (
    <View>
      <TextInput
        ref={textInputRef} 
        placeholder='Type something' 
        keyboardType='default' 
        style={{borderBottomColor: "purple", borderBottomWidth: 2}}
        value={text}
        onChangeText= {updateText}
        onBlur={handleBlur}
        onFocus={handleFocus}
        />
        {/* Show character count only if the TextInput is focused and the user has typed */}
        {isFocused && text.length > 0 && (
                <Text style={{ marginTop: 10 }}>
                    Character count: {text.length}
                </Text>
            )}
        {/* Show message when TextInput loses focus */}
        {showMessage && (
                <Text style={{ marginTop: 10 }}>
                    {text.length >= 3 
                        ? "Thank you" 
                        : "Please type more than 3 characters"}
                </Text>
            )}
    </View>
  );
}