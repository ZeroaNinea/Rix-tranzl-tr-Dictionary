/*
Moves duplicate keys into arrays and stores all original cases.
*/

import fs from 'fs';

const raw = fs.readFileSync(
  './dictionary/English-phonetic-transcription.json',
  'utf8',
);

const regex = /"([^"]+)"\s*:\s*"([^"]+)"/g;

type DictEntry = {
  phonetics: string[];
  cases: string[];
};

const dict: Record<string, DictEntry> = {};

let match: RegExpExecArray | null;

while ((match = regex.exec(raw)) !== null) {
  const originalKey = match[1];
  const value = match[2];

  const lower = originalKey?.toLowerCase();

  if (!dict[lower!]) {
    dict[lower!] = {
      phonetics: [],
      cases: [],
    } as {
      phonetics: string[];
      cases: string[];
    };
  }

  dict[lower!]?.phonetics?.push(value!);

  if (!dict[lower!]?.cases?.includes(originalKey!)) {
    dict[lower!]?.cases?.push(originalKey!);
  }
}

fs.writeFileSync(
  './dictionary/English-phonetic-transcription-fixed.json',
  JSON.stringify(dict, null, 2),
);
