const express = require('express');
const env = require('dotenv');
const app = express();
const http = require('http');
const socket = require('socket.io');
const { generateMessages, generatePosition } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users'); 
const uuid = require('uuid');

const url = window.location.origin;

env.config();

const server = http.createServer(app);
const io = socket(server);


const port = process.env.PORT || 5000;


io.on('connection', (socket) => {


    socket.on('join', ({online, username, room}, callback) => {
        const { error, user } = addUser({id: socket.id, online, username, room})

        
        if(error){
            return callback(error)
        }

        socket.join(user.room);

        socket.emit('message', generateMessages(uuid.v4(), 'Admin', 'Welcome to the users'));

        socket.broadcast.to(user.room).emit('message', generateMessages(uuid.v4(), 'Admin', `${user.username} has joined in the current chat`));

        io.to(user.room).emit('roomData', {
            room: user.room,
            user: getUsersInRoom(user.room)
        })

        callback();

    })

    socket.on('chat-message', message => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', generateMessages(uuid.v4(), user.username, message))
    })

    

    socket.on('position', (position, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('locationMessages', generatePosition(uuid.v4(), user.username, position))

        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', generateMessages(uuid.v4(),'Admin',`${user.username} has left the current chat`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                user: getUsersInRoom(user.room)
            })
        }

    })
})

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (request, response) => {
		response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
	});
}

server.listen(port, () => {
    console.log('listening on port:', port)
})