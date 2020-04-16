const fastn = require('fastn')({
  text: require('fastn/textComponent'),
  list: require('fastn/listComponent'),
  templater: require('fastn/templaterComponent'),
  _generic: require('fastn/genericComponent')
});

module.exports = {
  fastn,
  mutate: fastn.Model,
  binding: fastn.binding
};
