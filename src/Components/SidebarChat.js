import React, { useState } from 'react';
import '../CSS/SidebarChat.css';
import { Avatar } from '@mui/material';

function SidebarChat({ name, profilePhoto, select, lastMessage, timeStamp, lastMessName }) {
  
  const [click, setClick] = useState(false);

  const customStyle = {
    height: "150px", 
    width: "150px", 
    borderRadius: "0",
    opacity: "1",
    boxShadow: "0 0 5px rgb(0, 0, 0)",
    transition: "all 0.3s ease-in-out"
  }

  const customStyle2 = {
    height: "0px", 
    width: "0px", 
    borderRadius: "0",
    opacity: "0",
    transition: "all 0.3s ease-in-out"
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className='sidebarChat' onClick={() => { select(name); }}>
      <span onMouseOver={() => {setClick(true)}} onMouseOut={() => {setClick(false)}}><Avatar src={profilePhoto} style={{height: "45px", width: "45px"}} /></span>
      <div className='sidebarChatDropdown'>
        <Avatar src={profilePhoto} style={click ? customStyle : customStyle2} />
      </div>
      <div className="sidebarChatInfo">
        <h2>{name}</h2>
        {lastMessage && <p>{lastMessName} : {truncate(lastMessage, 15)}</p>}
      </div>
      <div className="timeStamp">
        <p>{timeStamp}</p>
      </div>
    </div>
  );
};

export default SidebarChat;