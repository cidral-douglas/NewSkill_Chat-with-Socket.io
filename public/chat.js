const room = window.location.pathname.replace(/\//g, '');
const socket = io(`http://localhost:3000/${room}`);

let user = null;
let id = 0;
let users = [];

socket.on('update_messages', (messages)=>{
    updateMessagesOnScreen(messages);
})

function updateMessagesOnScreen(messages) {
    const div_messages = document.querySelector('#messages');

    let list_messages = '<ul>';

    messages.forEach(message=>{
        if(users.indexOf(message.user) === -1) {
            users.push(message.user);
        }

        id = users.indexOf(message.user);
        list_messages += `<li id=i${id}>${message.user}: ${message.msg}</li>`;
        
    });

    console.log(users);

    list_messages += '</ul>';

    div_messages.innerHTML = list_messages;
}

document.addEventListener('DOMContentLoaded', ()=> {

    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        if(!user){
            alert('Defina um usuário');
            return;
        };

        const message = document.forms['message_form_name']['msg'].value;
        document.forms['message_form_name']['msg'].value = '';
        socket.emit('new_message', {user: user, msg: message});
    });

    const userForm = document.querySelector('#user_form');
    userForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        user = document.forms['user_form_name']['user'].value;
        userForm.parentNode.removeChild(userForm);
        
    })
})