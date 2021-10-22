
const jayson = require('jayson')
const { startMining, stopMining} = require('./mine')
const { PORT} = require('./config')
const { utxos } = require('./db');
// create a server
const server = new jayson.Server({
    startMining: function (_, callback) {
        callback(null, 'success!');
        startMining();
    },
    stopMining: function (_, callback) {
        callback(null, 'stopped')
        stopMining();
    },
    getBalance: function ([address], callback) {
        console.log(utxos.map(x => x.owner), address);
        const relUtxos = utxos.filter(x => {
            // console.log(x.owner, address, x.spent);
            // console.log(x.owner=== address);
            return x.owner === address && !x.spent;
        });
        console.log({ relUtxos: relUtxos })
        const sum = relUtxos.reduce((p, c) => p + c.amount, 0);
        callback(null,sum)
    }
});

server.http().listen(PORT);
