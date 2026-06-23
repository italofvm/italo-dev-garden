import type { ReactNode } from "react";

interface StatusCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  iconClassName?: string;
}

export function StatusCard({
  icon,
  title,
  description,
  iconClassName = "bg-accent/10 text-accent",
}: StatusCardProps) {
  return (
    <div className="p-5 rounded-2xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard flex items-start gap-4">
      <div className={`p-2 rounded-lg ${iconClassName}`}>{icon}</div>

      <div>
        <h3>{title}</h3>
        <p className="text-sm font-medium mt-1">{description}</p>
      </div>
    </div>
  );
}
