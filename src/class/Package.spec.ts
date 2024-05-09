import Package from './Package';
import { MassError, VolumeError } from '../Errors';

describe('sort', () => {
  describe('normal packages', () => {
    it('marks a standard package as standard', () => {
      const pkg = new Package({ width: 10, height: 10, length: 10, mass: 10 });
      expect(pkg.acceptable).toBe(true);
      expect(pkg.heavy).toBe(false);
      expect(pkg.bulky).toBe(false);
    });

    it('marks a bulky package as special', () => {
      const pkg = new Package({ width: 200, height: 10, length: 10, mass: 10 });
      expect(pkg.acceptable).toBe(true);
      expect(pkg.heavy).toBe(false);
      expect(pkg.bulky).toBe(true);
    });

    it('marks a heavy package as special', () => {
      const pkg = new Package({ width: 10, height: 10, length: 10, mass: 80 });
      expect(pkg.acceptable).toBe(true);
      expect(pkg.heavy).toBe(true);
      expect(pkg.bulky).toBe(false);
    });

    it('rejects a heavy bulky package', () => {
      const pkg = new Package({ width: 200, height: 10, length: 10, mass: 80 });
      expect(pkg.acceptable).toBe(false);
      expect(pkg.heavy).toBe(true);
      expect(pkg.bulky).toBe(true);
    });
  });

  describe('invalid packages', () => {
    it('rejects a package with negative mass', () => {
      expect(() => new Package({ width: 10, height: 10, length: 10, mass: -10 })).toThrow(MassError);
    });

    it('rejects a package with zero mass', () => {
      expect(() => new Package({ width: 10, height: 10, length: 10, mass: 0 })).toThrow(MassError);
    });

    it('rejects a package with negative dimensions', () => {
      expect(() => new Package({ width: -10, height: 10, length: 10, mass: 10 })).toThrow(VolumeError);
    });

    it('rejects a package with zero dimensions', () => {
      expect(() => new Package({ width: 0, height: 10, length: 10, mass: 10 })).toThrow(VolumeError);
    });

    it('rejects a package with zero volume', () => {
      expect(() => new Package({ width: 0, height: 0, length: 0, mass: 10 })).toThrow(VolumeError);
    });

    it('rejects a package with invalid type in volume', () => {
      // @ts-expect-error
      expect(() => new Package({ width: '10', height: 10, length: 10, mass: 10 })).toThrow(TypeError);
    });

    it('rejects a package with invalid type in mass', () => {
      // @ts-expect-error
      expect(() => new Package({ width: 10, height: 10, length: 10, mass: '10' })).toThrow(TypeError);
    });

    it('rejects infinite mass', () => {
      expect(() => new Package({ width: 10, height: 10, length: 10, mass: Infinity })).toThrow(TypeError);
    });

    it('rejects infinite width', () => {
      expect(() => new Package({ width: Infinity, height: 10, length: 10, mass: 10 })).toThrow(TypeError);
    });
  });
});
