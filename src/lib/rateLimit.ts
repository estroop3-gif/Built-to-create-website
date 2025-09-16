// Simple in-memory rate limiter for contact form
// In production, consider using Redis for distributed rate limiting

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class InMemoryRateLimit {
  private store = new Map<string, RateLimitEntry>();
  private readonly maxRequests = 5; // 5 requests per hour
  private readonly windowMs = 60 * 60 * 1000; // 1 hour

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const entry = this.store.get(identifier);

    // Clean up expired entries
    if (entry && now > entry.resetTime) {
      this.store.delete(identifier);
    }

    const currentEntry = this.store.get(identifier);

    if (!currentEntry) {
      // First request
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return false;
    }

    if (currentEntry.count >= this.maxRequests) {
      return true; // Rate limited
    }

    // Increment count
    currentEntry.count++;
    this.store.set(identifier, currentEntry);
    return false;
  }

  getRemainingRequests(identifier: string): number {
    const entry = this.store.get(identifier);
    if (!entry) return this.maxRequests;

    return Math.max(0, this.maxRequests - entry.count);
  }

  getResetTime(identifier: string): number | null {
    const entry = this.store.get(identifier);
    return entry ? entry.resetTime : null;
  }
}

const rateLimiter = new InMemoryRateLimit();

export function checkRateLimit(ip: string): {
  isLimited: boolean;
  remaining: number;
  resetTime: number | null;
} {
  const isLimited = rateLimiter.isRateLimited(ip);
  const remaining = rateLimiter.getRemainingRequests(ip);
  const resetTime = rateLimiter.getResetTime(ip);

  return { isLimited, remaining, resetTime };
}