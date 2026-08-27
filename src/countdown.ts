export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

export function getCalendarCountdown(now: number = Date.now()): CountdownResult {
  // Target: 15 Ekim 2026 17:00
  const target = new Date('2026-10-15T17:00:00').getTime();
  const diff = Math.max(0, target - now);

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: diff <= 0
  };
}
