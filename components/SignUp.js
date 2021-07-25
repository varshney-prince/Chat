import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from 'react-native';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import db from '../config';

const SignUp = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pno, setPNO] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const buttonRipple = {
    color: 'purple',
    borderless: true,
  };

  let registerUser = ()=>{
    
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <View style={{ flex: 0.1, justifyContent: 'center' }}>
      
            <IconIonicons
              style={{ padding: 5 }}
              name={'arrow-back'}
              size={35}
              color={'black'}
              onPress={() => {navigation.navigate('Welcome')}}
            />
        </View>
        <View style={{ flex: 0.9, justifyContent: 'center' }}>
          <Text style={styles.headerText}>Sign-Up</Text>
        </View>
      </View>
        <View style={styles.body}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Chat-Mate</Text>
      </View>
      <View style={styles.detail}>
        <View style={styles.inputContainer}>
          <IconAntDesign
            style={{ padding: 5 }}
            name={'user'}
            size={35}
            color={'black'}
          />
          <TextInput style={styles.input} placeholder="Username" />
        </View>
        <View style={styles.inputContainer}>
          <IconAntDesign
            style={{ padding: 5 }}
            name={'mail'}
            size={35}
            color={'black'}
          />
          <TextInput style={styles.input} placeholder="Email" />
        </View>
        <View style={styles.inputContainer}>
          <IconAntDesign
            style={{ padding: 5 }}
            name={'mobile1'}
            size={35}
            color={'black'}
          />
          <TextInput style={styles.input} placeholder="Phone Number" />
        </View>

        <View style={styles.inputContainer}>
          <IconMaterialCommunityIcons
            style={{ padding: 5 }}
            name={'form-textbox-password'}
            size={35}
            color={'black'}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
          />
        </View>
        <View style={styles.buttonAlign}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
      </View>
    </View>
  );
};
export default SignUp;
const styles = StyleSheet.create({
   header: {
    flex: 0.8,
    backgroundColor: 'white',
    flexDirection: 'row',
    //borderWidth:1
  },
  body: {
    flex: 9.5,
    marginTop: 40,
  },
  container: {
    flex: 1,
  
    backgroundColor: '#ecf0f1',
  },
  input: {
    // backgroundColor: 'white',
    //borderWidth:1,
    flex: 1,
  },
  inputContainer: {
    borderBottomWidth: 1,
    //backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
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
    color: 'black',
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
    color: 'black',
  },
  buttonAlign: {
    marginTop: 10,
    marginLeft: '25%',
    marginRight: '25%',
    
  },
  detail:{
    marginLeft:'5%',
    marginRight:'5%'
  },
   headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
  },
});
