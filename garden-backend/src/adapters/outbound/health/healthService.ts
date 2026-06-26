import { getDb } from "../../../config/firebase";
import { getAuth } from "firebase-admin/auth";

export interface HealthCheckResult {
  status: "healthy" | "unhealthy";
  timestamp: string;
  database: "ok" | "error";
  auth: "ok" | "error";
  uptime: number;
}

const startTime = Date.now();

export async function checkHealth(): Promise<HealthCheckResult> {
  let dbStatus: "ok" | "error" = "error";
  let authStatus: "ok" | "error" = "error";

  // Testar Firestore
  try {
    const db = getDb();
    await db.collection("health-check").limit(1).get();
    dbStatus = "ok";
  } catch {
    dbStatus = "error";
  }

  // Testar Firebase Auth
  try {
    getAuth();
    authStatus = "ok";
  } catch {
    authStatus = "error";
  }

  const isHealthy = dbStatus === "ok" && authStatus === "ok";

  return {
    status: isHealthy ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    database: dbStatus,
    auth: authStatus,
    uptime: Math.floor((Date.now() - startTime) / 1000),
  };
}
