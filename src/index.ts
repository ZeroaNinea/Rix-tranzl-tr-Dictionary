/*
Moves duplicate keys into arrays and stores all original cases.
*/

// import subtlex from 'subtlex-word-frequencies';
import fs from 'fs';
// import path from 'path';
// import * as wndb from 'wordnet-db';
// import { detectNewline } from 'detect-newline';

// let bad = false;

// console.log(wndb.path, wndb.files, wndb.version, wndb.libVersion);

// wndb.files.forEach(function (file, index) {
//   const fc = fs.readFileSync(path.join(wndb.path, file), 'utf-8');
//   const endingType = detectNewline(fc);

//   if (endingType !== '\n') {
//     console.log(' ✖', file, JSON.stringify(endingType));
//     bad || true;
//   } else {
//     console.log('✔', file, JSON.stringify(endingType));
//   }

//   if (index === wndb.files.length - 1) {
//     // done:
//     process.exit(bad ? 1 : 0);
//   }
// });

// Word Frequencies

const raw = fs.readFileSync(
  './dictionary/English-phonetic-transcription.json',
  'utf8',
);
const frequencies = JSON.parse(
  fs.readFileSync('node_modules/subtlex-word-frequencies/index.json', 'utf8'),
);

frequencies.map((w: { word: string; count: number }) => {
  if (w.word === 'read') {
    console.log(w);

    return;
  }
});

// Generating Rixēspēk to English Dictionary

import asciiToRixespek from './helpers/ascii-to-rixespek.js';

console.log(asciiToRixespek("'flaU@R"));

type ReversedDictEntry = {
  value: string;
  frequency: number;
}[];

const reversedDict: Record<string, ReversedDictEntry> = {};

/*
{
  "flawr": {
    words: [
      {
        value: "flower",
        frequency: 1161
      },
      {
        value: "flour",
        frequency: 161
      }
    ],
  }
}
*/

// Generating English to Rixēspēk Dictionary

// const regex = /"([^"]+)"\s*:\s*"([^"]+)"/g;

// type DictEntry = {
//   phonetics: string[];
//   cases: string[];
// };

// const dict: Record<string, DictEntry> = {};

// let match: RegExpExecArray | null;

// while ((match = regex.exec(raw)) !== null) {
//   const originalKey = match[1];
//   const value = match[2];

//   const lower = originalKey?.toLowerCase();

//   if (!dict[lower!]) {
//     dict[lower!] = {
//       phonetics: [],
//       cases: [],
//     } as {
//       phonetics: string[];
//       cases: string[];
//     };
//   }

//   if (!dict[lower!]?.phonetics?.includes(value!)) {
//     dict[lower!]?.phonetics?.push(value!);
//   }

//   if (!dict[lower!]?.cases?.includes(originalKey!)) {
//     dict[lower!]?.cases?.push(originalKey!);
//   }
// }

// fs.writeFileSync(
//   './dictionary/English-phonetic-transcription-fixed.json',
//   JSON.stringify(dict, null, 2),
// );
