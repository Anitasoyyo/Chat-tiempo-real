# Chat en Tiempo Real

Un proyecto de chat en tiempo real desarrollado con **React** y **Socket.IO** que permite a múltiples usuarios comunicarse instantáneamente a través del navegador.

## Capturas de Pantalla

### Pantalla de Login

<img src="../imagenes/login.png" alt="Login" width="400" height="400">

### Chat en Funcionamiento

<img src="../imagenes/chat.png" alt="Chat" width="400" height="400">

## ¿Qué es este proyecto?

Este es un **chat web en tiempo real** donde varios usuarios pueden:

- Conectarse con su nombre y avatar
- Enviar y recibir mensajes instantáneamente
- Ver los mensajes de otros usuarios en tiempo real
- Distinguir entre sus propios mensajes y los de otros usuarios

## Tecnologías Utilizadas

### Frontend (Cliente)

- **React** `v19.1.1` - Librería para crear interfaces de usuario
- **Vite** `v7.1.7` - Herramienta de construcción rápida para desarrollo
- **Socket.IO Client** `v4.8.1` - Para comunicación en tiempo real con el servidor

### Backend (Servidor)

- **Node.js** - Entorno de ejecución de JavaScript en el servidor
- **Express** `v5.1.0` - Framework web para Node.js
- **Socket.IO** `v4.8.1` - Biblioteca para comunicación bidireccional en tiempo real

## Arquitectura del Proyecto

```
chat-app/
├── 📁 src/                    # Código del frontend
│   ├── App.jsx               # Componente principal
│   ├── Chat.jsx              # Componente del chat
│   ├── Login.jsx             # Componente de login
│   └── App.css               # Estilos CSS
├── 📁 public/                # Archivos estáticos
├── server.js                 # Servidor backend
├── package.json              # Dependencias del proyecto
└── vite.config.js           # Configuración de Vite
```

## ¿Cómo Funciona?

### 1. **Cliente (Frontend)**

- El usuario accede desde el navegador
- Introduce su nombre y selecciona un avatar
- Se conecta al servidor mediante WebSockets
- Puede enviar y recibir mensajes en tiempo real

### 2. **Servidor (Backend)**

- Escucha en el puerto `3000`
- Gestiona las conexiones de múltiples usuarios
- Retransmite los mensajes a todos los usuarios conectados
- Maneja eventos de conexión y desconexión

### 3. **Comunicación en Tiempo Real**

```javascript
// Cliente envía mensaje
socket.emit("chat message", mensaje);

// Servidor recibe y retransmite
socket.on("chat message", (msg) => {
  io.emit("chat message", msg); // Envía a todos
});

// Todos los clientes reciben el mensaje
socket.on("chat message", (msg) => {
  // Mostrar mensaje en pantalla
});
```

## Instalación y Ejecución

### Requisitos Previos

- **Node.js** versión 20.19+ o 22.12+

### Pasos para Ejecutar

1. **Clonar o descargar el proyecto**

```bash
# Navega a la carpeta
cd chat-app
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Ejecutar el servidor (Terminal 1)**

```bash
node server.js
```

Verás: `Servidor escuchando en http://localhost:3000`

4. **Ejecutar el cliente (Terminal 2)**

```bash
npm run dev
```

Verás algo como: `Local: http://localhost:5174/`

5. **Abrir en el navegador**

- Ve a `http://localhost:5174`
- ¡Listo para usar el chat!

### Funcionalidades del Chat

- **Login con nombre y avatar**
- **Mensajes en tiempo real**
- **Distinción visual entre usuarios**
- **Colores diferentes para mensajes propios/ajenos**
- **Sistema de bienvenida automático**

### Aspectos Técnicos Importantes

- **WebSockets**: Comunicación bidireccional instantánea
- **Estado de React**: Gestión del estado de mensajes y usuario
- **CSS Responsivo**: Adaptable a diferentes tamaños de pantalla
- **CORS configurado**: Permite conexiones desde el frontend
- **Manejo de errores**: Control de conexiones y desconexiones

## Conceptos Aprendidos

Este proyecto me ha enseñado a:

- **React Hooks** (useState, useEffect)
- **WebSockets y Socket.IO**
- **Comunicación Cliente-Servidor**
- **Gestión del estado en React**
- **CSS para interfaces modernas**
- **Manejo de eventos en tiempo real**
- **Realizar proyecto donde combino frontend y backend**

## Próximas Mejoras

Ideas para expandir el proyecto a futuro y trabajar sobre él:

- [ ] Historial de mensajes persistente
- [ ] Notificaciones de sonido
- [ ] Indicador de "usuario escribiendo"
- [ ] Emojis y reacciones
- [ ] Carga de archivos/imágenes
