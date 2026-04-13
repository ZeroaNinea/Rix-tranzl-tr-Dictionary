const rixespekReplacements: Record<string, string> = {
  // IPA
  // 0: 'ɒ',
  // '@': 'ə',
  // '&': 'æ',
  // '.': 'ˌ',
  // U: 'ʊ',
  // S: 'ʃ',
  // R: 'r',
  // O: 'ɔː',
  // Z: 'd͡ʒ',
  // V: 'ʌ',
  // N: 'ŋ',
  // u: 'uː',
  // T: 'θ',
  // D: 'ð',
  // aI: 'iː',
  // A: 'ɑː',
  // i: 'iː',
  // eI: 'iː',
  // I: 'iː',
  // 3: '3ː',
  // Rexēspēk
  aU: 'aw',
  aI: 'ī',
  eI: 'ā',
  '@U': 'ō',
  '&': 'a',
  ju: 'ū',
  jU: 'ū',
  U: 'œ',
  S: 'q',
  3: 'r',
  R: 'r',
  rr: 'r',
  0: 'o',
  O: 'o',
  j: 'y',
  dZ: 'j',
  tq: 'c',
  Z: 'q',
  N: 'ng',
  gg: 'g',
  u: 'ł',
  V: 'u',
  T: 'th',
  D: 'th',
  A: 'a',
  i: 'ē',
  I: 'i',
  '@': '',
  "'": '',
  ˌ: '',
  '.': '',
  ks: 'x',
  ə: 'u',
};

const charsAtWordStart: Record<string, string> = {
  '@': 'ə',
};

const charsAtWordEnd: Record<string, string> = {
  '@': 'ə',
  '@U': 'ō',
  // U: 'w',
  aI: 'ī',
  eI: 'ā',
  // I: 'ē',
};

const vowels: string[] = ['a', 'e', 'i', 'o', 'u', '@', 'I', 'U', 'V'];
const consonants: string[] = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'q',
  'r',
  's',
  't',
  'v',
  'w',
  'x',
  'y',
  'Z',
  'z',
  'S',
  'T',
  'D',
];

vowels.forEach((vowel) => {
  if (vowel !== '@') charsAtWordEnd[vowel + 'U'] = vowel + 'w';
  if (vowel !== 'a' && vowel !== 'e') charsAtWordEnd[vowel + 'I'] = vowel + 'y';
});

consonants.forEach((consonant) => {
  charsAtWordEnd[consonant + 'I'] = consonant + 'ē';
});

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function asciiToRixespek(text: string): string {
  for (const [key, value] of Object.entries(charsAtWordStart)) {
    const regex = new RegExp('^' + escapeRegex(key), 'i');
    text = text.replace(regex, value);
  }

  for (const [key, value] of Object.entries(charsAtWordEnd)) {
    // if (text === 'eI') {
    //   continue;
    // }

    const regex = new RegExp(escapeRegex(key) + '$', 'i');
    text = text.replace(regex, value);
  }

  for (const [key, value] of Object.entries(rixespekReplacements)) {
    // if (text.endsWith('tu')) {
    //   continue;
    // }

    const regex = new RegExp(escapeRegex(key), 'g');
    text = text.replace(regex, value);
  }

  return text;
}

export default asciiToRixespek;
