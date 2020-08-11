const moment = require('moment');

const generateMessages = (id, username, text) => {
    return{
        id,
        username,
        text,
        createdAt: moment(new Date().getTime()).format('hh:mm:ss a')
    }
}

const generatePosition = (id, username, url) => {
    return{
        id,
        username,
        url,
        createdAt: moment(new Date().getTime()).format('hh:mm:ss a')
    }
}

module.exports = {
    generateMessages,
    generatePosition
}