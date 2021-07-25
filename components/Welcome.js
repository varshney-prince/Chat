import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native';
const Welcome=({ navigation }) =>{
  const buttonRipple = {
    color: 'purple',
    borderless: true,
  };
  return (
    <View style={styles.container}>
      <View style={styles.welcomeMsgContainer}>
        <Text style={styles.welcomeText}>Welcome folks!</Text>
        <Text style={styles.subtitle}>Have a seat! What would you like to do?</Text>
      </View>
    
        <TouchableOpacity style={styles.button} 
         onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button} android_ripple={buttonRipple}
        onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  welcomeMsgContainer: {
      //borderWidth: 1,
      position: 'absolute',
      top: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'arial'
  },
  subtitle: {
      marginBottom: 35,
      fontSize: 15,
      color: 'grey'
  },
  button: {
    backgroundColor: 'white',
    width: '70%',
    borderWidth: 2,
    height: 45,
    borderRadius: 10,
    marginBottom: '3%',
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
    flex: 1,
    padding: 10,
    fontFamily: 'arial',
    color: '#595a5c'
  },
  buttonAlign: {
    marginLeft: 20,
    marginRight: 20,
  },
});