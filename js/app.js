const chatModel = require('./models/chat');
const chatView = require('./views/chat');

window.addEventListener('load', function(){
  const chatRoom = new chatModel();
  const chattyView = new chatView({
    el: document.querySelector("body"),
    model: chatRoom,
  });
  chattyView.render();
});


Backbone.sync = function (method, model) {
    // Somewhere in our code we're trying to save changes to the server.
    if (method === 'create' || method === 'update') {
        const request = new XMLHttpRequest();
        request.open('POST', 'http://api.queencityiron.com/chats');
        request.addEventListener('load', function () {
            const response = JSON.parse(request.responseText);
            console.log(response);
        });

        let message = {
          from: model.get('user'),
          message: model.get('message'),
        }

        request.send(JSON.stringify(message));
    }

    // Somewhere in our code we're trying to get info from the server.
    if (method === 'read') {
        const request = new XMLHttpRequest();
        request.open('GET', 'http://api.queencityiron.com/chats');
        request.addEventListener('load', function () {
            const response = JSON.parse(request.responseText);

            console.log(response);

            // for (let i = 0; i < response.chats.length; i++) {
                // note: i would create an 'id' property in your chatmodel
                // msg = new ChatModel(); <=== make a new ChatModel for each of response.chats
                // msg.set('from', response.chats[i].from);
                // model.add(msg);
            // }
            // lets say response is event info
            // model.set('name', response.name);
            // model.set('attendees', response.attendees);
            // model.set('when', response.when);
            // model.trigger('change');
            model.set('answer', response)
        });
        request.send();
    }
};
