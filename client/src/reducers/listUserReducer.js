const listUserReducer = (state, action) => {
    switch(action.type){
        case 'ADD_LIST':
            return action.user
        default:
            return state
    }
}

export { listUserReducer as default }