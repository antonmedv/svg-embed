(function () {
  var attr = 'data-svg-embed';
  var icons = {};

  function svgEmbed() {
    var nodes = document.querySelectorAll(`[${attr}]`);
    for (var i = 0; i < nodes.length; i++) {
      embed(nodes[i]);
    }
  }

  function embed(node) {
    var name = getIconName(node);
    if (name in icons) {
      node.appendChild(icons[name].cloneNode(true));
      node.style.backgroundImage = 'none';
      node.removeAttribute(attr);
    } else {
      var match, image = window.getComputedStyle(node).backgroundImage;
      if (match = image.match(/^url\(data:image\/svg\+xml,(.+?)\)$/)) {

        icons[name] = compile(decodeURIComponent(match[1]));
        node.appendChild(icons[name].cloneNode(true));
        node.style.backgroundImage = 'none';
        node.removeAttribute(attr);

      } else if (match = image.match(/^url\((.+?)\)$/)) {

        var url = match[1];
        var xhr = new window.XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
          if (!(name in icons)) {
            icons[name] = compile(xhr.responseText);
          } else {
            console.log('reuse', name);
          }
          node.appendChild(icons[name].cloneNode(true));
          node.style.backgroundImage = 'none';
        };
        xhr.send();

        node.removeAttribute(attr);

      }
    }
  }

  function getIconName(node) {
    var match = node.className.match(/(icon-[\w-]+)/i);
    if (match) {
      return match[1];
    } else {
      return false;
    }
  }

  function compile(code) {
    var container = document.createElement('div');
    container.innerHTML = code;
    return container.querySelector('svg');
  }

  if (typeof module !== "undefined") {
    module.exports = svgEmbed;
  } else {
    window.svgEmbed = svgEmbed;
  }
})(window.document);
