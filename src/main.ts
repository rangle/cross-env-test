import { validExpressionsFromArgs } from './cross-env-test';
import { ENV_TEST } from './constants';

/* tslint:disable:no-string-literal */

function main() {
  const validExpressions =
    validExpressionsFromArgs(console, process['env'], process['argv']);

  if (validExpressions) {
    process['exit'](0);
  } else {
    process['exit'](1);
  }

  return 0;
}

if (process['env'][ENV_TEST] !== 'test') {
  main();
}
