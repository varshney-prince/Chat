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
    const [handleList, setHandleList] = useState([]);
    const [handle, setHandle] = useState('');
    
    useEffect( ()=>{
        let allChats = db.ref('sample/chats');
        let receiverHandleParent = db.ref('sample/ongoing/receiverHandle');
        if( route && route.params && route.params.senderName ){
             allChats = db.ref(`${route.params.senderName}/${route.params.receiverName}`);
             receiverHandleParent = db.ref(`${route.params.receiverName}/ongoing`);
        }
        populateHandleList(receiverHandleParent)
        allChats.on('value', (data)=>{
            let snapshot = data.val();
            let tempChats = [];
            for(let id in snapshot){
                tempChats.push({id, ...snapshot[id]});
            }
            setChatLog(tempChats);
        } );
    } , [] );

    const populateHandleList = (parent)=>{
      parent.once('value', (data)=>{
        let snap = data.val();
        let tempHandles = [];
        for(let id in snap){
          tempHandles.push({id, ...snap[id]})
        }
        setHandleList(tempHandles);
        console.log("Loaded data : "+ handleList);
      } )
    };

    const texts = chatLog.map( (item, index)=>{
        return (  <View style={{marginVertical: 3, marginHorizontal: 5}} >
             <View style={item.sender ? styles.senderTextContainer : styles.receiverTextContainer} >
                <Text style={{fontSize: 10, color: item.sender ? 'white' : 'black'}}>{item.time}</Text>
                <Text style={{color: item.sender ? 'white' : 'black'}} >{item.message}</Text>
            </View>
            </View>
        );
    } );

    const addText = ()=>{
        let allChats = db.ref('sample/chats');
        let receiverChats = db.ref('sample/receiverChats');
        let senderHandle = db.ref('sample/ongoing/sampleHandle')
        let receiverHandleParent = db.ref('sample/ongoing/receiverHandle')
        if( route && route.params && route.params.senderName ){
            allChats = db.ref(`${route.params.senderName}/${route.params.receiverName}`);
            receiverChats = db.ref(`${route.params.receiverName}/${route.params.senderName}`);
            senderHandle = db.ref(`${route.params.senderName}/ongoing`).child(route.params.receiverID);
            receiverHandleParent = db.ref(`${route.params.receiverName}/ongoing`);
        }
        let newText = {
            time: (new Date()).getHours() + ':' + (new Date()).getMinutes(),
            sender: true,
            message: textToSend 
        }
        let receiverText = {
            time: (new Date()).getHours() + ':' + (new Date()).getMinutes(),
            sender: false,
            message: textToSend
        }
        let receiverHandle;
        if(!handle){
          console.log("No handle so searching")
         receiverHandle = checkAvailableHandle()
        }
        else{
          console.log("Handle is available");
          receiverHandle = handle;
        }
        console.log(receiverHandle)
        if(!receiverHandle){
              console.log("No avlbl handles found")
              addNewSenderHandle(receiverHandleParent, receiverText.message);
        }
        setHandle(receiverHandle);
        allChats.push(newText);
        receiverChats.push(receiverText);
        senderHandle.update({lastText: newText.message})
        receiverHandleParent.child(receiverHandle).update({lastText: receiverText.message})
        setText('');
    };

    const checkAvailableHandle = ()=>{
      console.log("Inside check method")
      for(let item of handleList){
        if( item.receiverUsername == route.params.senderName ){
          return item.id;
        }
      }
      return undefined;
    };

    const addNewSenderHandle = (parent, last) => {
      let newReceiver = {
        receiverUsername: route.params.senderName,
        lastText: last
      }
      parent.push(newReceiver);
      console.log("Calling populate method frm add")
      populateHandleList(parent)
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
         backgroundColor: 'skyblue',
         padding: 10, 
         borderRadius: 20,
         marginRight: 50, 
         alignSelf: 'flex-start'
     }
});