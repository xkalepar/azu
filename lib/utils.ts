import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Parses a string and truncates it if its length exceeds a specified limit.
 * If the string length is less than or equal to the limit, the original string is returned.
 * If the string length exceeds the limit, it is truncated and an ellipsis (...) is appended.
 *
 * @param content - The string to be parsed.
 * @param length - The maximum length of the string (default: 20).
 * @returns The parsed string.
 */
export function cutString(
  content: string,
  length: number = 20,
  end?: string
): string {
  if (content.length <= length) {
    return content;
  }
  if (end) {
    return `${content.slice(0, length)}
     ${end}`;
  }
  return `${content.slice(0, length)}...`;
}
