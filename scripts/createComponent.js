const fs = require('fs');
const path = require('path');
const crawlComponents = require('./scssRender');

// for generating the html syntax version of the name
function camelToSnake(string) {
  return string.replace(/[\w]([A-Z])/g, (m) => {
    return m[0] + '-' + m[1];
  }).toLowerCase();
}

function createComponent(name, typescript) {
  let demoTemplate = fs.readFileSync(path.join(__dirname, 'demo-template.html'), 'utf8');
  let componentTemplate =
    fs.readFileSync(path.join(__dirname, typescript ? 'component-template.ts' : 'component-template.js'), 'utf8');

  // place the names in the template strings
  const elementName = camelToSnake(name);
  demoTemplate = demoTemplate.replace(/\[componentElementName\]/g, elementName);
  componentTemplate = componentTemplate.replace(/\[componentElementName\]/g, elementName);
  componentTemplate = componentTemplate.replace(/\[componentName\]/g, name);

  // write out the templated strings in to files
  const componentPath = path.join(__dirname, `../components/${elementName}`);
  fs.mkdirSync(componentPath);
  if (typescript) {
    fs.writeFileSync(`${componentPath}/index.ts`, componentTemplate);
  } else {
    fs.writeFileSync(`${componentPath}/index.js`, componentTemplate);
  }
  fs.writeFileSync(`${componentPath}/demo.html`, demoTemplate);
  fs.writeFileSync(`${componentPath}/styles.scss`, `
    :host {
      color: green;
    }`);
  crawlComponents();
}

// process.argv[2] is the component's camel case name
createComponent(process.argv[2], process.argv.includes('--typescript'));
