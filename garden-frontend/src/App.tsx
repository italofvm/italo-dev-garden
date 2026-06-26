import type { JSX } from "react/jsx-runtime";
import { lazy, Suspense, useEffect } from "react";
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
import { useRealtimeUpdates } from "./hooks/useRealtimeUpdates";

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

// Loading placeholder
function SectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded" />
      <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
    </div>
  );
}

function MainContent() {
  const { activeTab } = useNavigation();
  const { projects, notes, config, refetch } = usePublicContent();

  // Escutar atualizações em tempo real
  useRealtimeUpdates(refetch, refetch, refetch);

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
      <Suspense fallback={<SectionSkeleton />}>
        {tabComponents[activeTab]}
      </Suspense>
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

/**
 * Injeta Schema JSON-LD no head para SEO estruturado
 */
function useSchemaMarkup() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Italo Dev",
      url: "https://italodevgarden.vercel.app",
      description: "Full Stack Developer | React | TypeScript | Node.js",
      jobTitle: "Full Stack Developer",
      sameAs: [
        "https://github.com/italofvm",
      ],
    };

    const scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.textContent = JSON.stringify(schema);
    document.head.appendChild(scriptTag);

    return () => {
      scriptTag.remove();
    };
  }, []);
}

function App() {
  useSchemaMarkup();

  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppShell />
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;
