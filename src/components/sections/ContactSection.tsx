import { useState } from "react";
import { Copy, GitBranch, Mail, Send, UserPenIcon } from "lucide-react";
import { Toast } from "../ui";

export function ContactSection() {
  const [toastOpen, setToastOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("italofernandesvm@gmail.com");
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Mensagem de ${form.nome}`);
    const body = encodeURIComponent(
      `Nome: ${form.nome}\nE-mail: ${form.email}\n\n${form.mensagem}`
    );
    window.open(
      `mailto:italofernandesvm@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    setEnviado(true);
    setForm({ nome: "", email: "", mensagem: "" });
  };

  return (
    <section className="space-y-10 page-transition">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Vamos conversar?
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xl">
          Aberto a projetos freelance, colaborações e conversas sobre tecnologia.
          Respondo em até 48h.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Formulário */}
        <div className="md:col-span-3">
          {enviado ? (
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-2">
              <p className="text-2xl">🌱</p>
              <p className="font-semibold text-emerald-500">Mensagem enviada!</p>
              <p className="text-sm text-neutral-400">
                Seu cliente de e-mail foi aberto com a mensagem pronta.
              </p>
              <button
                onClick={() => setEnviado(false)}
                className="text-xs text-neutral-400 hover:text-accent transition-colors mt-2"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-neutral-400">
                  Seu nome
                </label>
                <input
                  type="text"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="João Silva"
                  className="bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-neutral-400">
                  Seu e-mail
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="joao@email.com"
                  className="bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-neutral-400">
                  Mensagem
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.mensagem}
                  onChange={(e) =>
                    setForm({ ...form, mensagem: e.target.value })
                  }
                  placeholder="Conte sobre seu projeto ou ideia..."
                  className="bg-lightCard dark:bg-darkCard border border-lightBorder dark:border-darkBorder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accentHover text-white font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="h-4 w-4" />
                Enviar via E-mail
              </button>
            </form>
          )}
        </div>

        {/* Links rápidos */}
        <div className="md:col-span-2 space-y-4">
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Contato direto
          </p>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="w-full p-4 rounded-2xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard hover:border-accent transition-all flex items-center gap-3 group text-left"
          >
            <Mail className="h-4 w-4 text-neutral-400 group-hover:text-accent transition-colors" />
            <div>
              <p className="text-xs text-neutral-400">E-mail</p>
              <p className="text-sm font-mono font-medium">
                italofernandesvm@gmail.com
              </p>
            </div>
            <Copy className="h-3.5 w-3.5 text-neutral-400 group-hover:text-accent transition-colors ml-auto" />
          </button>

          <a
            href="https://github.com/italofvm"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-2xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard hover:border-accent transition-all flex items-center gap-3 group"
          >
            <GitBranch className="h-4 w-4 text-neutral-400 group-hover:text-accent transition-colors" />
            <div>
              <p className="text-xs text-neutral-400">GitHub</p>
              <p className="text-sm font-mono font-medium">@italofvm</p>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/italovm"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-2xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard hover:border-accent transition-all flex items-center gap-3 group"
          >
            <UserPenIcon className="h-4 w-4 text-neutral-400 group-hover:text-accent transition-colors" />
            <div>
              <p className="text-xs text-neutral-400">LinkedIn</p>
              <p className="text-sm font-mono font-medium">Italo Vieira</p>
            </div>
          </a>
        </div>
      </div>

      <Toast open={toastOpen} message="E-mail copiado!" />
    </section>
  );
}
