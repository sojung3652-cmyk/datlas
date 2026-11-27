export function mountAboutMotion(
  section: HTMLElement,
  options?: { breakpoint?: number; stickyTop?: number },
): { seek(seconds: number): void; destroy(): void }
