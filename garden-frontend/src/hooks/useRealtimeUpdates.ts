import { useEffect } from "react";
import { io, type Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

let socketInstance: Socket | null = null;

export function useRealtimeUpdates(
  onProjectsUpdate: () => void,
  onPostsUpdate: () => void,
  onConfigUpdate: () => void,
  onLeadsUpdate?: () => void,
) {
  useEffect(() => {
    if (!API_URL) return;

    // Conectar ao WebSocket (reutilizar conexão se já existe)
    if (!socketInstance) {
      socketInstance = io(API_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        transports: ["websocket"],
      });

      // Log de conexão
      socketInstance.on("connect", () => {
        // eslint-disable-next-line no-console
        console.log("📡 Conectado ao WebSocket");
      });

      socketInstance.on("disconnect", () => {
        // eslint-disable-next-line no-console
        console.log("📡 Desconectado do WebSocket");
      });
    }

    // Escutar eventos de atualização
    socketInstance.on("projects:updated", onProjectsUpdate);
    socketInstance.on("posts:updated", onPostsUpdate);
    socketInstance.on("config:updated", onConfigUpdate);
    if (onLeadsUpdate) {
      socketInstance.on("leads:updated", onLeadsUpdate);
    }

    // Cleanup: remover listeners
    return () => {
      socketInstance?.off("projects:updated", onProjectsUpdate);
      socketInstance?.off("posts:updated", onPostsUpdate);
      socketInstance?.off("config:updated", onConfigUpdate);
      if (onLeadsUpdate) {
        socketInstance?.off("leads:updated", onLeadsUpdate);
      }
    };
  }, [onProjectsUpdate, onPostsUpdate, onConfigUpdate, onLeadsUpdate]);
}
