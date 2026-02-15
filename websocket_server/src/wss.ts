import { createServer } from "http";
import { Server } from "socket.io";


const PORT = Number(process.env.WEBSOCKET_PORT) || 4000;

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: process.env.NEXT_SERVER_PUBLIC_URL,        
        credentials: true,
    },
    transports: ["websocket"],
});

io.on("connection", (socket) => { 
    console.log("client connected: " + socket.id);

    socket.emit('connected', socket.id);

    socket.on("joinChat", (chatId: string) => { 
        socket.join(chatId);
        console.log(`client ${socket.id} joined chat ${chatId}`);
    });

    socket.on("updateChat", (chatId: string) => {
        io.to(chatId).emit("updateChat");
    })

    socket.on("disconnect", () => {
        console.log("client disconnected: " + socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
}); 
