export const PORTFOLIO_PLACEHOLDER_IMAGES = [
  "https://placehold.co/1200x675/6055D9/ffffff?text=Project+Screenshot+1",
  "https://placehold.co/1200x675/4038B0/ffffff?text=Project+Screenshot+2",
  "https://placehold.co/1200x675/0a0a14/6055D9?text=Project+Screenshot+3",
];

export function resolvePortfolioImages(images: string[] | null | undefined): string[] {
  if (images && images.length > 0) return images;
  return PORTFOLIO_PLACEHOLDER_IMAGES;
}
