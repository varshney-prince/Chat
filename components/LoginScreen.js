import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
const LoginScreen=({ navigation }) =>{
  const buttonRipple = {
    color: 'purple',
    borderless: true,
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Chat-Mate</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Username" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Password" />
      </View>
      <View style={styles.buttonAlign}>
        <Pressable style={styles.button} android_ripple={buttonRipple}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable 
        style={styles.button} android_ripple={buttonRipple}
        onPress={() => {navigation.navigate('SignUp')}}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  input: {
    // backgroundColor: 'white',
    //borderWidth:1,
    flex: 1,
  },
  inputContainer: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 8,
    marginRight: 8,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'purple',
    borderWidth: 1,
    height: 40,
    //width:100,
    borderRadius: 10,
    marginBottom: 7,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    color: 'white',
  },
  logo: {
    //borderWidth:1,
    alignItems: 'center',
    marginBottom: 80,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  buttonAlign: {
    marginLeft: 20,
    marginRight: 20,
  },
});
