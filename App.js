import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import LoginScreen from './components/LoginScreen';
import SignUp from './components/SignUp';
export default function App() {
  return (
    <View style={styles.container}>
    <SignUp
    />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
