import type { BlogItem } from "../types";

export const blogItems: BlogItem[] = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  title:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
}));
