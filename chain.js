var ganache = require("ganache-cli");
var server = ganache.server({
  'network_id': 70,
  'total_accounts': 20,
  'db_path': 'chain',
  'mnemonic': 'myth like bonus scare over problem client lizard pioneer submit female collect'
})
server.listen(8545, (err, blockchain) => {
  console.log('err', err)
  console.log('blockchain', blockchain.options)
})
