import React, { useState, useEffect, useRef} from 'react';
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

const getCurrentTime = ()=>{
  console.log("Let's set time")
  let hours = (new Date()).getHours();
  console.log("hours : "+hours+" length : "+hours.length)
  if( String(hours).length == 1 ){ hours = "0" + hours; }
  let minutes = (new Date()).getMinutes();
  console.log("minutes : "+minutes)
  if( String(minutes).length == 1 ){ minutes = "0" + minutes; }
  return hours + ":" + minutes;
};

//<View style={item.sender ? styles.senderTextContainer : styles.receiverTextContainer } >

export default function OngoingChat({navigation, route}){

    const [currentText, setCurrentText] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [textToSend, setText] = useState('');
    const [handleList, setHandleList] = useState([]);
    const [handle, setHandle] = useState('');
    const [validatedID, setValidatedID] = useState('');
    const scrollViewRef = useRef();
    
    useEffect( ()=>{
        console.log("In ongoing chat");
        console.log(route.params.senderName+" & "+route.params.senderID)
        console.log(route.params.receiverName+" & "+route.params.receiverID)
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
        if(!textToSend){return ;}
        let allChats = db.ref('sample/chats');
        let receiverChats = db.ref('sample/receiverChats');
        let senderHandle = db.ref('sample/ongoing/sampleHandle')
        let receiverHandleParent = db.ref('sample/ongoing/receiverHandle')
        if( route && route.params && route.params.senderName ){
            allChats = db.ref(`${route.params.senderName}/${route.params.receiverName}`);
            receiverChats = db.ref(`${route.params.receiverName}/${route.params.senderName}`);
            if(!route.params.receiverID){
              if(!validatedID){
                senderHandle = validateReceiver()
                setValidatedID( senderHandle.getKey() );
              }
              else{ senderHandle = db.ref(`${route.params.senderName}/ongoing`).child                       (validatedID); } 
            }
            else{
              senderHandle = db.ref(`${route.params.senderName}/ongoing`).child         (route.params.receiverID);
            }
            receiverHandleParent = db.ref(`${route.params.receiverName}/ongoing`);
        }
        let newText = {
            time: getCurrentTime(),
            sender: true,
            message: textToSend 
        }
        let receiverText = {
            time: getCurrentTime(),
            sender: false,
            message: textToSend
        }
        let receiverHandle;
        if(!handle){
         receiverHandle = checkAvailableHandle()
        }
        else{
          receiverHandle = handle;
        }
        if(!receiverHandle){
              let tempHandle = addNewSenderHandle(receiverHandleParent, receiverText.message);
              receiverHandle = tempHandle.getKey()
              populateHandleList(receiverHandleParent)
        }
        setHandle(receiverHandle);
        allChats.push(newText);
        receiverChats.push(receiverText);
        senderHandle.update({lastText: newText.message})
        receiverHandleParent.child(receiverHandle).update({lastText: receiverText.message})
        setText('');
    };

    const validateReceiver = ()=> {
      console.log("Inside validate method")
      const newParent = db.ref(`${route.params.senderName}/ongoing`);
      return addNewSenderHandle(newParent, '', route.params.receiverName);
    }

    const checkAvailableHandle = ()=>{
      console.log("Inside check available")
      for(let item of handleList){
        if( item.receiverUsername == route.params.senderName ){
          console.log("Found! Returning")
          return item.id;
        }
      }
      console.log("Nothing found")
      return undefined;
    };

    const addNewSenderHandle = (parent, last, promptName=route.params.senderName) => {
      console.log("Adding new sender handle")
      let newReceiver = {
        receiverUsername: promptName ,
        lastText: last
      }
      return parent.push(newReceiver);
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
                    onPress={() => {navigation.navigate('ChatHistory', {chatUser: route.params.senderName, chatUserID: route.params.senderID } )}}
                />
            </View>
                <View style={{flex: 0.9}}>
                    <Text style={styles.headerText}>{route && route.params &&
                    route.params.receiverName || "No name" }</Text>
                </View>
            </View>
            <View style={styles.body} >
                <View style={styles.scroll}>
                <ScrollView scrollContainerStyle={styles.containerScroll} ref={scrollViewRef}
                    onContentSizeChange={()=>{ scrollViewRef.current.scrollToEnd({animated: true}) }}  >
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