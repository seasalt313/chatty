
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
