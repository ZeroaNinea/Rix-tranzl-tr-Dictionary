/*
Moves duplicate keys into arrays and stores all original cases.
Adds the frequency of each phonetic transcription.
*/

// import subtlex from 'subtlex-word-frequencies';
import fs from 'fs';

const raw = fs.readFileSync(
  './dictionary/English-phonetic-transcription.json',
  'utf8',
);
const frequencies = JSON.parse(
  fs.readFileSync('node_modules/subtlex-word-frequencies/index.json', 'utf8'),
);

frequencies.map((w: { word: string; count: number }) => {
  if (w.word === 'put') {
    console.log(w);

    return;
  }
});

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
