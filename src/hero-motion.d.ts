export function mountHeroMotion(
  root: HTMLElement,
  options?: { captions?: boolean; loop?: boolean; autoplay?: boolean },
): { destroy(): void }
