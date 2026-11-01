export const BUSINESS_CATEGORIES = [
  "Markete dhe dyqane ushqimore",
  "Restorante dhe ushqim i shpejtë",
  "Kafene dhe ëmbëltore",
  "Arsim",
  "Shëndetësi dhe farmaci",
  "Emergjenca",
  "Institucione publike",
  "Sport, kulturë dhe rekreacion",
  "Shërbime të tjera",
] as const;

export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];
