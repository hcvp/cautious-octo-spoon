import { isNumber } from './isNumber';

const VALID_VALUES = [0, 1, 1.1, -1, -1.1];
const INVALID_VALUES = [
  NaN,
  Infinity,
  -Infinity,
  '1',
  '1.1',
  '-1',
  '-1.1',
  '0',
  '0.1',
  '-0.1',
  true,
  false,
  null,
  undefined,
  {},
  [],
  () => {},
] as const;

describe('isNumber', () => {
  it('returns true for valid numbers', () => {
    VALID_VALUES.forEach((value) => {
      expect(isNumber(value)).toBe(true);
    });
  });

  it('returns false for invalid numbers', () => {
    INVALID_VALUES.forEach((value) => {
      expect(isNumber(value)).toBe(false);
    });
  });
});
