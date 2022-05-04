const express = require('express');

const app = express();
const server = require('http').createServer(app);
// const io = require('socket.io')(server, { cors: { origin: '*' } });
const io = require("socket.io").listen(server);
const { CryptoBlockchain } = require("./cryptoBlockchain")
server.listen(80);

exports.server = {
  run(port) {
    server.listen(port, () => {
      console.log('Server listening at port %d', port);
    });
  },
};

let blockChain = new CryptoBlockchain

let chain = blockChain.chain;
let pendingTransactions = blockChain.pendingTransactions;

io.on('connection', function onConnection(socket) {
  socket.emit("sync-block", { chain, pendingTransactions});

  socket.on("update-db", (data) => {
    chain = data.chain;
    pendingTransactions = data.pendingTransactions;
    io.sockets.emit("sync-block", { chain, pendingTransactions});
  })

  socket.on("send-money", function onMessage(data) {
    try {
      
      io.sockets.emit("sync-block", {blockChain})
    }
    catch (e) {
      console.log(e.message);
    }

  })

  socket.on("mined", function onMessage(data) {
    io.sockets.emit("mined", { nonce: data.nonce, block: data.block })
  })

  socket.on("mine-confirm", function onMessage(data) {
    io.sockets.emit("mined", { nonce: data.nonce, block: data.block })
  })
});
