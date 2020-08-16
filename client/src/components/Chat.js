import React, { useReducer, useEffect, useRef, useContext, useState } from 'react';
import io from 'socket.io-client';
import reducerMessages from '../reducers/reducerMessages';
import Messages from './Messages';
import { UserContext } from '../context/UserContext';
import listUserReducer from '../reducers/listUserReducer';
import SideBar from '../components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const Chat = () => {

    const [users, dispatchUser] = useContext(UserContext);

    const [listUser, dispatchList] = useReducer(listUserReducer, []);

    const { online, username, room } = users

    const [activate, setActivate] = useState(false);

    const [messages, dispatch] = useReducer(reducerMessages, []);

    const history = useHistory();

    const socketRef = useRef();

    const ENDPOINT = window.location.origin;

    const btnPosition = document.querySelector('#position');

    useEffect(() => {
        socketRef.current = io(ENDPOINT);

        socketRef.current.emit('join', ({online, username, room}), (error) => {
            if(error){
                window.alert('cannot log in');
                history.push('/');
            }
        })

        socketRef.current.on('roomData', ({room, user}) => {
            dispatchList({
                type: 'ADD_LIST',
                user
            })
        })

        socketRef.current.on('message', ({id, username, text, createdAt}) => {
            if(username){
                dispatch({
                    type: 'ADD_MESSAGE',
                    id,
                    username,
                    text,
                    createdAt
                })
                scrollDown();
            }
        })

        socketRef.current.on('locationMessages', ({id, username, url, createdAt}) => {
            if(username){
                dispatch({
                    type: 'ADD_LOCATION',
                    id,
                    username,
                    url,
                    createdAt
                })
                scrollDown();
            }
        })

        return () => {
            socketRef.current.disconnect();
        }

    }, [])

    const scrollDown = () => {
        const box = document.querySelector('.messages');
        box.scrollTop = box.scrollHeight;
    }

    const submitMessage = (e) => {
        e.preventDefault();
        const message = document.getElementById('msg').value.trim();
        socketRef.current.emit('chat-message', message)
        document.querySelector('#form').reset();
    }

    const getPosition = () => {
        if(!navigator.geolocation){
            return{
                error: 'browser is not compatible'
            }
        }
        btnPosition.setAttribute('disabled', 'disabled')
        navigator.geolocation.getCurrentPosition(position => {
            const varPosition = `https://google.com/maps?p=${position.coords.latitude},${position.coords.longitude}`;
            socketRef.current.emit('position', varPosition, () => {
                btnPosition.removeAttribute('disabled')
                console.log('position sent')
            })
        })
    }

    return(
        <div className="container-chat">
            <div className="container-module">
                <div className="sub-container-module">
                    <div className="header-module">
                        <h1 className="title-mddule">Chat</h1>
                        <FontAwesomeIcon icon={faBars} size="2x" className="hamburger-module" onClick={() => setActivate(!activate)}/>
                    </div>
                    <div className="messages">
                        {
                            messages.map((m) =>(
                                <Messages 
                                    key={m.id}
                                    text={m}
                                />
                            ))
                        }  
                    </div>
                    <div className="form-message">
                        <form onSubmit={submitMessage} id="form">
                            <div className="form-textarea">
                                <textarea name="message" id="msg" placeholder="Send message..." autoComplete="off"/>
                            </div>
                            <div>
                                <button className="form-button" id="message">Send message</button>
                                <button className="form-button" id="position" onClick={getPosition}>Send position</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container-list" id={activate === true ? 'visible' : ''}>
                <div className="header-list">
                    <h3 className="list-title">Chat information</h3>
                    <h3 className="close-window" onClick={() => setActivate(!activate)}>X</h3>
                </div>
                <div className="list">
                    <div className="list-details">
                        <h3 className="room">Room: {room}</h3>
                        <FontAwesomeIcon icon={faSignOutAlt} size="2x" className="logoff" onClick={() => {
                            sessionStorage.removeItem('users')

                            dispatchUser({
                                type: 'LOGOUT_USER',
                                logout: {}
                            })

                            console.log(users)

                            history.push('/')
                        }}/>
                    </div>
                    <h3 className="list-title">List User <span>({listUser.length})</span></h3>
                    <div className="list-users">
                        {
                            listUser.map((l) => (
                                <SideBar 
                                    key={l.id}
                                    text={l}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export { Chat as default }