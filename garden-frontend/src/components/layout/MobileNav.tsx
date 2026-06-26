import { Home, Briefcase, BookOpen, Terminal, Compass, Mail } from "lucide-react";
import { type TabId } from "../../types/navigation";

interface MobileNavProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
}

export function MobileNav({ activeTab, onChangeTab }: MobileNavProps) {
  const navItems = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "projects" as const, icon: Briefcase, label: "Projects" },
    { id: "garden" as const, icon: BookOpen, label: "Garden" },
    { id: "lab" as const, icon: Terminal, label: "Lab" },
    { id: "now" as const, icon: Compass, label: "Now" },
    { id: "contact" as const, icon: Mail, label: "Contact" },
  ];

  return (
    <nav 
      className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-100/90 dark:bg-neutral-900/90 backdrop-blur-md p-1.5 rounded-full border border-lightBorder dark:border-darkBorder flex gap-1 z-50 shadow-lg"
      aria-label="Mobile navigation"
    >
      {navItems.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChangeTab(id)}
          aria-label={label}
          aria-current={activeTab === id ? "page" : undefined}
          className={`px-4 py-2 rounded-full text-xs font-medium flex flex-col items-center gap-1 transition-all ${
            activeTab === id
              ? "bg-accent text-white shadow-md"
              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </nav>
  );
}
