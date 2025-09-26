import { useState, useEffect } from "react";
import io from "socket.io-client";

//Conexión al servidor fuera del componente.Si conectásemos dentro del componente ,se va a reconectar cada vez que se renderice el componente(por ej:cuando entre un nuevo mensaje, un nuevo usuario etc..)
//Indicamos el puerto al que se tiene que conectar el servidor de nuevo a pesar de que ya lo habíamos indicado en server.js porque si no lo indicamos aquí ,no se conecta.
const socket = io("http://localhost:3000");

const Chat = ({ user }) => {
  //creamos el componente ,ésta vez con const y lo exportamos al final .
  const [messages, setMessages] = useState([]); //inicializa con un array vacío pq al principio no hay mensajes.
  const [input, setInput] = useState(""); //inicializamos el input en cadena vacía para que aparezca vacío al inicio.

  useEffect(() => {
    // Escuchar historial de mensajes (cuando se conecta por primera vez)
    socket.on("chat history", (msgs) => {
      console.log(" Historial recibido:", msgs.length, "mensajes", msgs);
      setMessages(msgs);
    });

    //usamos useEffect para indicar que socket.io se conecte al servidor y escuche los mensajes entrantes.
    //  Escuchar mensajes del servidor
    socket.on("chat message", (msg) => {
      console.log(" Nuevo mensaje recibido:", msg);
      //  Añadir mensaje al estado
      setMessages((prev) => [...prev, msg]); //ahora la función setMessages se actualiza con el mensaje que llega del servidor y lo añade al array de mensajes previos y el nuevo mensaje que llega (msg).
    });

    // Solicitar historial manualmente después de que el componente esté listo
    setTimeout(() => {
      console.log(" Solicitando historial manualmente...");
      socket.emit("request history");
    }, 200);

    return () => {
      socket.off("chat history");
      //limpieza del efecto para que no se acumulen los mensajes cada vez que se renderice el componente.
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    //es una función que se ejecuta cuando el usuario hace click en el botón enviar o pulsa la tecla enter.
    if (!input.trim()) return; // si el input está vacío ,no hace nada y sale de la función.

    const msg = { user, text: input }; //creamos el objeto msg con el usuario y el texto del input.
    socket.emit("chat message", msg); // enviar al servidor
    setInput(""); // limpiar input
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat - {user.name}</div>

      <div className="chat-messages">
        {/* Mensaje de bienvenida del sistema */}
        <div className="message-row theirs">
          <div className="message-avatar system-avatar">🤖</div>
          <div className="message-bubble theirs">
            <strong>Sistema:</strong> ¡Bienvenido al chat, {user.name}!
          </div>
        </div>

        {messages.length === 0 && <p>No hay mensajes aún...</p>}

        {messages.map((m, i) => {
          const isMyMessage = m.user && m.user.name === user.name;
          return (
            <div
              key={i}
              className={`message-row ${isMyMessage ? "mine" : "theirs"}`}
            >
              {/* Avatar - solo mostrar para mensajes de otros */}
              {!isMyMessage && (
                <div className="message-avatar">
                  <img
                    src={m.user?.avatar}
                    alt={m.user?.name}
                    className="avatar-img"
                  />
                </div>
              )}

              <div
                className={`message-bubble ${isMyMessage ? "mine" : "theirs"}`}
              >
                <strong>{m.user?.name || "Anónimo"}:</strong> {m.text}
              </div>

              {/* Avatar - solo mostrar para mis mensajes */}
              {isMyMessage && (
                <div className="message-avatar">
                  <img
                    src={m.user?.avatar}
                    alt={m.user?.name}
                    className="avatar-img"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          /*verifica si la tecla pulsada es Enter y llama a sendMessage si es así */
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;

// mis mensajes no se estaban mostrando en el chat porque el servidor no estaba corriendo .
//al ejecutar el node server.js en la terminal se inicia el servidor y ya funciona todo correctamente mostrándose los mensajes .
