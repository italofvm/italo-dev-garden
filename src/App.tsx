import type { JSX } from "react/jsx-runtime";
import {
  ThemeProvider,
  NavigationProvider,
  useNavigation,
  useTheme,
} from "./app/providers";
import { Header, MobileNav, Footer } from "./components/layout";
import {
  HomeSection,
  ProjectsSection,
  GardenSection,
  LabSection,
  NowSection,
} from "./components/sections";
import type { TabId } from "./types/navigation";

function MainContent() {
  const { activeTab } = useNavigation();

  const tabComponents: Record<TabId, JSX.Element> = {
    home: <HomeSection />,
    projects: <ProjectsSection />,
    garden: <GardenSection />,
    lab: <LabSection />,
    now: <NowSection />,
    contact: <HomeSection />,
  };

  return <main className="flex-grow">{tabComponents[activeTab]}</main>;
}

function AppShell() {
  const { activeTab, setActiveTab } = useNavigation();
  const { toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-neutral-800 dark:text-neutral-200 font-sans relative overflow-x-hidden selection:bg-accent selection:text-white">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 relative z-10 flex flex-col min-h-screen">
        <Header
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onToggleTheme={toggleTheme}
        />

        <MainContent />
        <Footer />
      </div>

      <MobileNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppShell />
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;

