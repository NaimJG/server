const net = require('net'); // Modulo nativo de Node.js para crear servidores TCP

// Creacion del servidor TCP
// net.createServer() crea un servidor que escucha conexiones entrantes
// Cada vez que un cliente se conecta, se ejecuta el callback con un objeto de "socket".
const server = net.createServer((socket) => {

    // Se obtiene la direccion IP y el puerto del cliente conectado
    console.log(`Cliente conectado desde ${socket.remoteAddress}:${socket.remotePort}`);

    // Evento que se dispara cuando el servidor recibe datos del cliente
    socket.on('data', (data) => {
        console.log(`Datos recibidos: ${data}`);

        // socket.write() envia datos al cliente a traves de la conexion TCP
        // En este caso se implementa un "ECHO SERVER" que devuelve el mismo mensaje
        const response = `[ECHO-SERVER] > ${data}`;
        socket.write(response);
    });

    // Evento cuando el cliente finaliza el envio de datos
    socket.on('end', () => {
        console.log('Cliente desconectado');
    });

    // Evento cuando la conexion se cierra completamente
    socket.on('close', () => {
        console.log('Conexion cerrada')
    })

    // Manejo de errores en la conexion
    socket.on('error', (err) => {
        console.error('Error en la conexion: ', err.message);
    });
});

// Puerto donde escucha
const PORT = 3000;
const HOST = '127.0.0.1';

// Inicio del servidor
server.listen(PORT, HOST, () => {
    const address = server.address();
    console.log(`Servidor escuchando en puerto ${address.address}:${address.port}`);
});