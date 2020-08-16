const reducerMessages = (state, action) => {
    switch(action.type){
        case 'ADD_MESSAGE':
            return[
                ...state,
                {
                    id: action.id,
                    username: action.username,
                    message: action.text,
                    createdAt: action.createdAt
                }
            ]
        case 'ADD_LOCATION':
            return[
                ...state,
                {
                    id: action.id,
                    username: action.username,
                    position: action.url,
                    createdAt: action.createdAt
                }
            ]
        default:
            return state
    }
}


export { reducerMessages as default }