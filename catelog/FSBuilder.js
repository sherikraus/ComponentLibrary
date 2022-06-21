const fs = require('fs');

class FSBuilder {
  constructor(dir) {
    this.components = [];
    this.fileSystem = this.buildFS(dir);
  }

  buildFS(dir) {
    const children = fs.readdirSync(dir);
    const dirInParts = dir.split('/');
    const name = dirInParts[dirInParts.length -1];
    const prettyName = name.replace(/-/g, ' ');

    if (children.includes('index.js') || children.includes('index.ts')) {
      const component = {
        isFolder: false,
        name,
        prettyName,
        dir,
        hasStyle: children.includes('style.scss'),
      };
      this.components.push(component);
      return component;
    }

    const folderObject = {
      isFolder: true,
      name,
      prettyName,
      dir,
      children: [],
    };

    children.forEach((child) => {
      try {
        folderObject.children.push(this.buildFS(`${dir}/${child}`));
      } catch (err) {}
    });

    return folderObject;
  };

  buildHTMLMenu(componentPath) {
    let childString = '';
    this.fileSystem.children.forEach((child) => {
      childString += this.buildHTMLSub(child, componentPath);
    });
    return childString;
  }

  buildHTMLSub(dirObject, componentPath) {
    if (!dirObject.isFolder) {
      const componentSelected = componentPath &&
        componentPath.substring(componentPath.lastIndexOf('/')+1) === dirObject.name;
      return `
      <li><a class="is-capitalized ${componentSelected ? 'is-active' : ''}" href="./demo/${dirObject.name}">
      ${dirObject.prettyName}
      </a></li>
      `;
    }
    const folderSelected = componentPath && componentPath.includes(dirObject.name);
    let childString = '';
    dirObject.children.forEach((child) => {
      childString += this.buildHTMLSub(child, componentPath);
    });
    return `
        <li>
            <a class="is-folder ${folderSelected ? 'is-open' : ''}">
              ${dirObject.prettyName} 
              <i class="far fa-chevron-up" class="chevron"></i>
            </a>
            <ul class="${dirObject.name === 'components' || folderSelected ? '' : 'is-hidden'}">
                ${childString}
           </ul>
        </li>
        `;
  }
}

module.exports = FSBuilder;
