const client = require('./client')
const { PUBLIC_KEY } = require('../config')
const { argv } = require('yargs')
const { address } = argv;

console.log({
    argv: argv
})

client.request('getBalance', [address], function (err, response) {
    if (err) throw err;
    console.log({ balance: response.result });
});