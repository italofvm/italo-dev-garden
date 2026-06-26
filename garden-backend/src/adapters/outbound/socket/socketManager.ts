import type { Server as SocketIOServer, Socket } from "socket.io";

let io: SocketIOServer | null = null;

export function initializeSocket(socketServer: SocketIOServer): void {
  io = socketServer;

  io.on("connection", (socket: Socket) => {
    // eslint-disable-next-line no-console
    console.log(`📡 Socket conectado: ${socket.id}`);

    socket.on("disconnect", () => {
      // eslint-disable-next-line no-console
      console.log(`📡 Socket desconectado: ${socket.id}`);
    });
  });
}

// Emitir evento quando dados são atualizados
export function broadcastUpdate(event: string, data?: unknown): void {
  if (!io) {
    console.warn("⚠️ Socket.io não inicializado");
    return;
  }

  io.emit(event, data);

  // Log para auditoria
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify({
      type: "SOCKET_BROADCAST",
      event,
      timestamp: new Date().toISOString(),
    }),
  );
}
