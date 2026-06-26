import express from "express";
import "dotenv/config";
import cors from "cors";
import { buildRoutes } from "./adapters/inbound/http/routes";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const allowedOrigins = (process.env.FRONTEND_ORIGINS ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

type CorsOriginCallback = (err: Error | null, allow?: boolean) => void;

const corsOriginDelegate = (
  origin: string | undefined,
  callback: CorsOriginCallback,
) => {
  if (!origin) {
    callback(null, true);
    return;
  }
  if (allowedOrigins.includes(origin)) {
    callback(null, true);
    return;
  }
  callback(new Error("Origin não permitida pelo CORS"));
};

app.use(
  cors({
    origin: corsOriginDelegate,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use((_req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

app.get("/health", (_req: express.Request, res: express.Response) => {
  res.status(200).json({ ok: true });
});

app.use("/api", buildRoutes());

app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🌱 API rodando em http://localhost:${port}`);
});
