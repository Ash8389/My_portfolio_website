export const VALID_THEMES = [
  "midnight",
  "amber",
  "matrix",
  "dracula",
  "light"
];

export const THEMES = {
  midnight: {
    name: "midnight",
    label: "Midnight Charcoal",
    description: "Restrained dark charcoal with emerald green accents",
    bgClass: "bg-terminal-bg text-terminal-text border-terminal-border theme-midnight",
    accentColor: "#10b981"
  },
  amber: {
    name: "amber",
    label: "CRT Amber",
    description: "Classic retro CRT phosphor amber theme",
    bgClass: "bg-[#0f0d0a] text-[#fbbf24] border-[#3b2a1a] theme-amber",
    accentColor: "#f59e0b"
  },
  matrix: {
    name: "matrix",
    label: "Phosphor Matrix",
    description: "Deep green phosphor matrix terminal",
    bgClass: "bg-[#050e07] text-[#22c55e] border-[#14532d] theme-matrix",
    accentColor: "#22c55e"
  },
  dracula: {
    name: "dracula",
    label: "Dracula Violet",
    description: "Dark purple palette with bright violet accents",
    bgClass: "bg-[#181624] text-[#e2e8f0] border-[#3b2d54] theme-dracula",
    accentColor: "#c084fc"
  },
  light: {
    name: "light",
    label: "Developer Light",
    description: "Clean minimal slate light theme",
    bgClass: "bg-[#f8fafc] text-[#0f172a] border-[#cbd5e1] theme-light",
    accentColor: "#10b981"
  }
};
