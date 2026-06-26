import rateLimit from "express-rate-limit";

export const leadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Muitas tentativas. Tente novamente em alguns minutos.",
  },
});

// Rate limiter para operações de escrita autenticadas (POST/PUT/DELETE).
// 30 requisições por minuto é mais que suficiente para uso pessoal
// e bloqueia abusos ou ataques de força bruta contra a API admin.
export const adminWriteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Muitas operações em sequência. Aguarde um momento.",
  },
});