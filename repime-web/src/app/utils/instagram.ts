export function getSafeInstagramHref(value?: string | null) {
  if (!value) {
    return null;
  }

  const clean = value.replace(/[<>]/g, "").trim();

  if (!clean) {
    return null;
  }

  const handle = clean.startsWith("@") ? clean.slice(1) : clean;
  if (/^[A-Za-z0-9._]{1,30}$/.test(handle)) {
    return `https://www.instagram.com/${handle}`;
  }

  try {
    const url = new URL(clean);
    const hostname = url.hostname.toLowerCase();

    if (
      (url.protocol === "https:" || url.protocol === "http:") &&
      (hostname === "instagram.com" || hostname === "www.instagram.com")
    ) {
      return `https://www.instagram.com${url.pathname.replace(/[<>]/g, "")}`;
    }
  } catch {
    return null;
  }

  return null;
}
