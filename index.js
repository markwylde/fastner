const {fastn, binding} = require('./fastn')

function fetchAttributes (node) {
  return node && Array.prototype.reduce.call(node.attributes, function(list, attribute) {
    list[attribute.name] = attribute.value;
    return list;
  }, {}) || {};
};

function createChild (child, children) {
  const attributes = fetchAttributes(child)
  if (attributes.list) {
    attributes.items = binding(attributes.list)

    attributes.template = () =>
      objectToFastn(Array.from(child.childNodes).find(el => el.nodeName !== '#text'))

    return fastn('list:' + child.tagName, attributes)
  }

  if (child.tagName === 'binding') {
    return fastn('text', {text: binding(attributes.value)} )
  }
  
  return fastn(child.tagName, attributes, ...children)

}

function objectToFastn (obj) {
  const children = Array.from(obj.childNodes).map(child => {
    if (child.nodeName === '#text') {
      return fastn('text', {text: child.data})
    }

    if (child.childNodes.length > 0) {
      return objectToFastn(child)
    }

    return createChild(child, [child.textContent])
  })

  return createChild(obj, children)
}

function fastner (element, state) {
  const dom = (new DOMParser()).parseFromString(
    `<${element.tagName}>${element.innerHTML}</${element.tagName}>`
  , 'text/xml')

  const app = objectToFastn(dom.childNodes[0])
    .attach(state)

  app.render()

  element.replaceWith(app.element)
}

window.fastner = fastner
