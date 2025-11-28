import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const toKey = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove symbols
    .replace(/\s+/g, "_");       // spaces → underscores



    