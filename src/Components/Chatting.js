import React, { useEffect, useState } from 'react';
import '../CSS/Chatting.css'
import { Avatar, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import instance from '../Utils/axios';
import ScrollToBottom from 'react-scroll-to-bottom';
import EmojiPicker from 'emoji-picker-react';

function Chatting({ message, contact, myName, onPressBack }) {
    const date = new Date();
    const hours = date.getHours();
    const hours12 = hours === 12 ? '12' : hours % 12;
    const minutes = date.getMinutes();

    const [input, setInput] = useState("");
    const [menuClick, setMenuClick] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [contProfilePhoto, setContProfilePhoto] = useState("");

    useEffect(() => {
        if (contact.profilePhoto !== undefined || contact.profilePhoto !== "") {
            setContProfilePhoto(contact.profilePhoto);
        }
    }, [contact.profilePhoto]);

    const handleChange = (e) => {
        if (setShowEmoji === true) {
            setShowEmoji(false);
        }
        setInput(e.target.value);
    }

    const handleEmojiClick = (emoji) => {
        setInput(prev => prev + emoji.emoji);
    }

    const clearChat = () => {
        instance.post('/deleteChat', { name: contact.name }, { headers: { Authorization: localStorage.getItem('rschattoken') } });
        setMenuClick(!menuClick);
    }

    const handleSend = () => {
        instance.post('/chatting', {
            myName: myName,
            name: contact.name,
            chatterPhoneNumber: contact.phoneNumber,
            chatting: {
                message: input,
                name: myName,
                timeStamp: `${hours12}:${minutes} ${hours > 12 ? "pm" : 'am'}`,
            }
        }, { headers: { Authorization: localStorage.getItem('rschattoken') } });
        setInput('');
    }

    return (
        <div className='chatting'>
            <div className="chattingHeader">
                <Avatar style={{ cursor: "pointer" }} src={contProfilePhoto} />
                <div className="chattingHeaderInfo">
                    <h3>{contact.name}</h3>
                    <p>{contact.description}</p>
                </div>
                <div className="chattingHeaderRight">
                    <span onClick={() => { onPressBack("") }}>
                        <Tooltip title="Back Button">
                            <IconButton>
                                <ArrowBackIcon />
                            </IconButton>
                        </Tooltip>
                    </span>
                    <span onClick={() => { setMenuClick(!menuClick)} }>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </span>
                    <div className={`chattingDropdown ${menuClick && 'show'}`}>
                        <ul className="chattingList">
                            <li className="chattingListItem" onClick={() => { clearChat() }}><h4>Clear Chat</h4></li>
                        </ul>
                    </div>
                </div>
            </div>

            <ScrollToBottom className="chattingBody">
                <div>
                    {message && message.map((msg, index) => {
                        return (
                            <div className={`chattingMessage ${msg.name === myName && "chatSender"}`} key={index}>
                                <span className='chattingPersonName'>{msg.name === myName ? "You" : msg.name}</span>
                                {msg.message}
                                <span className='chattingTimestamp'>{msg.timeStamp}</span>
                            </div>
                        );
                    })}
                </div>
            </ScrollToBottom>


            <div className="chattingFooter">
                <span onClick={() => { setShowEmoji(!showEmoji) }} style={{ cursor: "pointer" }}>
                    <InsertEmoticonIcon />
                </span>
                <div className={`emoji ${showEmoji && 'showEmoji'}`} >
                    <EmojiPicker width={'250px'} height={'400px'} onEmojiClick={handleEmojiClick} />
                </div>
                <form>
                    <input
                        type="text"
                        value={input}
                        onChange={handleChange}
                        placeholder="Type a message"
                    />
                </form>
                <button onClick={() => { handleSend() }}><SendIcon /></button>
            </div>
        </div>
    );
};

export default Chatting;