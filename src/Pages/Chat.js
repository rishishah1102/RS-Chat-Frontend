import React, { useEffect, useState } from 'react';
import Chatting from '../Components/Chatting';
import Sidebar from '../Components/Sidebar';
import '../CSS/Chat.css'
import instance from '../Utils/axios'
import Logo from '../Images/RS-Chat.png'
import Pusher from 'pusher-js';

let userContact;

function Chat() {
    const [contacts, setContacts] = useState([]);
    const [info, setInfo] = useState({});
    const [name, setName] = useState("");
    const [messages, setMessages] = useState([]);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [newMess, setNewMess] = useState(false);

    useEffect(() => {
        const fetchdata = async () => {
            const request = await instance.get('/chat', { headers: { Authorization: localStorage.getItem('rschattoken') } });
            // console.log(request);
            setContacts(request.data.contacts);
            setInfo(request.data.info);
        }
        fetchdata();

        if (name === "") {
            return;
        }

        if (newMess) {
            setNewMess(false);
            return;
        }
    }, [name, newMess]);

    const handleName = (name) => {
        contacts.map((contact, index) => {
            if (contact.name === name) {
                if (info?.chats?.length === 0) {
                    setMessages([]);
                }
                else {
                    info?.chats?.map((chat) => {
                        if (chat?.name === name) {
                            setMessages(chat.chatting);
                            return null;
                        }
                        return null;
                    });
                }
                userContact = contact;
                return null;
            }
            return null;
        })
        setName(name);
    };

    useEffect(() => {
        const pusher = new Pusher('3a3e8e98f66915a198bd', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('newMessage');
        if (messages.length !== 0) {
            channel.bind('inserted', function (newMessage) {
                setMessages([...messages, newMessage]);
                setNewMess(true);
            });
        }
    }, [messages]);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    return (
        windowSize.innerWidth > 950 ?
            <div className='chat'>
                <div className='chatBody'>
                    <Sidebar contacts={contacts} info={info} onSelected={handleName} />
                    {name ?
                        <Chatting message={messages} myName={info.name} contact={userContact} />
                        :
                        <img src={Logo} alt="Logo" style={{ width: "70%" }} />
                    }
                </div>
            </div>
            :
            <div className="chat">
                <div className="chatBody">

                    {name ?
                        <Chatting message={messages} myName={info.name} contact={userContact} onPressBack={handleName} />
                        :
                        <Sidebar contacts={contacts} info={info} onSelected={handleName} />
                    }
                </div>
            </div>
    );

};

export default Chat;