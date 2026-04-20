const apiUrlFromEnv = import.meta.env.VITE_API_URL?.trim();

const fallbackApiBaseUrl =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : '/api';

export const API_BASE_URL = apiUrlFromEnv || fallbackApiBaseUrl;
