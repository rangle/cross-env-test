import { expect } from 'chai';
import { filterFlags, reduceFlag, sliceArgsFromArgsv } from './args';

describe('argument parsing functions', () => {
  describe('reduceFlag function', () => {
    it(`should return true if it's given a found value of true`, () => {
      expect(reduceFlag('something', true, 'something-else')).to.equal(true);
    });

    it(`should return true if it's given a found value of false and a ` +
      'matching flag', () => {
      expect(reduceFlag('something', false, 'something')).to.equal(true);
    });

    it(`should return false if it's given false and a non-match`, () => {
      expect(reduceFlag('something', false, 'something-else')).to.equal(false);
    });
  });

  describe('filterFlags function', () => {
    it('should remove a given list of flags from a given list of arguments',
      () => {
        const flags = ['--or', '--and'];
        const args = [
          'something=something', '--or', 'something-else', '--and', 'blah'
        ];
        const filtered = filterFlags(flags, args);
        expect(filtered.length).to.equal(3);
        expect(filtered.indexOf('--or')).to.equal(-1);
        expect(filtered.indexOf('--and')).to.equal(-1);
      });
  });

  describe('sliceArgsFromArgsv', () => {
    it('should remove the first two elements', () => {
      const argsv = ['/usr/local/bin/node', '/path/to/script', 'arg'];
      const args = sliceArgsFromArgsv(argsv);
      expect(args.length).to.equal(1);
      expect(args[0]).to.equal('arg');
    });
  });
});
