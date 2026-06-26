import { createContext, useContext, useState, type ReactNode } from "react";
import { navItems, type TabId } from "../../types/navigation";

interface NavigationContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<TabId>(() => {
    try {
      const saved = window.localStorage.getItem("active_tab");
      const isValidTab = navItems.some((item) => item.id === saved);
      return isValidTab ? (saved as TabId) : "home";
    } catch (error) {
      console.error(error);
      return "home";
    }
  });

  const setActiveTab = (tab: TabId) => {
    setActiveTabState(tab);
    try {
      window.localStorage.setItem("active_tab", tab);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
