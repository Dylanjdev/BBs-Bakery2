const DAILY_UNAVAILABLE_KEY = 'bb_daily_unavailable_items';

export const normalizeMenuName = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const stripTrailingVariant = (value) => String(value || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
const toSingularKey = (value) => normalizeMenuName(value).replace(/\b(\w+?)s\b/g, '$1');

const hasUnavailableKeyMatch = (candidateName, unavailableMap) => {
  const candidateKey = normalizeMenuName(candidateName);
  if (!candidateKey) {
    return false;
  }

  if (unavailableMap?.[candidateKey]) {
    return true;
  }

  const candidateSingular = toSingularKey(candidateName);
  return Object.keys(unavailableMap || {}).some(
    (storedKey) => toSingularKey(storedKey) === candidateSingular,
  );
};

export const loadDailyUnavailableMap = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(DAILY_UNAVAILABLE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
};

export const saveDailyUnavailableMap = (map) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(DAILY_UNAVAILABLE_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage write errors so menu rendering still works.
  }
};

export const isNameUnavailableToday = (name, unavailableMap) => {
  return hasUnavailableKeyMatch(name, unavailableMap);
};

export const isMenuItemUnavailableToday = (name, unavailableMap) => {
  if (isNameUnavailableToday(name, unavailableMap)) {
    return true;
  }

  const baseName = stripTrailingVariant(name);
  if (!baseName || baseName === name) {
    return false;
  }

  return isNameUnavailableToday(baseName, unavailableMap);
};
