const compile = require('google-closure-compiler-js').compile;
const { join } = require('path');
// *note* this is a simple build script it's okay to be sync
const { readFileSync, writeFileSync } = require('fs');
const mkdirp = require('mkdirp').sync;

const outFile = 'index.js';
const pathToInput = join(__dirname, 'tmp', outFile);
const pathToOutput = join(__dirname, 'dist');

const flags = Object.freeze({
  compilationLevel: 'ADVANCED',
  languageIn: 'ES6',
  languageOut: 'ES5',
});

const out = compile(flags);
console.info(out.compiledCode);  // will print 'var x = 3;\n'

try {
  process.exit(main());
} catch (err) {
  console.log(`Compilation Failed: ${err.message}`);
  process.exit(1);
}

function main() {
  const input = readFileSync(pathToInput, 'utf8');
  const out = compile(Object.assign({}, flags, {
    externs: [join(__dirname, 'src', 'externs.js')],
    jsCode: [{src: input}],
  }));

  // check status
  if (out.errors.length) {
    console.log('Compilation Errors:', errors);
    return 2;
  }

  if (out.warnings.length) {
    console.log('Compilation Warnings:', out.warnings);
  }

  // if good
  mkdirp(pathToOutput);
  writeFileSync(join(pathToOutput, outFile), out.compiledCode);

  return 0;
}