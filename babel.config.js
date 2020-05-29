module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
  env: {
    test: {
      presets: ['power-assert'],
    },
    commonjs: {
      presets: [['@babel/preset-env', { modules: 'commonjs', loose: true }]],
      plugins: [
        [
          '@babel/plugin-transform-modules-commonjs',
          { strict: true, noInterop: true },
        ],
        ['babel-plugin-add-import-extension', { extension: 'js' }],
      ],
    },
    esm: {
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: [['babel-plugin-add-import-extension', { extension: 'mjs' }]],
    },
  },
}
