(function () {
  const componentName = window.location.pathname.split("/demo/")[1];
  fetch('/git/' + componentName)
    .then(function (response) { return response.json(); })
    .then(function (sortedAuthors) {
      let first = true;
      const crown = '<span style="padding-right: 10px;">👑</span>';
      sortedAuthors.forEach(function (author) {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerHTML = (first ? crown : '') + author.name + ' - ' + Math.floor(author.percent);
        first = false;
        document.querySelector('#contributors').appendChild(tag);
      });
    })
    .catch((e) => {
      console.error('Failed to load contributors', e);
    });
})();