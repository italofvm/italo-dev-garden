import { X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export function Toast({ message, type = "info", onClose }: ToastProps) {
  const bgColor = {
    success: "bg-green-100 dark:bg-green-900/30",
    error: "bg-red-100 dark:bg-red-900/30",
    info: "bg-blue-100 dark:bg-blue-900/30",
  }[type];

  const textColor = {
    success: "text-green-800 dark:text-green-300",
    error: "text-red-800 dark:text-red-300",
    info: "text-blue-800 dark:text-blue-300",
  }[type];

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg flex items-center gap-3 ${bgColor} ${textColor}`}>
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
