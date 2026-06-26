import type { JSX } from "react/jsx-runtime";
import "./styles/markdown.css";
import {
  ThemeProvider,
  NavigationProvider,
  useNavigation,
  useTheme,
} from "./app/providers";
import { Header, Footer, MobileNav } from "./components/layout";
import {
  HomeSection,
  ProjectsSection,
  GardenSection,
  LabSection,
  NowSection,
  ContactSection,
} from "./components/sections";
import type { TabId } from "./types/navigation";
import { useMouseGlow } from "./hooks/useMouseGlow";
import { usePublicContent } from "./hooks/usePublicContent";

function MouseGlow() {
  const { position } = useMouseGlow();

  return (
    <div
      className="pointer-events-none fixed z-0 hidden md:block"
      style={{
        width: 600,
        height: 600,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(99,102,241,0) 70%)",
        transform: "translate(-50%, -50%)",
        left: position.x,
        top: position.y,
        transition: "left 0.12s ease-out, top 0.12s ease-out",
      }}
    />
  );
}

function MainContent() {
  const { activeTab } = useNavigation();
  const { projects, notes, config } = usePublicContent();

  const tabComponents: Record<TabId, JSX.Element> = {
    home: <HomeSection projects={projects} config={config} />,
    projects: <ProjectsSection projects={projects} />,
    garden: <GardenSection notes={notes} />,
    lab: <LabSection />,
    now: <NowSection />,
    contact: <ContactSection />,
  };

  return (
    <main className="flex-grow pb-24 sm:pb-0" key={activeTab}>
      {tabComponents[activeTab]}
    </main>
  );
}

function AppShell() {
  const { activeTab, setActiveTab } = useNavigation();
  const { toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-neutral-800 dark:text-neutral-200 font-sans relative overflow-x-hidden selection:bg-accent selection:text-white">
      <MouseGlow />
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 relative z-10 flex flex-col min-h-screen">
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
