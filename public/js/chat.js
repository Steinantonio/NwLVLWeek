document.querySelector("#start_chat").addEventListener("click", (event) => {
  const socket = io();

  const chatHelp = document.getElementById("chat_help");
  chatHelp.style.display = "none";

  const chatInSupport = document.getElementById("chat_in_support");
  chatInSupport.style.display = "block";

  const text = document.getElementById("txt_help").value;
  const email = document.getElementById("email").value;

  socket.on("connect", () => {
    const params = {
      email,
      text
    }

    socket.emit("client_first_access", params, (callback, error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(callback);
      }
    })
  })

  socket.on("client_list_all_messages", (messages) => {
    var template_cliente = document.getElementById("message-user-template").innerHTML;
    var template_admin = document.getElementById("admin-template").innerHTML;

    console.log("messages",messages);

    messages.forEach(message => {
      if (message.admin_id === null) {
        const rendered = Mustache.render(template_cliente, {
          message: message.text,
          email
        })
        document.getElementById("messages").innerHTML += rendered 
      }
    });

  })

});
