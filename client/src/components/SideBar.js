import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const SideBar = (props) => {
    return(
        <div>
            <div className="container-user">
                <h3 className="single-user">{props.text.username} <FontAwesomeIcon icon={faCircle} className={props.text.online === true ? "online" : "offline"} /></h3>
            </div>
        </div>
    )
}


export { SideBar as default }