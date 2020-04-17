const { fastn, binding, mutate } = require('./fastn');

function execute (code) {
  try {
    return eval(code);
  } catch (error) {
    console.error('Could not execute js:\n' + code, error);
    throw error;
  }
}

function fetchAttributes (node) {
  if (!node) {
    return {};
  }

  return Array.prototype.reduce.call(node.attributes, function (list, attribute) {
    if (attribute.name.endsWith(':binding')) {
      list[attribute.name.slice(0, -':binding'.length)] = execute(`binding(${attribute.value})`);
      delete list[attribute.name];
    } else {
      list[attribute.name] = attribute.value;
    }

    return list;
  }, {});
}

function createChild (child, children) {
  const attributes = fetchAttributes(child);

  if (attributes.list) {
    attributes.items = attributes.list;

    attributes.template = () =>
      objectToFastn(Array.from(child.childNodes).find(el => el.nodeName !== '#text'));

    return fastn('list:' + child.tagName, attributes);
  }

  if (child.tagName === 'TEXT') {
    return fastn('text', {
      text: attributes.data
    });
  }

  return fastn(child.tagName, attributes, ...children);
}

function objectToFastn (obj) {
  const children = Array.from(obj.childNodes).map(child => {
    if (child.nodeName === '#text') {
      return fastn('text', { text: child.data });
    }

    if (child.childNodes.length > 0) {
      return objectToFastn(child);
    }

    return createChild(child, [child.textContent]);
  });

  return createChild(obj, children);
}

function fastner (element, state) {
  const dom = (new DOMParser()).parseFromString(
    `
    <${element.tagName}>${element.innerHTML}</${element.tagName}>`
    , 'text/html');

  const app = objectToFastn(dom.childNodes[0])
    .attach(state);

  app.render();

  element.replaceWith(app.element);
}

window.fastn = fastn;
window.mutate = mutate;
window.binding = binding;
window.fastner = fastner;
