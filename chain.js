#!/usr/bin/env node
var ganache = require("ganache-cli");
var dataDir = `${__dirname}/chain`;

var server = ganache.server({
  'network_id': 70,
  'total_accounts': 20,
  'db_path': dataDir,
  'mnemonic': 'myth like bonus scare over problem client lizard pioneer submit female collect'
})
server.listen(8545, (err, blockchain) => {
  console.log('err', err)
  console.log('blockchain', blockchain.options)
})
