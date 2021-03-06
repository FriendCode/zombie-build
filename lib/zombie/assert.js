// Generated by CoffeeScript 1.4.0
var Assert, URL, assert, assertMatch, isRegExp;

assert = require("assert");

isRegExp = require("util").isRegExp;

URL = require("url");

assertMatch = function(actual, expected, message) {
  if (isRegExp(expected)) {
    return assert(expected.test(actual), message || ("Expected '" + actual + "' to match " + expected));
  } else if (typeof expected === "function") {
    return assert(expected(actual), message);
  } else {
    return assert.deepEqual(actual, expected, message);
  }
};

Assert = (function() {

  function Assert(browser) {
    this.browser = browser;
  }

  Assert.prototype.cookie = function(identifier, expected, message) {
    var actual;
    if (arguments.length === 1) {
      expected = null;
    }
    actual = this.browser.getCookie(identifier);
    message || (message = "Expected cookie " + (JSON.stringify(identifier)) + " to have the value '" + expected + "', found '" + actual + "'");
    return assertMatch(actual, expected, message);
  };

  Assert.prototype.redirected = function(message) {
    return assert(this.browser.redirected, message);
  };

  Assert.prototype.status = function(code, message) {
    return assert.equal(this.browser.statusCode, code, message);
  };

  Assert.prototype.success = function(message) {
    return assert(this.browser.success, message);
  };

  Assert.prototype.url = function(expected, message) {
    var defaultValue, key, url, value, _results;
    if (typeof expected === "string" || isRegExp(expected) || typeof expected === "function") {
      return assertMatch(this.browser.location.href, expected, message);
    } else {
      url = URL.parse(this.browser.location.href, true);
      _results = [];
      for (key in expected) {
        value = expected[key];
        if (key === "port") {
          defaultValue = 80;
        } else {
          defaultValue = null;
        }
        _results.push(assertMatch(url[key] || defaultValue, value || defaultValue, message));
      }
      return _results;
    }
  };

  Assert.prototype.attribute = function(selector, name, expected, message) {
    var actual, element, elements, _i, _len, _results;
    if (arguments.length === 2) {
      expected = null;
    }
    elements = this.browser.queryAll(selector);
    assert(elements.length > 0, "Expected selector '" + selector + "' to return one or more elements");
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      actual = element.getAttribute(name);
      _results.push(assertMatch(actual, expected, message));
    }
    return _results;
  };

  Assert.prototype.element = function(selector, message) {
    return this.elements(selector, {
      exactly: 1
    }, message);
  };

  Assert.prototype.elements = function(selector, count, message) {
    var elements;
    elements = this.browser.queryAll(selector);
    if (arguments.length === 1) {
      count = {
        atLeast: 1
      };
    }
    if (count.exactly) {
      count = count.exactly;
    }
    if (typeof count === "number") {
      message || (message = "Expected " + count + " elements matching '" + selector + "', found " + elements.length);
      return assert.equal(elements.length, count, message);
    } else {
      if (count.atLeast) {
        elements = this.browser.queryAll(selector);
        message || (message = "Expected at least " + count.atLeast + " elements matching '" + selector + "', found only " + elements.length);
        assert(elements.length >= count.atLeast, message);
      }
      if (count.atMost) {
        message || (message = "Expected at most " + count.atMost + " elements matching '" + selector + "', found " + elements.length);
        return assert(elements.length <= count.atMost, message);
      }
    }
  };

  Assert.prototype.hasClass = function(selector, expected, message) {
    var classNames, element, elements, _i, _len, _results;
    elements = this.browser.queryAll(selector);
    assert(elements.length > 0, "Expected selector '" + selector + "' to return one or more elements");
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      classNames = element.className.split(/\s+/);
      _results.push(assert(~classNames.indexOf(expected), message || ("Expected element '" + selector + "' to have class " + expected + ", found " + (classNames.join(", ")))));
    }
    return _results;
  };

  Assert.prototype.hasNoClass = function(selector, expected, message) {
    var classNames, element, elements, _i, _len, _results;
    elements = this.browser.queryAll(selector);
    assert(elements.length > 0, "Expected selector '" + selector + "' to return one or more elements");
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      classNames = element.className.split(/\s+/);
      _results.push(assert(classNames.indexOf(expected) === -1, message || ("Expected element '" + selector + "' to not have class " + expected + ", found " + (classNames.join(", ")))));
    }
    return _results;
  };

  Assert.prototype.className = function(selector, expected, message) {
    var actual, element, elements, _i, _len, _results;
    elements = this.browser.queryAll(selector);
    assert(elements.length > 0, "Expected selector '" + selector + "' to return one or more elements");
    expected = expected.split(/\s+/).sort().join(" ");
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      actual = element.className.split(/\s+/).sort().join(" ");
      _results.push(assertMatch(actual, expected, message || ("Expected element '" + selector + "' to have class " + expected + ", found " + actual)));
    }
    return _results;
  };

  Assert.prototype.style = function(selector, style, expected, message) {
    var actual, element, elements, _i, _len, _results;
    if (arguments.length === 2) {
      expected = null;
    }
    elements = this.browser.queryAll(selector);
    assert(elements.length > 0, "Expected selector '" + selector + "' to return one or more elements");
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      actual = element.style[style];
      _results.push(assertMatch(actual, expected, message || ("Expected element '" + selector + "' to have style " + style + " value of " + expected + ", found " + actual)));
    }
    return _results;
  };

  Assert.prototype.input = function(selector, expected, message) {
    var element, elements, _i, _len, _results;
    if (arguments.length === 1) {
      expected = null;
    }
    elements = this.browser.queryAll(selector);
    assert(elements.length > 0, "Expected selector '" + selector + "' to return one or more elements");
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      _results.push(assertMatch(element.value, expected, message));
    }
    return _results;
  };

  Assert.prototype.text = function(selector, expected, message) {
    var actual, elements;
    elements = this.browser.queryAll(selector);
    assert(elements.length > 0, "Expected selector '" + selector + "' to return one or more elements");
    actual = elements.map(function(e) {
      return e.textContent;
    }).join("").trim().replace(/\s+/g, " ");
    return assertMatch(actual, expected || "", message);
  };

  Assert.prototype.hasFocus = function(selector, message) {
    var elements;
    if (selector) {
      elements = this.browser.queryAll(selector);
      assert.equal(elements.length, 1, "Expected selector '" + selector + "' to return one element");
      return assert.equal(this.browser.activeElement, elements[0], "Expected element '" + selector + "' to have the focus'");
    } else {
      return assert.equal(this.browser.activeElement, this.browser.body, "Expected no element to have focus");
    }
  };

  Assert.prototype.evaluate = function(expression, expected, message) {
    var actual;
    actual = this.browser.evaluate(expression);
    if (arguments.length === 1) {
      return assert(actual);
    } else {
      return assertMatch(actual, expected, message);
    }
  };

  Assert.prototype.global = function(name, expected, message) {
    var actual;
    actual = this.browser.window[name];
    if (arguments.length === 1) {
      return assert(actual);
    } else {
      message || (message = "Expected global " + name + " to have the value '" + expected + "', found '" + actual + "'");
      return assertMatch(actual, expected, message);
    }
  };

  Assert.prototype.prompted = function(messageShown, message) {
    return assert(this.browser.prompted(messageShown), message);
  };

  return Assert;

})();

module.exports = Assert;
