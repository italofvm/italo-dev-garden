import { navItems, type TabId } from "../../types/navigation";

interface MobileNavProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
}

export function MobileNav({ activeTab, onChangeTab }: MobileNavProps) {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-lightCard dark:bg-darkCard border-t border-lightBorder dark:border-darkBorder">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChangeTab(item.id)}
            className={`flex-1 py-3 text-xs font-medium text-center transition-all cursor-pointer ${
              activeTab === item.id
                ? "text-accent border-t-2 border-accent"
                : "text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
