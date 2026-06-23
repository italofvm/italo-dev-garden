export type TabId = "home" | "garden" | "lab" | "now";

export interface NavItem {
  id: TabId;
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "garden", label: "Garden", href: "/garden" },
  { id: "lab", label: "Lab", href: "/lab" },
  { id: "now", label: "Now", href: "/now" },
];
