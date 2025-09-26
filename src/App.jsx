import { useState, useEffect } from "react";
import Login from "./Login";
import Chat from "./Chat";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Efecto para cambiar la clase del body según el modo
  useEffect(() => {
    if (user) {
      document.body.className = "chat-mode";
    } else {
      document.body.className = "login-mode";
    }
  }, [user]);

  return (
    <div className={`app-container ${user ? "chat-mode" : "login-mode"}`}>
      {!user ? <Login onLogin={setUser} /> : <Chat user={user} />}
    </div>
  );
}

export default App;
// desde App.jsx manejamos el usuario si está logueado o no y por eso creamos el useState para inicializarlo en null
//porque al principio nunca hay usuario logueado
//despues valoramos si hay usuario logueado y si lo hay :usamos el Login y si no lo hay :usamos el Chat .
