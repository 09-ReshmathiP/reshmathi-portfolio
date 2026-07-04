/**
 * Typed mirror of src/styles/tokens.css.
 * Three.js, Canvas 2D, and GSAP color tweens can't read CSS custom
 * properties directly, so anything touching those needs the value here too.
 * If you change a color in tokens.css, mirror it here in the same commit.
 */

export const colors = {
  ink: "#0a0b10",
  inkRaised: "#101219",
  textPrimary: "#f2f3f7",
  textSecondary: "#b7bacb",
  textMuted: "#8b8fa3",
  synapse: "#7c6cff",
  synapseDim: "#5b4ecf",
  signal: "#3ddbd9",
  signalDim: "#2bb3b1",
  amber: "#ffb454",
  glassBorder: "rgba(255,255,255,0.09)",
} as const;

export const motion = {
  easeSignature: [0.16, 1, 0.3, 1] as [number, number, number, number],
  durationFast: 0.18,
  durationBase: 0.42,
  durationSlow: 0.9,
} as const;

export const layout = {
  contentMax: 1280,
  navHeight: 76,
} as const;

export const zIndex = {
  thread: 5,
  content: 10,
  nav: 40,
  avatar: 50,
  modal: 60,
} as const;
