import { io, Socket } from "socket.io-client";

let socket: Socket | null = null


export function singletonSocket() {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_WS_URL, {
            autoConnect: false,
            transports: ['websocket']
        });
    }

    return socket;
}