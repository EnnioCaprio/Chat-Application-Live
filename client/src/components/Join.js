import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Join = (props) => {
    const [users, dispatchUser] = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    const history = useHistory();

    const setUsers = (e) => {
        e.preventDefault();
        if(username && room){
            dispatchUser({
                type: 'ADD_USER',
                online: true,
                username: username.trim(), 
                room: room.trim()
            })
            history.push('/chat')
        }
    }

    return(
        <div className="container-join">
            <div className="container-form">
                <h1>Join</h1>
                <form onSubmit={setUsers} className="join">
                    <div>
                        <input type="text" className="input-join" value={username || ''} onChange={(e) => setUsername(e.target.value)} placeholder="username" required autoComplete="off"/><br />
                        <input type="text" className="input-join" value={room || ''} onChange={(e) => setRoom(e.target.value)} placeholder="room" required autoComplete="off"/><br />
                    </div>
                    <div>
                        <button className="join-button">Join Chat</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export { Join as default }