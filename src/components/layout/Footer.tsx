import { useEffect, useState } from "react";
import { Copy, GitBranch, UserPenIcon } from "lucide-react";
import { Toast } from "../ui";

export function Footer() {
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (!toastOpen) return;

    const timer = window.setTimeout(() => setToastOpen(false), 2500);
    return () => window.clearTimeout(timer);
  }, [toastOpen]);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("italofernandesvm@gmail.com");
    setToastOpen(true);
  };

  return (
    <>
      <footer className="mt-24 border-t border-lightBorder dark:border-darkBorder pt-8 pb-8 space-y-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="space-y-1">
          <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Vamos criar algo juntos?
          </h4>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="text-lg font-medium hover:text-accent flex items-center gap-2 group transition-all"
          >
            <span>italofernandesvm@gmail.com</span>
            <Copy className="h-4 w-4 text-neutral-400 group-hover:text-accent transition-all" />
          </button>
        </div>

        <div className="flex gap-4 text-sm text-neutral-400">
          <a
            href="https://github.com/italofvm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent flex items-center gap-1.5"
          >
            <GitBranch className="h-4 w-4" /> GitHub
          </a>

          <a
            href="https://linkedin.com/in/italovm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent flex items-center gap-1.5"
          >
            <UserPenIcon className="h-4 w-4" /> LinkedIn
          </a>
        </div>
      </footer>

      <Toast open={toastOpen} message="E-mail copiado com sucesso!" />
    </>
  );
}
