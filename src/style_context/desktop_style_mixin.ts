export function desktopStyle(style: string): string {
  return `
    @media only screen and (min-width: 768px) {
      ${style}
    }`;
}
