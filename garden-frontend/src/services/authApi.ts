const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

interface FirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
  email: string;
}

function ensureApiKey() {
  if (!FIREBASE_API_KEY) {
    throw new Error("VITE_FIREBASE_API_KEY não configurada no .env");
  }
}

function mapFirebaseError(code?: string) {
  switch (code) {
    case "EMAIL_NOT_FOUND":
    case "INVALID_PASSWORD":
    case "INVALID_LOGIN_CREDENTIALS":
      return "E-mail ou senha inválidos.";
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "Muitas tentativas. Tente novamente mais tarde.";
    default:
      return "Não foi possível autenticar no Firebase.";
  }
}

export async function loginAdmin(email: string, password: string) {
  ensureApiKey();

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    },
  );

  if (!response.ok) {
    const data = (await response.json()) as {
      error?: { message?: string };
    };
    throw new Error(mapFirebaseError(data.error?.message));
  }

  const data = (await response.json()) as FirebaseAuthResponse;
  const expiresAt = Date.now() + Number(data.expiresIn) * 1000;

  localStorage.setItem("admin_token", data.idToken);
  localStorage.setItem("admin_email", data.email);
  localStorage.setItem("admin_token_exp", String(expiresAt));
}

export function logoutAdmin() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_email");
  localStorage.removeItem("admin_token_exp");
}

export function isAdminAuthenticated() {
  const token = localStorage.getItem("admin_token");
  const exp = Number(localStorage.getItem("admin_token_exp") ?? 0);
  return Boolean(token) && exp > Date.now();
}
