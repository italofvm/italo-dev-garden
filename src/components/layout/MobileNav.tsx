import type { ReactNode } from "react";
import { BookOpen, Compass, Home, Terminal } from "lucide-react";
import { navItems, type TabId } from "../../types/navigation";

interface MobileNavProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
}

const iconMap: Record<TabId, ReactNode> = {
  home: <Home className="h-3.5 w-3.5" />,
  garden: <BookOpen className="h-3.5 w-3.5" />,
  lab: <Terminal className="h-3.5 w-3.5" />,
  now: <Compass className="h-3.5 w-3.5" />,
};

export function MobileNav({ activeTab, onChangeTab }: MobileNavProps) {
  return (
    <nav className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-100/90 dark:bg-neutral-900/90 backdrop-blur-md p-1.5 rounded-full border border-lightBorder dark:border-darkBorder flex gap-1 z-50 shadow-lg">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChangeTab(item.id)}
          className={`px-4 py-2 rounded-full text-xs font-medium flex flex-col items-center gap-1 transition-all ${
            activeTab === item.id
              ? "bg-neutral-200/50 dark:bg-neutral-800/50 text-accent"
              : "text-neutral-400"
          }`}
        >
          {iconMap[item.id]}
        </button>
      ))}
    </nav>
  );
}
