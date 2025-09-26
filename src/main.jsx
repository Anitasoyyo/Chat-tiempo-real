import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
//en éste archivo es donde se monta la app.
//en el indext.html hay un div vacío con id root y es ahí donde se monta la app de React.
//createRoot sirve para crear un contenedor dentro del root.
//.render sirve para renderizar el componente App .Como app está escrito en jsx ,antes de llegar al navegador pasa por babel,vite y webpack y se transforma en javascript puro.
//StrictMode es un componente de React que nos ayuda a detectar problemas en la aplicación y nos avisa de prácticas obsoletas.
