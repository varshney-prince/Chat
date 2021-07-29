import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Button,
   SafeAreaView 
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
import db from '../config';
const Chats = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  const [count, setCount] = useState(Array.from({ length: 1 }).fill(undefined));
  const [userNames, setUserNames] = useState([]);
  useEffect(() => {
   const users = db.ref('system/users');
    users.on('value', (data) => {
      const use = data.val();
      //const userList = ["Arjun"];
      for (let id in use) {
        userNames.push(use[id].name);
      }
      //setUserNames(userList);
  
    });
});
  var list = count.map((items) => {
    if (userNames.includes(searchQuery)) {
      return (
        <Pressable
          style={styles.collection}
          android_ripple={{
            color: 'lightgray',
            borderless: true,
          }}
          onPress={() => {
            navigation.navigate('Welcome');
          }}>
          <View style={styles.pressImage}>
            <Image
              source={require('../assets/user.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.pressText}>
            <Text style={styles.userText}>{searchQuery}</Text>
          </View>
        </Pressable>
      );
    } else {
      return <Text style={{color:'red',margin:20}}>User not found</Text>;
    }
  });


  return (
    < SafeAreaView style={{flex:1}}>
    <View style={{flex:1,borderWidth:1}}>
      <View style={styles.header}>
        <View style={{ flex: 0.1, justifyContent: 'center' }}>
          <IconIonicons
            style={{ padding: 5 }}
            name={'arrow-back'}
            size={35}
            color={'black'}
            onPress={() => {
              navigation.navigate('Welcome');
            }}
          />
        </View>

        <View style={{ flex: 0.9, justifyContent: 'center' }}>
          <Text style={styles.headerText}>Search</Text>
        </View>
      </View>
      <View style={styles.body}>
      <View style={{padding:10}}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        </View>
         <View style={{marginRight:25,alignContent:'center',marginTop:15}}>
        <Text>{list}</Text>
        </View>
      </View>
    </View>
    </ SafeAreaView >
  );
};
const styles = StyleSheet.create({
  header: {
    flex: .7,
    margin: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    //borderWidth:1,
    elevation: 6,
    
  },
  body: {
    flex: 9,
    //borderWidth:1,
    
  },
  headerText: {
    flex: 1,
    color: 'black',
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  collection: {
    // borderColor: 'red',
    // borderWidth: 1,
    height: 80,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignContent: 'center',
    margin: 15,
    borderWidth:1
    
  },
  image: {
    width: '60%',
    height: '90%',
    borderRadius: 80,
  },
  pressImage:{
    flex:0.3,
    padding:9
  },
  pressText:{
    flex:0.7,
    justifyContent:'center'
  },
  userText:{
    fontWeight:'bold',
    fontSize:20
  }
});

export default Chats;
