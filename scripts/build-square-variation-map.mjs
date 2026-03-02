import { readFile, writeFile } from 'node:fs/promises';

const csvPath = 'square-variation-ids.csv';
const menuPath = 'src/components/Menu.jsx';
const outputPath = 'src/data/squareVariationMap.js';

const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const removeParenthetical = (value) => String(value || '').replace(/\s*\([^)]*\)\s*/g, ' ').trim();

const toSingular = (value) => {
  const normalized = normalize(value);
  return normalized.replace(/\b(\w+?)s\b/g, '$1');
};

const preferredVariationRank = (variationName) => {
  const normalized = normalize(variationName);
  if (!normalized) {
    return 0;
  }
  if (normalized === 'regular') {
    return 1;
  }
  if (normalized === 'single') {
    return 2;
  }
  if (normalized === 'default') {
    return 3;
  }
  return 10;
};

const getMenuOunces = (name) => {
  const match = String(name || '').match(/\((\d+)\s*oz\)/i);
  return match ? Number(match[1]) : null;
};

const getExpectedSizeTokens = (ounces) => {
  if (!Number.isFinite(ounces)) {
    return [];
  }

  if (ounces <= 16) {
    return ['small'];
  }

  if (ounces <= 24) {
    return ['medium'];
  }

  return ['large'];
};

const isVariationSizeMatch = (variationName, ounces) => {
  const expectedTokens = getExpectedSizeTokens(ounces);
  if (!expectedTokens.length) {
    return true;
  }

  const variationKey = normalize(variationName);
  return expectedTokens.some((token) => variationKey.includes(token));
};

const parseCsvLine = (line) => {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
};

const parseCsv = (content) => {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvLine(lines[0]);
  const rows = [];

  for (let index = 1; index < lines.length; index += 1) {
    const columns = parseCsvLine(lines[index]);
    const row = {};

    headers.forEach((header, headerIndex) => {
      row[header] = columns[headerIndex] || '';
    });

    rows.push(row);
  }

  return rows;
};

const extractMenuNames = (menuSource) => {
  const match = menuSource.match(/const\s+onlineOrderPrices\s*=\s*\{([\s\S]*?)\n\};/);
  if (!match) {
    return [];
  }

  const objectBody = match[1];
  const keyRegex = /^\s*(['"])(.*?)\1\s*:\s*\{\s*amount\s*:/gm;
  const names = [];
  let keyMatch = keyRegex.exec(objectBody);

  while (keyMatch) {
    names.push(keyMatch[2]);
    keyMatch = keyRegex.exec(objectBody);
  }

  return names;
};

const buildMap = (menuNames, csvRows) => {
  const rowsWithKeys = csvRows.map((row) => {
    const itemName = row.item_name || '';
    const variationName = row.variation_name || '';
    const combinedName = variationName ? `${itemName} (${variationName})` : itemName;

    return {
      row,
      itemName,
      variationName,
      variationId: row.variation_id || '',
      itemKey: normalize(itemName),
      itemKeyNoParens: normalize(removeParenthetical(itemName)),
      itemKeySingular: toSingular(itemName),
      combinedKey: normalize(combinedName),
      combinedKeyNoParens: normalize(removeParenthetical(combinedName)),
      combinedKeySingular: toSingular(combinedName),
    };
  });

  const mapped = {};
  const unmapped = [];

  for (const menuName of menuNames) {
    const menuKey = normalize(menuName);
    const menuKeyNoParens = normalize(removeParenthetical(menuName));
    const menuKeySingular = toSingular(menuName);
    const menuOunces = getMenuOunces(menuName);

    const directMatches = rowsWithKeys.filter((entry) =>
      [
        entry.itemKey,
        entry.itemKeyNoParens,
        entry.itemKeySingular,
        entry.combinedKey,
        entry.combinedKeyNoParens,
        entry.combinedKeySingular,
      ].includes(menuKey) ||
      [
        entry.itemKey,
        entry.itemKeyNoParens,
        entry.itemKeySingular,
        entry.combinedKey,
        entry.combinedKeyNoParens,
        entry.combinedKeySingular,
      ].includes(menuKeyNoParens) ||
      [
        entry.itemKey,
        entry.itemKeyNoParens,
        entry.itemKeySingular,
        entry.combinedKey,
        entry.combinedKeyNoParens,
        entry.combinedKeySingular,
      ].includes(menuKeySingular)
    );

    const sizeAwareMatches = directMatches.filter((entry) =>
      isVariationSizeMatch(entry.variationName, menuOunces)
    );

    if (sizeAwareMatches.length > 0) {
      const [bestMatch] = [...sizeAwareMatches].sort((a, b) =>
        preferredVariationRank(a.variationName) - preferredVariationRank(b.variationName)
      );
      mapped[menuName] = bestMatch.variationId || null;
      continue;
    }

    mapped[menuName] = null;
    unmapped.push(menuName);
  }

  return { mapped, unmapped };
};

const formatMapFile = (mapped) => {
  const lines = [
    'export const squareVariationMap = {',
    ...Object.entries(mapped).map(([name, variationId]) => {
      const key = JSON.stringify(name);
      const value = variationId ? JSON.stringify(variationId) : 'null';
      return `  ${key}: ${value},`;
    }),
    '};',
    '',
  ];

  return lines.join('\n');
};

const main = async () => {
  const [menuSource, csvSource] = await Promise.all([
    readFile(menuPath, 'utf8'),
    readFile(csvPath, 'utf8').catch(() => ''),
  ]);

  const menuNames = extractMenuNames(menuSource);
  if (!menuNames.length) {
    throw new Error('Could not find onlineOrderPrices keys in src/components/Menu.jsx');
  }

  const csvRows = parseCsv(csvSource);
  const { mapped, unmapped } = buildMap(menuNames, csvRows);

  await writeFile(outputPath, formatMapFile(mapped), 'utf8');

  console.log(`Updated ${outputPath}`);
  console.log(`Mapped ${menuNames.length - unmapped.length}/${menuNames.length} menu items.`);
  if (unmapped.length) {
    console.log('Unmapped items:');
    unmapped.forEach((name) => console.log(`- ${name}`));
  }
};

main().catch((error) => {
  console.error(error.message || 'Failed to build variation map.');
  process.exit(1);
});
