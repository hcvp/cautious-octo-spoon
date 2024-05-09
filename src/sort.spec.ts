import { sort } from './sort';

describe('sort', () => {
  describe('normal packages', () => {
    it('sorts a standard package', () => {
      const result = sort(10, 10, 10, 10);
      expect(result).toEqual('STANDARD');
    });

    it('sorts a bulky package', () => {
      const result = sort(200, 10, 10, 10);
      expect(result).toEqual('SPECIAL');
    });

    it('sorts a heavy package', () => {
      const result = sort(10, 10, 10, 80);
      expect(result).toEqual('SPECIAL');
    });

    it('rejects a heavy bulky package', () => {
      const result = sort(200, 10, 10, 80);
      expect(result).toEqual('REJECTED');
    });
  });
});
