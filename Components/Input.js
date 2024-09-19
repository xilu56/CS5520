import { View, Text, Button, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

export default function Input({ shouldFocus, inputHandler }) {
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
    if (shouldFocus && textInputRef.current) {
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

  // Define the handleConfirm function
  function handleConfirm() {
    console.log(text);
    inputHandler(text);
    // call the  callback fn received from app.js
    // pass what user has typed
  }
  return (
    <View>
      <TextInput
        ref={textInputRef}
        placeholder="Type something"
        keyboardType="default"
        style={{ borderBottomColor: 'purple', borderBottomWidth: 2 }}
        value={text}
        onChangeText={updateText}
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
            ? 'Thank you'
            : 'Please type more than 3 characters'}
        </Text>
      )}
      
      {/* Add a Confirm button */}
      <Button
        title="Confirm"
        onPress={handleConfirm} // Pass the handleConfirm function to onPress
      />
    </View>
  );
}
