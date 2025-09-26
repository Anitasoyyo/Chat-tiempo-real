import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    //los cors dan el ok al navegador para que pueda conectarse al servidor
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST"],
  },
}); //los cors permiten que el frontend hagan la petición al backend.

//un middleware es una función que se ejecuta cada vez que llega una petiión al servidor.
// Middleware de express para logging
app.use((req, res, next) => {
  //recibe 3 parámetros: la petición, la respuesta y next que es una función que se llama para pasar al siguiente middleware.
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
}); //con new Date().toISOString() creamos un objeto con la fecha y hora actual y toISOString lo convierte a un formato estándar.
//req.method : el método HTTP de la petición: "GET", "POST", "PUT", etc.
//req.url : la URL de la petición.Por ejemplo /login o /chat.

//app.use es otro middleware que se ejecuta cuando hay un error en la petición.
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
  next(); //error500 significa que el servidor falló, no el cliente.
});
//a continuación se ejecutan los sockets
const historialMensajes = [];
io.on("connection", (socket) => {
  console.log(`Un usuario conectado: ${socket.id}`);

  // Enviar historial con un pequeño delay para asegurar que el cliente esté listo
  setTimeout(() => {
    console.log(
      `Enviando historial de ${historialMensajes.length} mensajes a ${socket.id}`
    ); //enviamos el historial de mensajes al cliente que se acaba de conectar y el .length es para saber cuántos mensajes hay en el historial.
    socket.emit("chat history", historialMensajes);
  }, 100); //100 milisegundos de delay para que el cliente tenga tiempo de estar listo.
  //socket.emit envía un evento al cliente que se acaba de conectar con el historial de mensajes.
  socket.on("chat message", (msg) => {
    //socket.on escucha un evento específico que envía el usuario al servidor.
    console.log("Mensaje recibido:", msg); //lo mostramos por consola para ver que llega.
    historialMensajes.push(msg); //añadimos el mensaje al array de mensajes.
    io.emit("chat message", msg); // con io.emit emitimos el mensajes a todos los usuarios.
  });

  // Escuchar solicitud del historial
  socket.on("request history", () => {
    console.log(`Cliente ${socket.id} solicita historial manualmente`);
    socket.emit("chat history", historialMensajes);
  });
  //socket.on escucha un evento específico que envía el usuario al servidor como desconectarse.
  socket.on("disconnect", () => {
    //escucha que ese cliente se desconectó.
    console.log(`Un usuario se desconectó: ${socket.id}`);
  });

  socket.on("error", (error) => {
    //escucha si hay un error en el socket.
    console.error("Socket error:", error);
  });
});

server //asignamos el puerto 3000 para el servidor
  .listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
  })
  .on("error", (err) => {
    //escucha si hay un error al iniciar el servidor.
    console.error("Error al iniciar servidor:", err);
  });

//usamos dos middlewares : uno para logging y otro para manejo de errores (si los hubiese).
//FUNCIONAMIENTO//
//cuando el usuario escribe "hola qué tal" el servidor recibe el objeto{user:"Ana",text:"hola qué tal"}
//y lo reenvía a todos los clientes conectados con io.emit("chat message", msg);
//el cliente recibe el mensaje con socket.on("chat message", handleMessage); en Chat.jsx
//y lo añade al estado de mensajes con setMessages((prev) => [...prev, msg]);
//io.on escucha eventos globales y socket.on escucha eventos de un socket concreto/específico .Escucha a ese cliente
//io.emit envía el mensaje a todos los clientes conectados y socket.emit envía el mensaje a ese cliente concreto.
