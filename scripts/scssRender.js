const path = require('path');
const SassRenderer = require('wc-sass-render');
const {resolve} = require('path');
const {readdir} = require('fs').promises;

async function* getFiles(dir) {
  const dirents = await readdir(dir, {withFileTypes: true});
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function crawlComponents() {
  // this is vuln to filename injection probably
  // but it's a bazillion times faster lol
  for await (const f of getFiles('.')) {
    const fname = path.dirname(f)+ '/' + path.basename(f);
    if (fname.includes('styles.scss')) {
      // eslint-disable-next-line no-use-before-define
      const renderer = new SassRenderer({
        template: path.resolve('./scripts/css-template.js'),
        delim: /{{css}}/,
        expandedOutput: false,
        suffix: '-css.js',
      });
      await renderer.render(fname, false);
    }
  }
}


crawlComponents();
module.exports = crawlComponents;
