const mimeTypes = require('./content_type')

function getApi(req, res, body) {
  // console.log(body);
  
  res.setHeader('Content-Type', mimeTypes.json)

  switch (req.url.slice(1)) {
    case 'test':
      res.writeHead(200)
      let data = [
        { id: 1, test: true, name: 'Вася', age: 21 },
        { id: 2, test: true, name: 'Петя', age: 25 },
        { id: 3, test: true, name: 'Коля', age: 23 },
        { id: 4, test: true, name: 'Иолай', age: 23 },
        { id: 5, test: true, name: 'Еблаша', age: 27 },
        { id: 6, test: true, name: 'Коля', age: 23 },
      ]

      Object.keys(body).forEach(key => {
        if (key in data[0]) {
          data = data.filter(item => item[key] === body[key])
        }
      })

      res.end(JSON.stringify(data))
      break;
  
    default:
      break;
  }
}

module.exports = getApi