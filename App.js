import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';


export default function App() {
  const appName = "My Awesome App";


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* pass appName as a prop to Headers */}
      <Header name={appName} />
      <Input shouldFocus={true}/>

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
