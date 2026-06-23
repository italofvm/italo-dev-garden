// src/styles/theme.ts

// Cores do tema (baseado no seu HTML original)
export const colors = {
  // Backgrounds
  lightBg: "#FAF9F6",
  darkBg: "#0A0A0C",

  // Cards
  lightCard: "#FFFFFF",
  darkCard: "#121215",

  // Borders
  lightBorder: "#E5E5E0",
  darkBorder: "#1F1F23",

  // Accent
  accent: "#6366F1",
  accentHover: "#4F46E5",

  // Neutrals
  neutral50: "#FAFAFA",
  neutral100: "#F5F5F5",
  neutral200: "#E5E5E5",
  neutral300: "#D4D4D4",
  neutral400: "#A3A3A3",
  neutral500: "#737373",
  neutral600: "#525252",
  neutral700: "#404040",
  neutral800: "#262626",
  neutral900: "#171717",
} as const;

// Status das notas (Garden)
export const noteStatus = {
  semente: {
    label: "🌱 Semente (Rascunhos)",
    color: "text-accent bg-accent/10 border-accent/30",
  },
  brotar: {
    label: "🌿 Em Broto (Em progresso)",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/30",
  },
  perene: {
    label: "🌲 Perene (Concluído)",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
  },
} as const;

// Tipos para TypeScript
export type ColorKey = keyof typeof colors;
export type NoteStatusKey = keyof typeof noteStatus;

// Configurações de animação (para Framer Motion ou CSS)
export const animations = {
  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  fastTransition: "all 0.2s ease",
  pageTransition: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

// Export default para facilitar import
const theme = {
  colors,
  noteStatus,
  animations,
} as const;

export default theme;
