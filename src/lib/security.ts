// In-memory sliding window rate limiting
const rateLimitMap = new Map<string, number[]>();

/**
 * Extracts client IP address safely from request headers
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Rate limiter: maxRequests per windowMs per IP address
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 6,
  windowMs: number = 10 * 60 * 1000 // 10 minutes
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter timestamps within window
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  // Periodically clean up old entries
  if (rateLimitMap.size > 5000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t > windowMs)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return { allowed: true, remaining: maxRequests - validTimestamps.length };
}

/**
 * Escapes HTML characters to prevent HTML/XSS injection in rendered emails
 */
export function escapeHtml(str: unknown): string {
  if (typeof str !== "string") {
    return "";
  }
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Strips CRLF and null characters to prevent Email Header / SMTP injection
 */
export function sanitizeHeader(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/[\r\n\0]/g, "").trim();
}

/**
 * Validates email format strictly
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates phone format
 */
export function isValidPhone(phone: unknown): boolean {
  if (typeof phone !== "string") return false;
  const trimmed = phone.trim();
  if (trimmed.length < 6 || trimmed.length > 30) return false;
  return /^[+0-9\s().-]{6,30}$/.test(trimmed);
}

/**
 * Strips path traversal and forbidden characters from uploaded file names
 */
export function sanitizeFileName(name: string): string {
  return name.replace(/[/\\?%*:|"<>]/g, "").replace(/\.\./g, "").trim() || "document";
}

