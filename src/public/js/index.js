//Creamos una instacia de socket.io desde el lado del cliente

const socket = io();
const { logger } = require("./utils/logger.js");

//Creamos una variable para guardar el usuario.
let user;

const chatBox = document.getElementById("chatBox");

//Utilizamos Sweet alert para el mensaje de bienvenida

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa un usuario para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre para continuar";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

//Envio de mensajes

const { logger } = require("./utils/logger.js"); // Asegúrate de importar el logger adecuadamente

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    logger.debug(chatBox.value);
    logger.debug(user);

    if (chatBox.value.trim().length > 0) {
      logger.info("Mensaje enviado al servidor");
      logger.info(chatBox.value.trim());
      logger.info(user);

      // Enviamos el mensaje al servidor a través de socket.io
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

//listerner de mensajes

socket.on("message", (data) => {
  const log = document.getElementById("messagesLogs");
  let messages = "";

  if (Array.isArray(data)) {
    data.forEach((message) => {
      messages += `${message.user}: ${message.message} <br>`;
    });
  } else {
    console.error("Los datos recibidos no son un array:", data);
  }

  log.innerHTML = messages;
});
