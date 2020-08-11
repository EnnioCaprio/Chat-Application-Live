let array = [];

const addUser = ({id, online, username, room}) => {

    
    if(!username || !room){
        return{
            error: 'cannot go on'
        }
    }

    const isValid = array.find(u => u.username === username && u.room === room);

    if(isValid){
        return{
            error: 'this user already exists'
        }
    }

    const user = {id, online, username, room};
    
    array.push(user);

    return { user }

}

const removeUser = (id) => {
    const index = array.findIndex(a => a.id === id);

    if(index !== -1){
        return array.splice(index, 1)[0]
    }

}

const getUser = (id) => {
    const user = array.find(u => u.id === id)

    return user
}

const getUsersInRoom = (room) => {
    const users = array.filter(u => u.room === room);

    return users
} 

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
