import express from "express";
import cors from "cors";
import { buildRoutes } from "./adapters/inbound/http/routes";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api", buildRoutes());

app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🌱 API rodando em http://localhost:${port}`);
});