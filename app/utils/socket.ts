import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("https://eat-and-bite-server.onrender.com/", {
      autoConnect: false,
    });
  }
  return socket;
};
