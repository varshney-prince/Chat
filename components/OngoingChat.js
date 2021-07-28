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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

//<View style={item.sender ? styles.senderTextContainer : styles.receiverTextContainer } >

const OngoingChat = ({navigation, route}) => {

    const [currentText, setCurrentText] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [textToSend, setText] = useState('');
    
    useEffect( ()=>{
        let allChats = db.ref('sample/chats');
        if( route && route.params && route.params.senderName ){
             allChats = db.ref(`{route.params.senderName}/{route.params.receiverID}/chats`);
        }
        allChats.on('value', (data)=>{
            let snapshot = data.val();
            let tempChats = [];
            for(let id in snapshot){
                tempChats.push({id, ...snapshot[id]});
            }
            setChatLog(tempChats);
        } );
    } , [] );

    const texts = chatLog.map( (item, index)=>{
        return (  <View style={{marginVertical: 2, marginHorizontal: 5}} >
             <View style={item.sender ? styles.senderTextContainer : styles.receiverTextContainer} >
                <Text style={{fontSize: 10}}>{item.time}</Text>
                <Text>{item.message}</Text>
            </View>
            </View>
        );
    } );

    const addText = ()=>{
        let allChats = db.ref('sample/chats');
        if( route && route.params && route.params.senderName ){
            allChats = (`{route.params.senderName}/{route.params.receiverID}/chats`);
        }
        let newText = {
            time: (new Date()).getHours() + ':' + (new Date()).getMinutes(),
            sender: true,
            message: textToSend 
        }
        allChats.push(newText);
        setText('');
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
                <View style={{flex: 0.9}}>
                    <Text style={styles.headerText}>{route && route.params &&
                    route.params.receiverName || "No name" }</Text>
                </View>
            </View>
            <View style={styles.body} >
                <View style={styles.scroll}>
                <ScrollView scrollContainerStyle={styles.containerScroll} >
                    {texts}
                </ScrollView>
                </View>
                <View style={styles.bottom} >
                <TextInput style={styles.input} placeholder="Type a message" 
                 value={textToSend} onChangeText={(text)=>setText(text)}/>
                <TouchableOpacity style={styles.sendBtn} onPress={addText} >
                    <FontAwesomeIcon name={'send'} size={30} color={'white'} />
                </TouchableOpacity>
            </View>
            </View>
            
        </View>
    );
};

export default OngoingChat;

const styles = StyleSheet.create({
    header: {
        flex: 0.8,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 6,
      },
      container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        padding: 10
      },
      body: {
          flex: 9.2,
          //borderColor: 'green',
          //borderWidth: 3
      },
      scroll: {
          height: '88%',
          //borderColor: 'red',
          //borderWidth: 1,
      },
      containerScroll: {
        
      },
     bottom: {
        flex: 3,
        position: 'absolute',
        bottom: 5,
        width: '100%',
        padding: 5,
        //borderColor: 'red',
        //borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
     },
     input: {
         width: '80%',
         height: 50,
         backgroundColor: 'white',
         padding: 10,
         borderRadius: 20,
         elevation: 4
     },
     sendBtn: {
         backgroundColor: 'blue',
         height: 50,
         width: 50,
         borderRadius: 100,
         justifyContent: 'center',
         paddingLeft: 8,
         marginHorizontal: 4,
         elevation: 6
     },
     senderTextContainer: {
         backgroundColor: 'blue',
         padding: 10, 
         borderRadius: 20,
         marginLeft: 50, 
         alignSelf: 'flex-end'
     },
     receiverTextContainer: {
         backgroundColor: 'white',
         padding: 10, 
         borderRadius: 20,
         marginRight: 50, 
         alignSelf: 'flex-start'
     }
});