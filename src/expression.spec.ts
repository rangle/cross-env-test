import { expect } from 'chai';
import {
  evaluate,
  Expression,
  isExpression,
  parseExpression,
} from './expression';

describe('expression functions', () => {
  describe('evaluate function', () => {
    it('should return true for a valid equality', () => {
      const exp = parseExpression('NODE_ENV=debug') as Expression;
      expect(evaluate({ NODE_ENV: 'debug' }, exp)).to.equal(true);
    });

    it('should return true for a valid inequality', () => {
      const exp = parseExpression('NODE_ENV!=debug') as Expression;
      expect(evaluate({ NODE_ENV: 'not debug' }, exp)).to.equal(true);
    });
  });

  describe('isExpression function', () => {
    it('should return false on non object input', () => {
      expect(isExpression('')).to.equal(false);
      expect(isExpression(7)).to.equal(false);
    });

    it('should return false if the object has no lh', () => {
      expect(isExpression({ rh: 'right', operator: '=' })).to.equal(false);
    });

    it('should return false if the object has no rh', () => {
      expect(isExpression({ lh: 'left', operator: '=' })).to.equal(false);
    });

    it('should return false if the object has no operator', () => {
      expect(isExpression({ rh: 'right', lh: 'left' })).to.equal(false);
    });

    it('should return false if the operator is not supported', () => {
      expect(isExpression({ rh: 'r', lh: 'l', operator: '!' })).to.equal(false);
    });

    it('should return true if it gets an Expression', () => {
      expect(isExpression({ lh: 'l', rh: 'r', operator: '=' })).to.equal(true);
    });
  });

  describe('parseExpression function', () => {
    it(`should correctly set an Expression's rh prop`, () => {
      expect((parseExpression('left=test') as Expression).lh).to.equal('left');
    });

    it(`should correctly set an Expression's lh prop`, () => {
      expect(
        (parseExpression('right!=test') as Expression).lh
      ).to.equal('right');
    });

    it(`should correctly set an Expression's operator prop`, () => {
      expect((parseExpression('op=test') as Expression).lh).to.equal('op');
    });

    it('should return an Error if there is more than one = in the string',
      () => {
        expect(parseExpression('op=test=fail') instanceof Error).to.equal(true);
      });
  });

});
