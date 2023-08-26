const mimeTypes = require('./content_type')

function getApi(req, res, body) {
  let data = require('./test_data.json')
  // console.log(body);
  
  res.setHeader('Content-Type', mimeTypes.json)

  switch (req.url.slice(1)) {
    case 'test':
      res.writeHead(200)
      

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