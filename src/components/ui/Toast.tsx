import { Check } from "lucide-react";

interface ToastProps {
  open: boolean;
  message: string;
}

export function Toast({ open, message }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 bg-accent text-white px-4 py-3 rounded-2xl shadow-xl z-[60] transform transition-all duration-300 flex items-center gap-2.5 pointer-events-none ${
        open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      role="alert"
      aria-live="polite"
    >
      <Check className="w-4 h-4" />
      <span className="text-xs font-semibold">{message}</span>
    </div>
  );
}
