/** Shared motion values, mirrored by the --ease-* and --duration-* CSS variables. */
export const motionTokens = {
  ease: {
    enter: [0.16, 1, 0.3, 1],
    standard: [0.22, 1, 0.36, 1],
    inOut: [0.65, 0, 0.35, 1],
  },
  duration: {
    standard: 0.24,
    spring: 0.58,
  },
} as const;
