module.exports = {
  presets: [['@babel/preset-env', { modules: false }]],
  plugins: [
    'babel-plugin-transform-import-meta',
    '@babel/plugin-syntax-import-assertions',
    '@babel/plugin-transform-modules-commonjs',
  ],
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'babel-plugin-transform-import-meta',
      ],
    },
  },
  sourceType: 'unambiguous',
  retainLines: true,
  compact: true,
  babelrc: false,
};
