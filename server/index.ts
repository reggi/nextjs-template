import * as http from 'http'

import { Server } from "socket.io"
import bodyParser from 'body-parser';
import express from 'express'
import next from 'next'

const port = process.env.PORT || '3000'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const expressServer = express()
const httpServer = new http.Server(expressServer)
const io = new Server(httpServer);

// set up socket.io and bind it to our
// http server.

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

app.prepare().then(() => {

  expressServer.use(bodyParser.json());
  expressServer.use(bodyParser.raw());

  expressServer.all('*', (req, res) => {
    return handle(req, res)
  })

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
