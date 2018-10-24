const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(index, timestamp, data, previousHash) {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty) {

		//Keep mining till hash starts with no of zeroes specified by 'diffculty' var
		/*
		'nonce' is introduced solely for creating a new hash without changing any other value 
		in the block. It helps in creating a new hash or else we will never be able to generate a new 
		hash and never be able to satisfy condition of prefixing the hash with 'difficulty' zeroes
		*/
		while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")) {
			// console.log('\n\n',this.hash);
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log("Block mined.." + this.hash);
	}
}

class BlockChain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
	}

	createGenesisBlock() {
		return new Block(0, "22/10/2018 23:59", "Genesis Block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		// newBlock.hash = newBlock.calculateHash();
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	isChainValid() {
		// var isValid = true;
		for(var count = 1; count < this.chain.length ; count++) {
			if(this.chain[count].hash !== this.chain[count].calculateHash()) {
				return false;
			} else if(this.chain[count].previousHash !== this.chain[count - 1].hash) {
				return false;
			} 
		}

		return true;
	}
}

let adithyaCoin = new BlockChain();

console.log("Mining Block 1..");
adithyaCoin.addBlock(new Block(1, "23/10/2018 00:09", {amount : 6}));

console.log("Mining Block 2..");
adithyaCoin.addBlock(new Block(2, "23/10/2018 00:10", {amount : 10}));
/* Code from video 1

console.log(JSON.stringify(adithyaCoin, null, 4));

console.log(adithyaCoin.isChainValid());
adithyaCoin.chain[1].data = {amount : 15};
console.log(adithyaCoin.isChainValid());*/