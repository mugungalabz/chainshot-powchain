
const INIT_BLOCKHASH = "0x0"
class Blockchain  {
    constructor() {
        this.blocks = []
    }
    addBlock(block) {
        this.blocks.push(block)
    }
    blockHeight() {
        return this.blocks.length;
    }
    lastBlockHash() {
        return this.blocks.length == 0 ? INIT_BLOCKHASH : this.blocks[this.blocks.length - 1].hash();
    }
}

module.exports = Blockchain