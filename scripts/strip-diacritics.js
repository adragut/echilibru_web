// strip-diacritics.js
// Removes Romanian diacritics (and any other combining marks) from the given JSON file.

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Path to the copy.json file (adjust if your project structure changes)
const copyPath = resolve(import.meta.dirname, '..', 'src', 'content', 'copy.json');

function stripDiacritics(str) {
  // Decompose Unicode characters and drop the combining diacritic marks.
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function walk(value) {
  if (Array.isArray(value)) return value.map(walk);
  if (value && typeof value === 'object') {
    const result = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = walk(v);
    }
    return result;
  }
  if (typeof value === 'string') return stripDiacritics(value);
  return value;
}

function processFile(path) {
  const raw = readFileSync(path, 'utf-8');
  const data = JSON.parse(raw);
  const cleaned = walk(data);
  const output = JSON.stringify(cleaned, null, 2);
  writeFileSync(path, output, 'utf-8');
  console.log(`✅ Diacritics removed from ${path}`);
}

processFile(copyPath);
