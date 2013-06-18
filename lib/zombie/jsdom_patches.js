// Generated by CoffeeScript 1.4.0
var HTML, HTML5, element, _i, _len, _ref;

HTML = require("jsdom").dom.level3.html;

HTML5 = require("html5");

HTML.HTMLElement.prototype.__defineGetter__("offsetLeft", function() {
  return 0;
});

HTML.HTMLElement.prototype.__defineGetter__("offsetTop", function() {
  return 0;
});

HTML.HTMLScriptElement.prototype.__defineGetter__("src", function() {
  return this.getAttribute('src') || "";
});

HTML.HTMLElement.prototype.__defineGetter__("id", function() {
  return this.getAttribute("id") || "";
});

_ref = [HTML.HTMLInputElement, HTML.HTMLButtonElement, HTML.HTMLParamElement];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  element = _ref[_i];
  element.prototype.__defineGetter__("value", function() {
    return this.getAttribute("value") || "";
  });
}

HTML.HTMLAnchorElement.prototype._eventDefaults = {
  click: function(event) {
    var anchor, browser, window;
    anchor = event.target;
    if (!anchor.href) {
      return;
    }
    window = anchor.ownerDocument.window;
    browser = window.browser;
    switch (anchor.target || "_self") {
      case "_self":
        window.location = anchor.href;
        break;
      case "_parent":
        window.parent.location = anchor.href;
        break;
      case "_top":
        window.top.location = anchor.href;
        break;
      default:
        browser.tabs.open({
          name: anchor.target,
          url: anchor.href
        });
    }
    return browser.emit("link", anchor.href, anchor.target || "_self");
  }
};

Object.defineProperty(HTML.CSSStyleDeclaration.prototype, "opacity", {
  get: function() {
    return this._opacity || "";
  },
  set: function(opacity) {
    if (opacity) {
      opacity = parseFloat(opacity);
      if (!isNaN(opacity)) {
        return this._opacity = opacity.toString();
      }
    } else {
      return delete this._opacity;
    }
  }
});

["height", "width"].forEach(function(prop) {
  var client, internal, offset;
  internal = "_" + prop;
  client = "client" + (prop[0].toUpperCase()) + (prop.slice(1));
  offset = "offset" + (prop[0].toUpperCase()) + (prop.slice(1));
  Object.defineProperty(HTML.CSSStyleDeclaration.prototype, prop, {
    get: function() {
      return this[internal] || "";
    },
    set: function(value) {
      if (/^\d+px$/.test(value)) {
        return this[internal] = value;
      } else if (!value) {
        return delete this[internal];
      }
    }
  });
  Object.defineProperty(HTML.HTMLElement.prototype, client, {
    get: function() {
      return parseInt(this[internal] || 100);
    }
  });
  return Object.defineProperty(HTML.HTMLElement.prototype, offset, {
    get: function() {
      return parseInt(this[internal] || 100);
    }
  });
});

HTML5.TreeBuilder.prototype.createElement = function(name, attributes, namespace) {
  var el, i, _j, _k, _ref1, _ref2;
  el = this.document.createElement(name);
  el.namespace = namespace;
  if (attributes) {
    if (attributes.item) {
      for (i = _j = 0, _ref1 = attributes.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        this.copyAttributeToElement(el, attributes.item(i));
      }
    } else {
      for (i = _k = 0, _ref2 = attributes.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
        this.copyAttributeToElement(el, attributes[i]);
      }
    }
  }
  return el;
};