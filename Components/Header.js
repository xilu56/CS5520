import { View, Text } from 'react-native'
import React from 'react'

export default function Header(props) {
    const{ name } = props;
    console.log(props);
  return (
    <View>
      <Text>Welcome to {name}</Text>
    </View>
  )
}