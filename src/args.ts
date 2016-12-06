export function filterFlags(flags: string[], args: string[]) {
  return args.filter(arg => !flags.reduce(reduceFlag.bind(null, arg), false));
}

export function reduceFlag(
  compare: string, found: boolean = false, flag: string
) {
  return found ? found : flag === compare;
}

export function sliceArgsFromArgsv(args: string[]) {
  return args.slice(2);
}
