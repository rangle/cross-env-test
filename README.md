# cross-env-test

This command line tool works on *NIX (including OS X) and Windows.  This tool checks to see if an environment variable is set to a given value:


```bash
cross-env-test NODE_ENV=testing
```

if `NODE_ENV` is set to `testing` the program will exit with `0` otherwise it will exit with a non-zero value

The logic is very close to:

```js
if (process.env.NODE_ENV === 'testing') {
  process.exit(0);
} else {
  process.exit(1);
}

```

Usage
I use this in my npm scripts:

```js
{
  "scripts": {
    "postinstall": "cross-env-test NODE_ENV=testing || npm run build"
  }
}
```

## Why?

Sometimes it's advantages to only run certain npm scripts _sometimes_.  For example when running an install in an automated test environment.

## Limitations

- only supports '=' and '!=' operators
- environment variable _must_ be on the left hand side of the operator
- arguments not in the form of `lh=rh` or `lh!=rh` will cause the program to exit with an error code
- chained arguments are implicitly `&&`ed together
- if there is interest we can add a `--or` modifier

## License

[MIT](./LICENSE "MIT License")
