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
      node.innerHTML = icons[name];
      node.style.backgroundImage = 'none';
      node.removeAttribute(attr);
    } else {
      var match, image = window.getComputedStyle(node).backgroundImage;
      if (match = image.match(/^url\(data:image\/svg\+xml,(.+?)\)$/)) {
        node.innerHTML = icons[name] = decodeURIComponent(match[1]);
        node.style.backgroundImage = 'none';
        node.removeAttribute(attr);
      } else if (match = image.match(/^url\((.+?)\)$/)) {
        var url = match[1];
        var xhr = new window.XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
          node.innerHTML = icons[name] = xhr.responseText;
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

  if (typeof module !== "undefined") {
    module.exports = svgEmbed;
  } else {
    window.svgEmbed = svgEmbed;
  }
})(window.document);
