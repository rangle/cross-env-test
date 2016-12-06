export type Operator = '=' | '!=';
export interface Environment {
  [ variable: string ]: string;
}

export interface Expression {
  lh: string;
  operator: Operator;
  rh: string;
}

export function isExpression(arg: any): arg is Expression {
  if (!arg) {
    return false;
  }
  if (typeof arg !== 'object') {
    return false;
  }

  if (!arg.lh || typeof arg.lh !== 'string') {
    return false;
  }

  if (!arg.rh || typeof arg.rh !== 'string') {
    return false;
  }

  if (arg.operator === '=' || arg.operator === '!=') {
    return true;
  }

  return false;
}

export function parseExpression(str: string): Expression | Error {
  const parts = str.trim().split('=');
  if (parts.length !== 2) {
    return new Error(`parseExpression: invalid expression ${str}`);
  }
  let lh: string;
  let operator: Operator;

  if (parts[0].charAt(parts[0].length - 1) === '!') {
    operator = '!=';
    lh = parts[0].slice(0, parts[0].length - 1);
  } else {
    operator = '=';
    lh = parts[0];
  }

  return {
    lh,
    operator,
    rh: parts[1],
  };
}

export function evaluate(
  environment: Environment, expression: Expression
): boolean {
  if (!environment[expression.lh]) {
    return false;
  }

  if (expression.operator === '=') {
    return environment[expression.lh].trim() === expression.rh.trim();
  } else {
    return environment[expression.lh].trim() !== expression.rh.trim();
  }
}
