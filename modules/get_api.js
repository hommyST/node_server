const mimeTypes = require('./content_type')

function getApi(req, res, body) {
  
  res.setHeader('Content-Type', mimeTypes.json)

  switch (req.url.slice(1)) {
    case 'test':
      res.writeHead(200)
      let data = [
        { id: 1, test: true, name: 'Вася', age: 21 },
        { id: 2, test: true, name: 'Петя', age: 25 },
        { id: 3, test: true, name: 'Коля', age: 23 },
        { id: 4, test: true, name: 'Иолай', age: 232 },
        { id: 5, test: true, name: 'Еблаша', age: 27 },
      ]

      if ('id' in body) {
        data = data.find(item => item.id === body.id)
      }

      res.end(JSON.stringify(data))
      break;
  
    default:
      break;
  }
}

module.exports = getApi