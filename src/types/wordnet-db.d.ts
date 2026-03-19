declare module 'wordnet-db' {
  export function getSynonyms(word: string, pos: string): string[];

  export const path: string;
  export const files: string[];
  export const version: string;
  export const libVersion: string;
}
