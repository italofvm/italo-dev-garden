import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ isOpen, title, children, onClose }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex
    items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-lightCard dark:bg-darkCard w-full max-w-2xl rounded-3xl
      border border-lightBorder dark:border-darkBorder shadow-2xl
      p-6 md:p-8 max-h-[85vh] overflow-y-auto relative"
        onClick={(e) => e?.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="h-5 w-5 text-neutral-400 hover:text-accent" />
        </button>

        {title && (
          <h2 className="text-2xl md:text-3xl text-neutral-300 font-bold tracking-tight mb-6 pr-10">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>,
    document.body,
  );
}
