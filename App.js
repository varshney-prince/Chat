import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Constants from 'expo-constants';

import LoginScreen from './components/LoginScreen';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import db from './config';

const Stack = createStackNavigator();

export default function App() {

  return (
    <View style={styles.container}>
     <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name={'Welcome'} component={Welcome} />
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
        <Stack.Screen name={'SignUp'} component={SignUp} />
      </Stack.Navigator>
     </NavigationContainer>
    
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
