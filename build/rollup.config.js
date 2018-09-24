import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import minimist from 'minimist';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify-es';
import vue from 'rollup-plugin-vue';

const argv = minimist(process.argv.slice(2));

const config = {
  input: 'build/index.js',
  output: {
    name: 'Croppie',
    exports: 'named',
  },
  plugins: [
    vue(),
    babel({
      exclude: 'node_modules/**',
      externalHelpersWhitelist: ['objectSpread'],
      plugins: ['transform-object-rest-spread'],
      presets: [['env', { modules: false }]],
    }),
    resolve(),
    commonjs({
      namedExports: {
        'croppie': ['Croppie']
      },
    }),
  ],
};

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(uglify());
}

export default config;
