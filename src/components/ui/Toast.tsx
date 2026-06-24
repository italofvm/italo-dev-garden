import { Check } from "lucide-react";

interface ToastProps {
  open: boolean;
  message: string;
}

export function Toast({ open, message }: ToastProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed bottom-6 right-6 bg-accent text-white px-4 py-3 rounded-2xl shadow-xl z-[60] flex items-center gap-2.5 pointer-events-none ${
        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transition: "opacity 0.3s ease, transform 0.3s ease" }}
    >
      <Check className="w-4 h-4" />
      <span className="text-xs font-semibold">{message}</span>
    </div>
  );
}
