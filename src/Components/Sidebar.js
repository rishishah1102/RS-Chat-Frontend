import React, { useState } from 'react';
import '../CSS/Sidebar.css';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, IconButton } from '@mui/material';
import SidebarChat from './SidebarChat';
import { useNavigate } from 'react-router-dom';
import ChangeSidebarProfile from './ChangeSidebarProfile';
import Tooltip from '@mui/material/Tooltip';

function Sidebar({ contacts, info, onSelected }) {
    const Navigate = useNavigate();
    const [newChatClick, setNewChatClick] = useState(false);
    const [profileClick, setProfileClick] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(info.profilePhoto);

    const handleClick = (click) => {
        setProfileClick(click);
    }

    const handleProfilePhoto = (photo) => {
        setProfilePhoto(photo);
    }

    return (
        <div className='sidebar'>
            <div className="sidebarHeader">
                <span onClick={() => { setProfileClick(!profileClick) }}>
                    <Tooltip title="Click here">
                        <Avatar src={profilePhoto} style={{ cursor: "pointer" }} />
                    </Tooltip>
                </span>
                <div className={`sidebarHeaderDropdown sidebarProfile ${profileClick && 'changeProfile'}`}>
                    <ChangeSidebarProfile profilePhoto={profilePhoto} click={handleClick} handlePhoto={handleProfilePhoto} />
                </div>
                <div className="sidebarHeaderRight">
                    <span onClick={() => { setNewChatClick(!newChatClick) }} className='icons'>
                        <Tooltip title="Contacts">
                            <IconButton>
                                <ChatIcon />
                            </IconButton>
                        </Tooltip>
                    </span>
                    <div className={`sidebarHeaderDropdown contact ${newChatClick && 'show'}`}>
                        <ul className='sidebarList'>
                            {contacts.map((contact, index) => {
                                return (
                                    <li key={index} className='sidebarListItem' onClick={() => { onSelected(contact.name); setNewChatClick(!newChatClick) }}>
                                        <Avatar src={contact.profilePhoto} />
                                        <h4>{contact.name}</h4>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <span className='icons' onClick={() => { localStorage.clear('rschattoken'); Navigate('/') }}>
                        <Tooltip title="Logout">
                            <IconButton>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </span>
                </div>
            </div>
            <div className="sidebarSearch">
                <div className="sidebarSearchContainer">
                    <h2>Welcome To RS-Chat</h2>
                </div>
            </div>

            <div className="sidebarChats">
                {info.chats.length === 0 ?
                    <div style={{ position: 'relative', top: "10px" }}><h2 style={{ textAlign: "center" }}>Start a new Conversation</h2></div>
                    :
                    info.chats.map((chat, index) => {
                        let lastMess, timeStamp, lastMessageSender, profilePhoto;
                        contacts.map((contact) => {
                            if (contact.name === chat.name) {
                                profilePhoto = contact.profilePhoto;
                            }
                            return null;
                        });
                        chat.chatting.map((lastMessage, index) => {
                            if (index === chat.chatting.length - 1) {
                                lastMessageSender = lastMessage.name;
                                lastMess = lastMessage.message;
                                timeStamp = lastMessage.timeStamp;
                            }
                            return null;
                        });
                        return <SidebarChat name={chat.name} lastMessName={lastMessageSender} profilePhoto={profilePhoto} select={onSelected} lastMessage={lastMess} timeStamp={timeStamp} key={index} />;
                    })
                }

            </div>
        </div>
    );
};

export default Sidebar;