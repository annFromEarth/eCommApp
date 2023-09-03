module.exports = {
  plugins: ['babel-plugin-transform-import-meta'],
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
};
