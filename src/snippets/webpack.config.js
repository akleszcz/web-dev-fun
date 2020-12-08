const path = require('path');

module.exports = {
  entry: './js/snippets.js',
  module: {
    rules: [
      {
        test: /data.*\.(html|js)$/i,
        use: 'raw-loader',
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};