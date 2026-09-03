const fs = require('fs');

const bundle = fs.readFileSync('vercel_bundle_debug.js', 'utf-8');

// Let's search for "GİRİŞ", "STRATEJİ" or list of headings in the bundle to see how chapters are defined there.
console.log('Searching for chapter titles inside the bundle...');

// Let's find patterns like "num:" or "chapters:"
// We can locate where the actual chapters are specified for each group.
// Let's print out text around "teknikaltyapi" and "lojistik" definitions to see if they are defined as REPORT_DATA_RAW.
const ulasimIdx = bundle.indexOf('ulasim:{label:"Ulaşım"');
const teknikaltyapiIdx = bundle.indexOf('teknikaltyapi:{label:"Teknik Altyapı"');
const lojistikIdx = bundle.indexOf('lojistik:{label:"Lojistik"');

console.log('ulasimIdx:', ulasimIdx);
console.log('teknikaltyapiIdx:', teknikaltyapiIdx);
console.log('lojistikIdx:', lojistikIdx);

if (ulasimIdx !== -1) {
  console.log('=== ULASIM RAW DATA DEFINITION ===');
  console.log(bundle.substring(ulasimIdx, ulasimIdx + 1500));
}
if (teknikaltyapiIdx !== -1) {
  console.log('=== TEKNIK ALTYAPI RAW DATA DEFINITION ===');
  console.log(bundle.substring(teknikaltyapiIdx, teknikaltyapiIdx + 1500));
}
if (lojistikIdx !== -1) {
  console.log('=== LOJISTIK RAW DATA DEFINITION ===');
  console.log(bundle.substring(lojistikIdx, lojistikIdx + 1500));
}

// Let's also check if there is another place where report chapters are mapped.
// In reportData.ts we have:
// export const REPORT_CHAPTERS_MAP = ...
const chaptersMapIdx = bundle.indexOf('REPORT_CHAPTERS_MAP');
console.log('REPORT_CHAPTERS_MAP index:', chaptersMapIdx);
if (chaptersMapIdx !== -1) {
  console.log(bundle.substring(chaptersMapIdx, chaptersMapIdx + 1000));
} else {
  // Let's search for the text of some specific chapter in REPORT_CHAPTERS_MAP, e.g. "Yokohama" or "On İkinci Kalkınma Planı"
  const yokoIdx = bundle.indexOf('Yokohama');
  console.log('Yokohama index:', yokoIdx);
  if (yokoIdx !== -1) {
    console.log(bundle.substring(yokoIdx - 200, yokoIdx + 1000));
  }
}
