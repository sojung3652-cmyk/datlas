export function mountHeroOrbit(
  root: HTMLElement,
  options?: { paragraph?: HTMLElement; size?: number; stretch?: number; lift?: number; hideWhileHeroPlays?: string | false },
): { destroy(): void }
