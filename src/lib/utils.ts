import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to conditionally join classNames, following shadcn/ui convention
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
