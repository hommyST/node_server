const PORT = 5569

const http = require('http')

const serverHandler = require('./modules/serverHandler')


http.createServer(serverHandler).listen(PORT)

console.log(`Server started on PORT: ${PORT}`)

