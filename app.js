const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');

app.use('/gp1', express.static(path.join(__dirname, 'public')));
app.use('/gp2', express.static(path.join(__dirname, 'public')));

const server = app.listen(3000, ()=>{ console.log("Running") });

const messages = { gp1: [], gp2: [] };

const io = socketIO(server);

const gp1 = io.of('/gp1').on('connection', (socket)=> {
    console.log('new connection');
    socket.emit('update_messages', messages.gp1);

    socket.on('new_message', (data)=> {
        messages.gp1.push(data);
        console.log(messages);
        gp1.emit('update_messages', messages.gp1);
    });
})

const gp2 = io.of('/gp2').on('connection', (socket)=> {
    console.log('new connection');
    socket.emit('update_messages', messages.gp2);

    socket.on('new_message', (data)=> {
        messages.gp2.push(data);
        console.log(messages);
        gp2.emit('update_messages', messages.gp2);
    });
})





// io.on('connection', (socket)=> {
//     console.log('new connection');
//     socket.emit('update_messages', messages);

//     socket.on('new_message', (data)=> {
//         messages.push(data);
//         console.log(messages);
//         io.emit('update_messages', messages);
//     })
// })