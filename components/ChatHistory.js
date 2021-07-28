import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import db from '../config';

import IconIonicons from 'react-native-vector-icons/Ionicons';

const ChatHistory = ({navigation, route}) => {

    const [user, setUser] = useState('');
    const [userChats, setUserChats] = useState([]);

    let bootstrapData = (data)=>{
        let sampleChat = {
            receiverUsername: '',
            lastText: ''
        }
        userChats.push(sampleChat)
    };
    
    useEffect( ()=>{
        if( route && route.params && route.params.chatUser ){
        const userData = db.ref( route.params.chatUser)
        userData.on('value', (data)=>{
            let snapshot = data.val();
            let chatsContainer = [];
            for(let id in snapshot){
                chatsContainer.push({id, ...snapshot[id]})
            }
            setUserChats(chatsContainer);

        } )
        }
        else{ return ; }
    } , [] );

    let chats = userChats.map( (item, index)=>{
        return (<TouchableOpacity>
            <View key={item} style={styles.chat} >
                <Text style={styles.chatReceiverName} >{key.receiverUsername}</Text>
                <Text style={styles.previewText} >{key.lastText}</Text>
            </View></TouchableOpacity>);
    } )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your chats</Text>
            </View>
            <View style={styles.body} >
                <ScrollView style={styles.scroll} contentContainerStyle={styles.containerScroll} >
                {chats}    
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.addChatButton}>
                <Text style={styles.addChat} >+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChatHistory;

const styles = StyleSheet.create({
    header: {
        flex: 0.8,
        backgroundColor: 'white',
        justifyContent: 'center',
        textAlign: 'left',
        elevation: 6
      },
      container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
      },
      headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
      },
      body: {
          flex: 8.6,
      },
      scroll: {
          flex: 1
      },
      containerScroll: {

      },
      chat: {
          padding: 20,
          borderBottomColor: 'lightgrey',
          borderBottomWidth: 1
      },
      chatReceiverName: {
          fontWeight: 'bold',
          marginBottom: 5
      },
      addChatButton: {
          backgroundColor: 'blue',
          borderRadius: 50,
          width: 60,
          height: 60,
          textAlign: 'center', 
          justifyContent: 'center',
          position: 'absolute',
          bottom: 20,
          right: 20,
          elevation: 4
      },
      addChat: {
          fontSize: 36,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 8,
          marginLeft: 18
      }
});