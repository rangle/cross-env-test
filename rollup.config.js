import typescript from 'rollup-plugin-typescript';
import { join } from 'path';

export default {
  dest: 'tmp/index.js',
  entry: 'src/main.ts',
  format: 'cjs',
  plugins: [
    typescript({
      module: 'es2015',
      noEmitHelpers: true,
      target: 'es6',
      typescript: require(
        join(__dirname, 'node_modules', 'typescript', 'lib', 'typescript')
      ),
    }),
  ],
};
