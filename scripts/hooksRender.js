const path = require('path');
const {resolve} = require('path');
const {readdir, writeFile} = require('fs').promises;

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

async function crawlHooks() {
  // this is vuln to filename injection probably
  // but it's a bazillion times faster lol
  for await (const f of getFiles('hooks')) {
    const fname = path.dirname(f)+ '/' + path.basename(f);
    if (path.parse(f).base.includes('-data.js')) {
      continue;
    }
    console.log('executing hook: ' + fname);
    const outputfileName = 'hooks/' + path.parse(fname).name + '-data.js';
    const hook = require(f);
    const data = await hook();
    console.log('writing to output file ' + outputfileName);
    writeFile(outputfileName, `export default ${JSON.stringify(data)}`);
  }
}


crawlHooks();
module.exports = crawlHooks;
