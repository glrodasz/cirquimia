import { describe, expect, it } from 'vitest';
import { monthStart, weekStart } from './score';

describe('board periods (UTC)', () => {
  it('weeks start on Monday at midnight UTC', () => {
    const monday = Date.UTC(2026, 10, 9);
    expect(weekStart(Date.UTC(2026, 10, 13, 12))).toBe(monday); // Friday
    expect(weekStart(monday)).toBe(monday);
    expect(weekStart(Date.UTC(2026, 10, 15, 23, 59, 59))).toBe(monday); // Sunday night
    expect(weekStart(Date.UTC(2026, 10, 16))).toBe(Date.UTC(2026, 10, 16));
    expect(weekStart(Date.UTC(2027, 0, 1, 8))).toBe(Date.UTC(2026, 11, 28)); // across the new year
  });

  it('months start on the 1st at midnight UTC', () => {
    expect(monthStart(Date.UTC(2026, 10, 13, 12))).toBe(Date.UTC(2026, 10, 1));
    expect(monthStart(Date.UTC(2026, 10, 30, 23, 59, 59))).toBe(Date.UTC(2026, 10, 1));
    expect(monthStart(Date.UTC(2026, 11, 1))).toBe(Date.UTC(2026, 11, 1));
  });
});
