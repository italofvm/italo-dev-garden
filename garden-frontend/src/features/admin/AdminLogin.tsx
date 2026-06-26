import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/authApi";

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginAdmin(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-4"
      >
        <h1 className="text-xl font-mono font-bold text-emerald-400">
          _estudio.secreto/login
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail do admin"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
          required
        />

        {error ? <p className="text-xs text-red-400">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 text-zinc-950 font-bold py-3 rounded-lg font-mono text-sm disabled:opacity-50"
        >
          {loading ? "ENTRANDO..." : "ENTRAR"}
        </button>
      </form>
    </div>
  );
}
