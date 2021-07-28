import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import db from '../config';
import { useState } from 'react/cjs/react.development';

let formColor = 'black';

const LoginScreen = ({ navigation }) => {

  const [enteredName, setLoginUsername] = useState('');
  const [enteredPass, setLoginPassword] = useState('');
  const [warningText, setWarningText] = useState('');

  useEffect( ()=>{
    formColor: 'black';
  }, [] )

  const validateUser = () => {
    const users = db.ref('system/users');
    users.once('value', (data)=>{
      let snapshot = data.val();
      for(let id in snapshot){
        if( enteredName == snapshot[id].name ){
          if( enteredPass == snapshot[id].userPassword ){
              formColor = 'black';
              navigation.navigate('ChatHistory', {
                chatUser: snapshot[id].name, 
                chatUserID: id
               } );
          }
          else{
              formColor = 'red';
              setWarningText('Invalid credentials! Try again!');
          }
        }
      }
    } )
  };

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
          <Text style={styles.headerText}>Login</Text>
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
              size={25}
              color={formColor}
            />
            <TextInput style={styles.input} placeholder="Username"  onChangeText={(text)=>setLoginUsername(text)} />
          </View>

          <View style={styles.inputContainer}>
            <IconMaterialCommunityIcons
              style={{ padding: 5 }}
              name={'form-textbox-password'}
              size={25}
              color={formColor}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              onChangeText={(text)=>setLoginPassword(text)}
            />
          </View>
          <View style={styles.buttonAlign}>
            <TouchableOpacity style={styles.button} onPress={()=>validateUser()} >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.warning} >{warningText}</Text>
      </View>
    </View>
  );
};
export default LoginScreen;
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
    marginLeft: 5
  },
  inputContainer: {
    borderBottomWidth: 1,
    //backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'blue',
    height: 40,
    //width:100,
    borderRadius: 10,
    marginVertical: 20
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    color: 'white',
    padding: 10
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
  detail: {
    marginHorizontal: 20,
    padding: 15
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  warning: {
    textAlign:'center', 
    color:'red', 
    marginHorizontal: 0,
    fontSize: 14,
    fontWeight: 'bold'
   }
});
