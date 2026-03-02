import { writeFile } from 'node:fs/promises';

const token = process.env.SQUARE_ACCESS_TOKEN;
const environment = (process.env.SQUARE_ENVIRONMENT || 'sandbox').toLowerCase();

if (!token) {
  console.error('Missing SQUARE_ACCESS_TOKEN. Add it to your shell or .env file.');
  process.exit(1);
}

const apiBaseUrl =
  environment === 'production'
    ? 'https://connect.squareup.com'
    : 'https://connect.squareupsandbox.com';

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Square-Version': '2026-03-18',
};

const csvEscape = (value) => {
  const str = value == null ? '' : String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replaceAll('"', '""')}"`;
  }
  return str;
};

const rows = [['item_name', 'variation_name', 'variation_id', 'price_usd', 'currency', 'location_overrides']];

const requestPage = async (cursor) => {
  const body = {
    object_types: ['ITEM'],
    include_deleted_objects: false,
    limit: 100,
  };

  if (cursor) {
    body.cursor = cursor;
  }

  const response = await fetch(`${apiBaseUrl}/v2/catalog/search`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const details = data?.errors?.map((error) => error.detail).join('; ');
    throw new Error(details || 'Failed to fetch Square catalog data.');
  }

  return data;
};

const toPrice = (amount, currency) => {
  if (typeof amount !== 'number') {
    return '';
  }
  if (currency === 'USD') {
    return (amount / 100).toFixed(2);
  }
  return String(amount);
};

const collectRows = async () => {
  let cursor;
  let itemCount = 0;
  let variationCount = 0;

  do {
    const page = await requestPage(cursor);
    const objects = page.objects || [];

    for (const object of objects) {
      if (object.type !== 'ITEM') {
        continue;
      }

      itemCount += 1;
      const itemName = object.item_data?.name || '';
      const variations = object.item_data?.variations || [];

      for (const variation of variations) {
        const variationData = variation.item_variation_data || {};
        const priceMoney = variationData.price_money || {};
        const locationOverrides = Array.isArray(variationData.location_overrides)
          ? variationData.location_overrides.length
          : 0;

        rows.push([
          itemName,
          variationData.name || '',
          variation.id || '',
          toPrice(priceMoney.amount, priceMoney.currency),
          priceMoney.currency || '',
          locationOverrides,
        ]);

        variationCount += 1;
      }
    }

    cursor = page.cursor;
  } while (cursor);

  return { itemCount, variationCount };
};

const main = async () => {
  const { itemCount, variationCount } = await collectRows();

  const csv = `${rows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`;
  const outputPath = 'square-variation-ids.csv';

  await writeFile(outputPath, csv, 'utf8');

  console.log(`Done. Exported ${variationCount} variations from ${itemCount} items.`);
  console.log(`Saved: ${outputPath}`);
};

main().catch((error) => {
  console.error(error.message || 'Unexpected export error.');
  process.exit(1);
});
