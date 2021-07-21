import React from 'react';
import { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';
function SidebarChat({addNewChat, name, id}) {
    const [seed, setSeed ] = useState('');

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
            <p>last message ...</p>
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
