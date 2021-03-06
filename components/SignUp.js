import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import Constants from 'expo-constants';

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
  const [warningText, setWarningText] = useState('');
  const [userNames, setUserNamesList] = useState([]);

  let fetchUserNames = ()=>{
    const users = db.ref('system/users');
    users.once('value', (data)=>{
        let snapshot = data.val();
        let tempUsernames = [];
        for(let id in snapshot){
          userNames.push(snapshot[id].name)
        }
    } );
  }

  useEffect( ()=>{
    fetchUserNames();
  }, [] )

  let registerUser = ()=>{
    const system = db.ref('system');
    const users = db.ref('system/users');
    if( !checkDuplicate() ){
    let newUser = {
      name: username,
      userEmail: email,
      userPhone: pno,
      userPassword: password,
    }
    users.push(newUser);
    navigation.navigate('LoginScreen');
    }
    else{ setWarningText('This username has been taken!') }
  }

  let checkDuplicate = ()=>{
    for(let checkName of userNames){
      if( username === checkName ){
        return true;
      }
    }
    return false;
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
            <TextInput style={styles.input} placeholder="Username" onChangeText={(text)=>setUsername(text)} />
          </View>
          <View style={styles.inputContainer}>
            <IconAntDesign
              style={{ padding: 5 }}
              name={'mail'}
              size={35}
              color={'black'}
            />
            <TextInput style={styles.input} placeholder="Email" onChangeText={(text)=>setEmail(text)} />
          </View>
          <View style={styles.inputContainer}>
            <IconAntDesign
              style={{ padding: 5 }}
              name={'mobile1'}
              size={35}
              color={'black'}
            />
            <TextInput style={styles.input} placeholder="Phone Number" onChangeText={(text)=>setPNO(text)} />
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
              onChangeText={(text)=>setPassword(text)}
            />
          </View>
          <View style={styles.buttonAlign}>
            <TouchableOpacity style={styles.button} 
                onPress={()=>{
                  if( username && (email || pno) && password ){
                    registerUser();
                   }
                  else{ setWarningText('Please fill all the details! ' + 
                    'You can skip one out of Email and Phone no.')}
                }} >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.warning} >{warningText}</Text>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
   header: {
    flex: 0.9,
    margin: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    //borderWidth:1,
    elevation: 6
  },
  body: {
    flex: 9.1,
    marginTop: 40,
  },
  container: {
    flex: 1,  
    backgroundColor: '#ecf0f1',
  },
  input: {
    marginLeft: 15,
  },
  inputContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  button: {
    padding: 8,
    marginVertical: 15,
    backgroundColor: 'blue',
    //borderWidth: 1,
    height: 40,
    //width:100,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center'
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
    color: 'black',
  },
  buttonAlign: {
    marginTop: 10,
    marginLeft: '25%',
    marginRight: '25%',
    
  },
  detail:{
    padding: 20,
    marginHorizontal: 25,
  },
   headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    //marginLeft: -35
  },
   warning: {
    textAlign:'center', 
    color:'red', 
    marginHorizontal: 0,
    fontSize: 14,
    fontWeight: 'bold'
   }
});
