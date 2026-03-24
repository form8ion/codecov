import autoExternal from 'rollup-plugin-auto-external';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {codecovRollupPlugin} from '@codecov/rollup-plugin';

export default {
  input: 'src/index.js',
  plugins: [
    autoExternal(),
    nodeResolve({mainFields: ['module']}),
    codecovRollupPlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: '@form8ion/rollup',
      uploadToken: process.env.CODECOV_TOKEN
    })
  ],
  output: [
    {file: 'lib/index.js', format: 'esm', sourcemap: true}
  ]
};
