const Block = require('./models/Block.js')
const db = require('./db')
const Transaction = require('./models/Transaction');
const { PUBLIC_KEY } = require('./config')
const UTXO = require('./models/UTXO');
const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));
const BLOCK_REWARD = 10;


let mining = true;
function startMining() {
    mining = true;
    mine();
}
function stopMining() {
    mining = false;
}
function mine() {
    if (!mining) return;
    const block = new Block();
    //TODO take transactions from the mempool
    const coinbase_utxo = new UTXO(PUBLIC_KEY, BLOCK_REWARD)
    const coinbaseTX = new Transaction([], [coinbase_utxo])
    block.addTransaction(coinbaseTX);
    while (BigInt("0x" + block.hash()) >= TARGET_DIFFICULTY) {
        // console.log(`increasing nonce to: ${block.nonce}  hash = ${block.hash()}` );
        block.nonce++;
    }
    // console.log()
    block.execute();
    db.blockchain.addBlock(block)
    console.log(`mine block ${db.blockchain.blockHeight()} with hash of ${block.hash()} at nonce: ${block.nonce}`)
    setTimeout(mine, 5000);
}

// module.exports = mine;
module.exports = {
    startMining,
    stopMining,
};
