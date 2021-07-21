import React from 'react';
import { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';
function SidebarChat({addNewChat, name, id}) {
    const [seed, setSeed ] = useState('');
    const [messages, setMessages] = useState("");

    //runs when the id changes. Gets all the messages.
    useEffect(() => {
      // if ID exists
      if (id) {
        db.collection("rooms")
          .doc(id)
          .collection("messages")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
          );
      }
    }, [id]);

    useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000))
    }, []);

const createChat = () => {
const roomName = prompt('Please enter name for chat');
if (roomName) {
    //do some clever database stuff here
    db.collection( 'rooms').add({
        name: roomName,

    })
}
};
    return !addNewChat ? (
           //Create dynamic url to room with that id.
    <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>          {/* Sets message to the last message sent. index 0 because its sorted as descending when fetched. */}
            {[messages[0]?.message]}</p>
            </div>
        </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat" >
        <h2>Add new chat</h2>
        </div>
    );
}

export default SidebarChat
