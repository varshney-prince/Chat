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
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatHistory = ({navigation, route}) => {

    const [user, setUser] = useState('');
    const [userChats, setUserChats] = useState([]);

    let bootstrapData = (data)=>{
        let sampleChat = {
            receiverUsername: 'Harsh',
            lastText: ''
        }
        data.push(sampleChat);
    };
    
    useEffect( ()=>{
        if( route && route.params && route.params.chatUser ){
        const userData = db.ref(`${route.params.chatUser}/ongoing`)
        userData.on('value', (data)=>{
            let snapshot = data.val();
            let chatsContainer = [];
            for(let id in snapshot){
                chatsContainer.push({id, ...snapshot[id]})
            }
            if( chatsContainer.length == 0 ){
                bootstrapData(userData);
            }
            setUserChats(chatsContainer);
        } )
        }
        else{ return ; }
    } , [] );

    let chats = userChats.map( (item, index)=>{
        return (<TouchableOpacity onPress={
            ()=>{navigation.navigate('OngoingChat', 
                {
                senderID : route.params.chatUserID,
                senderName : route.params.chatUser,
                receiverID : item.id,
                receiverName : item.receiverUsername
                } ) }
        } >
            <View style={styles.chat} >
              <View style={{flexDirection: "row"}} >
                <MaterialIcons name={'account-arrow-right'} size={28} />
                <Text style={styles.chatReceiverName} >{item.receiverUsername}</Text>
              </View>
                <Text style={styles.previewText} >{item.lastText}</Text>
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
            <TouchableOpacity style={styles.addChatButton} onPress={()=>{navigation.navigate('chatSearch'
            , {requestMaker: route.params.chatUser, requestID : route.params.chatUserID }) }} >
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
          fontSize: 20,
          marginBottom: 5,
          marginLeft: 5
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