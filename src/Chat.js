import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { useEffect, useState } from 'react';
import "./Chat.css";
import { useParams } from "react-router-dom";
import { AttachFile,  MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);



  //   only runs this code when roomID changes. This is done by passing an array as an optional second argument to useEffect.
  useEffect(() => {
    if (roomId) {
      //Get room name.
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      //go through messages and set + order by parameters.
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
    //tell code here to only run based on roomID change
  }, [roomId]);
  // runs code when component loads
  //   generating a new seed for every time component loads
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);


const sendMessage = (e) => {
e.preventDefault();
console.log('you typed ....' , input);

setInput("");
}
    return (
        <div className="chat">

        
            <div className="chat__header">
            <Avatar src={` https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            <p>Last seen at ...</p>
            </div>
            <div className="chat__headerRight">
            <IconButton>
            <SearchOutlined />
            </IconButton>
            <IconButton>
            <AttachFile />
            </IconButton>
            <IconButton>
            <MoreVert />
            </IconButton>
            </div>
            </div>

            <div className="chat__body">
            <p className={`chat__message ${true && "chat__receiver"}`}>
            <span className="chat__name">Temiloluwa</span>
            Hey guys

            <span className="chat__timestamp">3.52pm</span>
            </p>
            </div>

            <div className="chat__footer">
            <InsertEmoticonIcon/>
            <form>
            <input value={input}
                onChange={(e ) => setInput(e.target.value)}
                type="text" placeholder="Type a message" />
            <button onClick={sendMessage} type="submit">Send a message</button>
            </form>
            <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
