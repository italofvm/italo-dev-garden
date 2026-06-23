import { createContext, useContext, useState, type ReactNode } from "react";
import { type TabId } from "../../types/navigation";

interface NavigationContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("home");

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
