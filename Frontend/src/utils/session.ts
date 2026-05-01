const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;
const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const SESSION_START_KEY = 'sessionStartedAt';

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(SESSION_START_KEY);
  window.dispatchEvent(new Event('authChanged'));
};

export const markSessionStart = () => {
  localStorage.setItem(SESSION_START_KEY, Date.now().toString());
  window.dispatchEvent(new Event('authChanged'));
};

export const hasValidSession = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;

  const startedAtRaw = localStorage.getItem(SESSION_START_KEY);
  if (!startedAtRaw) {
    return true;
  }

  const startedAt = Number(startedAtRaw);
  if (!Number.isFinite(startedAt)) {
    clearSession();
    return false;
  }

  const isExpired = Date.now() - startedAt > FIFTEEN_DAYS_IN_MS;
  if (isExpired) {
    clearSession();
    return false;
  }

  return true;
};
