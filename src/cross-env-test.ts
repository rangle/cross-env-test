import { filterFlags, sliceArgsFromArgsv } from './args';
import { FLAG_OR } from './constants';
import {
  evaluate,
  Environment,
  Expression,
  isExpression,
  parseExpression,
} from './expression';
const flags = [ FLAG_OR ];

export function validExpressionsFromArgs(env: Environment, argv: string[]) {
  const areEnvVarsValid = reduceExpressions.bind(null, console, env);
  const args = sliceArgsFromArgsv(argv);

  if (args.length === 0) {
    console.log('');
    console.log(`Usage: ${process['argv'][1]} ENV_VAR=value`);
    console.log(`Usage: ${process['argv'][1]} ENV_VAR1=value ENV_VAR2=other`);
    return false;
  }

  const expressions = filterFlags(flags, args)
    .map(parseExpression);

  return expressions.reduce(areEnvVarsValid, true);
}

export function reduceExpressions(
  logger: Console, env: Environment, isValid: boolean, next: Expression | Error
): boolean {
  if (!isValid) {
    return isValid;
  }
  if (isExpression(next)) {
    return evaluate(env, next);
  } else {
    logger.error(next.message);
    return false;
  }
}
