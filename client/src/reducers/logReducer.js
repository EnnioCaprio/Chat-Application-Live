const logReducer = (state, action) => {
    switch(action.type){
        case 'ADD_USER':
            return{
                    online: action.online,
                    username: action.username,
                    room: action.room
                }
        case 'LOGOUT_USER':
            return action.logout
        case 'SAVING_USERS':
            return action.data
        default:
            return state
    }
}



export { logReducer as default }