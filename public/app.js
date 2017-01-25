(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
          id: 13,
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

},{"./models/chat":2,"./views/chat":3}],2:[function(require,module,exports){
module.exports = Backbone.Model.extend({

    defaults: {
        user: null,
        message: null,
        array: [],
        answer: []
    },

    sendMessage: function(info) {
        this.set('array', info);
        this.trigger('change');
        this.save();
    },


})

},{}],3:[function(require,module,exports){

module.exports = Backbone.View.extend({
    initialize: function () {
    this.model.on('change', this.render, this);
  },

  events: {
    "click #send-message": "postMessage",
  },


  postMessage: function(){
    let hello = [];
    const name = document.querySelector("#inputName").value;
    const message = document.querySelector("#inputmsg").value;
    const parent = document.querySelector("#chatbox");
    const unit = document.querySelector(".message");
    const user = document.createElement("h4");
    const para = document.createElement("p");

    parent.appendChild(user);
    parent.appendChild(para);

    let must = Mustache.render(document.querySelector("#chat-template").innerHTML, {
      name: name,
      message: message,
    })
    console.log(must);
    user.innerHTML = "Name: " + name;
    para.innerHTML = "Message: " + message;

    let completeMsg = name + " " + message;
    console.log(completeMsg);
    hello.push(completeMsg);
    for (let i = 0; i < hello.length; i++) {
      sendMessage(hello[i]);
    }

    // clearInputs(" ");
  },

  // clearInputs: function (string) {
  //   let name = document.querySelector("#inputName");
  //   let message = document.querySelector("#inputmsg");
  //   name.value = string;
  //   message.value = string;
  // },

  render(){
    console.log('rendering');
  },
})

},{}]},{},[1]);
