const products = []
for (let i = 0; i < 100; i++) {
  products.push({
    title: 'test ' + i,
    tags: ['blue', i % 2 ? 'odd' : 'even'],
    price: i
  })
}

const state = window.state = {
  name: 'testing testing 123',
  products,
  totalPrice: products.reduce((total, item) => total + item.price, 0)
}

document.addEventListener('DOMContentLoaded', function () {
  fastner(document.body, state)
})
