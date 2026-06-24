export type TabId = "home" | "projects" | "garden" | "lab" | "now" | "contact";

export interface NavItem {
  id: TabId;
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Início", href: "/" },
  { id: "projects", label: "Projetos", href: "/projects" },
  { id: "garden", label: "Jardim", href: "/garden" },
  { id: "lab", label: "Laboratório", href: "/lab" },
  { id: "now", label: "Agora", href: "/now" },
  { id: "contact", label: "Contato", href: "/contact" },
];
