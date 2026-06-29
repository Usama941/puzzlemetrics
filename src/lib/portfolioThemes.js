const THEME_MAP = {
  violet: {
    name: "Violet",
    gradient: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%)",
    accent: "#6055D9",
  },
  teal: {
    name: "Teal",
    gradient: "linear-gradient(135deg, #042f2e 0%, #0f766e 50%, #042f2e 100%)",
    accent: "#14B8A6",
  },
  indigo: {
    name: "Indigo",
    gradient: "linear-gradient(135deg, #111827 0%, #1e1b4b 50%, #111827 100%)",
    accent: "#6366F1",
  },
  plum: {
    name: "Plum",
    gradient: "linear-gradient(135deg, #2a0a2f 0%, #6b21a8 50%, #2a0a2f 100%)",
    accent: "#A855F7",
  },
  ink: {
    name: "Ink",
    gradient: "linear-gradient(135deg, #0b1220 0%, #1f2937 50%, #0b1220 100%)",
    accent: "#38BDF8",
  },
};

const DEFAULT_THEME = THEME_MAP.violet;

/**
 * @param {string | null | undefined} theme
 */
export function getTheme(theme) {
  if (!theme) return DEFAULT_THEME;
  return THEME_MAP[theme] ?? DEFAULT_THEME;
}

export { THEME_MAP };
