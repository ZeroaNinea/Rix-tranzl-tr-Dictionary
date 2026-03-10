/*
The current algorithm moves all duplicate keys into arrays.
*/

import fs from 'fs';

const raw = fs.readFileSync(
  './dictionary/English-phonetic-transcription.json',
  'utf8',
);

const regex = /"([^"]+)"\s*:\s*"([^"]+)"/g;

const dict: Record<string, { phonetics: string[]; correctCase?: string }> = {};

let match;

while ((match = regex.exec(raw)) !== null) {
  const originalKey = match[1];
  const value = match[2];

  const lower = originalKey?.toLowerCase();

  if (!dict[lower!]) {
    dict[lower!] = {
      phonetics: [],
      correctCase: originalKey,
    } as {
      phonetics: string[];
      correctCase?: string;
    };
  }

  dict[lower!]?.phonetics.push(value!);
}

fs.writeFileSync(
  './dictionary/English-phonetic-transcription-fixed.json',
  JSON.stringify(dict, null, 2),
);
