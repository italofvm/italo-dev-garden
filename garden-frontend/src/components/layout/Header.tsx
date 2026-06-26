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
        aria-label="Italo Vieira - Go to home"
        aria-current={activeTab === "home" ? "page" : undefined}
        className="text-lg font-semibold tracking-tight hover:text-accent flex items-center gap-2 cursor-pointer"
      >
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true"></span>
        <span>Italo Vieira</span>
      </button>

      <div className="flex items-center gap-6">
        <nav 
          className="hidden sm:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900/50 p-1 rounded-full border border-lightBorder dark:border-darkBorder"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeTab(item.id)}
              aria-current={activeTab === item.id ? "page" : undefined}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
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
          aria-label="Toggle dark/light theme"
        >
          <Sun className="h-4 w-4 hidden dark:block" aria-hidden="true" />
          <Moon className="h-4 w-4 block dark:hidden" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
