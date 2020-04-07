const express = require('express');

const postsRouter = require('./posts/router');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2 style='text-align: center; margin-top: 20px;'>Test home page</h2>
  `)
});

const port = 5000;

let address, os = require('os'), ifaces = os.networkInterfaces();

for ( let dev in ifaces ) {
  let iface = ifaces[dev].filter( details => {
    return details.family === 'IPv4' && details.internal === false;
  });

  if (iface.length > 0) address = iface[0].address;

}

server.listen(port, () => 
  console.log(`\nServer running ...\n  localhost:${port} \n  Network: ${address}:${port}`));