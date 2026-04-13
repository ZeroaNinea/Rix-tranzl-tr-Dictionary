import fs from 'fs';

const raw = fs.readFileSync(
  './dictionary/English-phonetic-transcription.json',
  'utf8',
);
const frequencies = JSON.parse(
  fs.readFileSync('node_modules/subtlex-word-frequencies/index.json', 'utf8'),
);

// frequencies.map((w: { word: string; count: number }) => {
//   if (w.word === 'read') {
//     console.log(w);

//     return;
//   }
// });

// Generating Rixēspēk to English Dictionary

import asciiToRixespek from './ascii-to-rixespek.js';

// console.log(asciiToRixespek("'flaU@R"));

type ReversedDictEntry = {
  words: { value: string; frequency: number }[];
  phonetics: string[];
};

export default function generateRixespekToEnglishDictionary() {
  console.log('Generating Rixēspēk to English Dictionary...');

  let reversedDict: Record<string, ReversedDictEntry> = {};
  const freqMap: Record<string, number> = {};

  for (const w of frequencies) {
    freqMap[w.word.toLowerCase()] = w.count;
  }

  const regex = /"([^"]+)"\s*:\s*"([^"]+)"/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    const originalKey = match[1];
    const phonetic = match[2];

    const rix = asciiToRixespek(phonetic!);

    // 1. Create entry if not exists.
    if (!reversedDict[rix]) {
      reversedDict[rix] = {
        words: [],
        phonetics: [],
      };
    }

    const entry = reversedDict[rix];

    const frequency = freqMap[originalKey!.toLowerCase()] ?? 0;

    // 2. Avoid duplicate WORDS (case-insensitive).
    const exists = entry.words.some(
      (w) => w.value.toLowerCase() === originalKey!.toLowerCase(),
    );

    if (!exists) {
      entry.words.push({
        value: originalKey!,
        frequency,
      });
    }

    // 3. Avoid duplicate phonetics.
    if (!entry.phonetics.includes(phonetic!)) {
      entry.phonetics.push(phonetic!);
    }
  }

  fs.writeFileSync(
    './dictionary/Rixespek-to-English.json',
    JSON.stringify(reversedDict, null, 2),
  );
}
