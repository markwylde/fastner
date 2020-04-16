# fastner
Build [fastn](https://github.com/korynunn/fastn) UI's quickly using HTML and JS straight in the browser

## Getting Started
```bash
npm install
npm start
```

Then goto http://localhost:8000 in your browser

## Build a site
Create an empty index.html anywhere with the following contents:

### Shortcuts
```html
<!DOCTYPE html>
<html>
<head>
  <title>Fastner Demo</title>
  <script src="https://markwylde.github.io/fastner/demo/fastner.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const state = window.state = {
        name: 'World'
      }

      fastner(document.body, state)
    })
  </script>
</head>
<body>
  <h1>Hello</h1>
  <p>We want to give a big hello to <text data="binding('name')" /></p>
</body>
</html>
```

### Legit
```html
<!DOCTYPE html>
<html>
<head>
  <title>Fastner Demo</title>
  <script src="https://markwylde.github.io/fastner/demo/fastner.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const state = window.state = {
        name: 'World'
      }

      const app = fastn('div',
        fastn('h1', 'Hello ', binding('name'))
      ).attach(state)
      
      app.render()
      
      document.body.appendChild(app.element)
    })
  </script>
</head>
<body>

</body>
</html>
```