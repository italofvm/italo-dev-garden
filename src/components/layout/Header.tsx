import { Moon, Sun } from "lucide-react";
import { navItems, type TabId } from "../../types/navigation";

interface HeaderProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
  onToggleTheme: () => void;
}

export function Header({ activeTab, onChangeTab, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-16 md:mb-24">
      <button
        type="button"
        onClick={() => onChangeTab("home")}
        className="text-lg font-semibold tracking-tight hover:text-accent flex items-center gap-2 cursor-pointer"
      >
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
        <span>Italo Vieira</span>
      </button>

      <div className="flex items-center gap-6">
        <nav className="hidden sm:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900/50 p-1 rounded-full border border-lightBorder dark:border-darkBorder">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeTab(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-white dark:bg-darkBg text-neutral-800 dark:text-neutral-100 shadow-xs border border-lightBorder/50 dark:border-darkBorder/50"
                  : "text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2 rounded-lg border border-lightBorder dark:border-darkBorder hover:bg-neutral-100 dark:hover:bg-darkCard transition-all cursor-pointer"
          aria-label="Alternar tema"
        >
          <Sun className="h-4 w-4 hidden dark:block" />
          <Moon className="h-4 w-4 block dark:hidden" />
        </button>
      </div>
    </header>
  );
}
