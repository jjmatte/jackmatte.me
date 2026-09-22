import { describe, it, expect } from 'vitest';
import { sortByOrder, getFeatured } from '../../src/lib/projects';

const make = (order: number, featured: boolean) =>
  ({ data: { order, featured } }) as any;

describe('sortByOrder', () => {
  it('sorts ascending by order without mutating input', () => {
    const input = [make(3, false), make(1, true), make(2, false)];
    const out = sortByOrder(input);
    expect(out.map((p) => p.data.order)).toEqual([1, 2, 3]);
    expect(input.map((p) => p.data.order)).toEqual([3, 1, 2]);
  });
});

describe('getFeatured', () => {
  it('returns only featured entries, sorted by order', () => {
    const input = [make(3, true), make(1, false), make(2, true)];
    const out = getFeatured(input);
    expect(out.map((p) => p.data.order)).toEqual([2, 3]);
    expect(out.every((p) => p.data.featured)).toBe(true);
  });
});
