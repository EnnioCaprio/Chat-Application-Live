import React from 'react'

const Messages = (props) => {
    
    const username = JSON.parse(sessionStorage.getItem('users')).username

    return(
        <div className={props.text.username === username ? 'profile-message' : 'other-message'}>
            <div className="container-message">
                <h3 className="msg-username">{props.text.username}</h3>
                {
                    props.text.message ? <h3 className="msg-message">{props.text.message}</h3> : <a href={props.text.position} target="_blank" className="msg-position">Position</a>
                }
                <h4 className="msg-time">{props.text.createdAt}</h4>
            </div>
        </div>
    )
}


export { Messages as default }