import React, { createContext, useReducer, useEffect } from 'react';
import logReducer from '../reducers/logReducer';

export const UserContext = createContext();

export const UserProvider = (props) => {

    const [users, dispatchUser] = useReducer(logReducer, {});

    console.log(users)
    
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('users'));
        if(data){
            dispatchUser({
                type: 'SAVING_USERS',
                data  
            })
        }
    }, [])

    useEffect(() => {
        sessionStorage.setItem('users', JSON.stringify(users));
    }, [users])

    return(
        <UserContext.Provider value={[users, dispatchUser]}>
            {props.children}
        </UserContext.Provider>
    )
}