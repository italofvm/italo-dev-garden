export type TabId = "home" | "projects" | "garden" | "lab" | "now" | "contact";

export interface NavItem {
  id: TabId;
  label: string;
  icon?: string;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Início" },
  { id: "projects", label: "Projetos" },
  { id: "garden", label: "Jardim Digital" },
  { id: "lab", label: "Laboratório" },
  { id: "now", label: "Agora" },
  { id: "contact", label: "Contato" },
];
