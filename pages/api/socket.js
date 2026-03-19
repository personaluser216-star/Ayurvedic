import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("⚡ Socket starting...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });

    res.socket.server.io = io;
    global.io = io;

    io.on("connection", (socket) => {
      console.log("✅ Admin connected");
    });
  }

  res.end();
}