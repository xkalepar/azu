export default function summarizeHtmlContent(html: string): string {
  if (!html) return "";

  // Remove all <img ...> tags
  const withoutImages = html.replace(/<img[^>]*>/gi, "");

  // Remove all remaining HTML tags
  const plainText = withoutImages.replace(/<[^>]+>/g, "");

  // Trim, slice, and append ...
  const trimmedText = plainText.trim();
  const summary = trimmedText.slice(0, 158);
  return summary + (trimmedText.length > 158 ? "..." : "");
}
