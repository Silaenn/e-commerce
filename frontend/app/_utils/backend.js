const DEFAULT_BACKEND_BASE_URL = "http://localhost:1337";

const rawBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || DEFAULT_BACKEND_BASE_URL;
const normalizedBaseUrl = rawBaseUrl.replace(/\/$/, "");

const isAbsoluteUrl = (value) =>
  value.startsWith("http://") ||
  value.startsWith("https://") ||
  value.startsWith("data:") ||
  value.startsWith("blob:");

export const getBackendBaseUrl = () => normalizedBaseUrl;

export const getApiBaseUrl = () =>
  normalizedBaseUrl.endsWith("/api")
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`;

export const resolveMediaUrl = (url) => {
  if (!url) return "";
  if (isAbsoluteUrl(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${normalizedBaseUrl}${url}`;
  return `${normalizedBaseUrl}/${url}`;
};
