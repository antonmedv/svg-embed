(function (window, document, undefined) {
  var attr = 'data-svg-embed';
  var icons = {};
  var pending = {};

  function svgEmbed() {
    var nodes = document.querySelectorAll('[' + attr + ']');
    for (var i = 0; i < nodes.length; i++) {
      compileAndEmbed(nodes[i]);
    }
  }

  function compileAndEmbed(node) {
    var name = getIconName(node);
    if (name in icons) {
      embed(node, name);
      node.removeAttribute(attr);
    } else {
      var match, url = decodeURIComponent(window.getComputedStyle(node).backgroundImage);
      if (match = url.match(/^url\(["']?data:image\/svg\+xml(;charset=[\w\-]+)?,(.+?)["']?\)$/)) {

        icons[name] = compile(match[2]);

        embed(node, name);
        node.removeAttribute(attr);

      } else if (match = url.match(/^url\(["']?data:image\/svg\+xml(;charset=[\w\-]+)?;base64,(.+?)["']?\)$/)) {

        icons[name] = compile(atob(match[2]));

        embed(node, name);
        node.removeAttribute(attr);

      } else if (match = url.match(/^url\(["']?(.+?)["']?\)$/)) {

        if (pending[name] !== undefined) {
          pending[name].push(function () {
            embed(node, name);
          });
        } else {
          var xhr = new window.XMLHttpRequest();
          xhr.open("GET", match[1], true);
          xhr.onload = function () {
            icons[name] = compile(xhr.responseText);
            embed(node, name);

            for (var i = 0; i < pending[name].length; i++) {
              pending[name][i]();
            }
            pending[name] = undefined;
          };
          pending[name] = [];
          xhr.send();
        }
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

  function embed(node, name) {
    node.appendChild(icons[name].cloneNode(true));
    node.style.backgroundImage = 'none';
  }

  if (typeof module !== "undefined") {
    module.exports = svgEmbed;
  } else {
    window.svgEmbed = svgEmbed;
  }
})(window, window.document, void 0);
