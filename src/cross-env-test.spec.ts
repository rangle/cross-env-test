import { expect } from 'chai';
import { Expression } from './expression';
import { reduceExpressions, validExpressionsFromArgs } from './cross-env-test';

describe('cross-env-test functions', () => {
  describe('reduceExpression function', () => {
    const exp = { lh: 'l', rh: 'r', operator: '=' } as Expression;
    it('should return false if its isValid argument is false', () => {
      expect(reduceExpressions(console, {}, false, exp)).to.equal(false);
    });

    it('should return false if given true and next is not an expression',
      () => {
        const err = new Error('fail');
        expect(reduceExpressions(console, {}, true, err)).to.equal(false);
      });

    it('should return true if given true and an expression is valid', () => {
      const env = { lh: '' };
      env.lh = exp.rh;
      expect(reduceExpressions(console, env, true, exp)).to.equal(false);
    });
  });

  describe('validExpressionsFromArgs function', () => {
    it('should return false if given an invalid arg', () => {
      expect(validExpressionsFromArgs(console, {}, [
        'node',
        'path',
        'something=something=fail'
      ])).to.equal(false);
    });

    it('should return false if given a valid arg that is false', () => {
      expect(validExpressionsFromArgs(console, {}, [
        'node',
        'path',
        'something=something'
      ])).to.equal(false);
    });

    it('should return true if given a valid arg that is true', () => {
      expect(validExpressionsFromArgs(console, { something: 'something' }, [
        'node',
        'path',
        'something=something'
      ])).to.equal(true);
    });

    it('should return false if there are no arguments', () => {
      expect(validExpressionsFromArgs(console, { something: 'something' }, [
        'node',
        'path',
      ])).to.equal(false);
    });
  });
});
