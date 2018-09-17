const path = require('path');

const rootPath = path.resolve(__dirname, '..');
const dirDist = path.join(rootPath, 'public');
const dirDistJs = path.join(dirDist, 'js');
const dirDistStyle = path.join(dirDist, 'css');
const dirSrc = path.join(rootPath, 'src');
const dirSrcJs = path.join(dirSrc, 'js');
const dirSrcStyle = path.resolve(dirSrc, 'scss');
const dirSrcPug = path.resolve(dirSrc, 'pug');

module.exports = {
  rootPath,
  dirDist,
  dirDistJs,
  dirDistStyle,
  dirSrc,
  dirSrcJs,
  dirSrcStyle,
  dirSrcPug,
};
