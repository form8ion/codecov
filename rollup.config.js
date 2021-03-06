import autoExternal from 'rollup-plugin-auto-external';
import babel from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  plugins: [
    autoExternal(),
    babel({
      babelrc: false,
      exclude: ['./node_modules/**'],
      presets: [['@form8ion', {targets: {node: '12.20'}, modules: false}]]
    }),
    nodeResolve({mainFields: ['module']})
  ],
  output: [
    {file: 'lib/index.cjs.js', format: 'cjs', sourcemap: true},
    {file: 'lib/index.es.js', format: 'es', sourcemap: true}
  ]
};
