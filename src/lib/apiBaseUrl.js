const REMOTE_API_FALLBACK = 'https://bbbackend-ntbt.onrender.com';

export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, '');
  }

  return REMOTE_API_FALLBACK;
};
