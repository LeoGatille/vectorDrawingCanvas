const path = require('path');
var glob = require('glob');

module.exports = {
  watch: true,
  mode: 'development',
  // entry: './dist/CanvasWindow',
  entry: glob.sync('./dist/*.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'bundle'),
  },
};
