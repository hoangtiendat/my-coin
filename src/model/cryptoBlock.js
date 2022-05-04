const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class CryptoBlock{
    constructor(index, timestamp, data, precedingHash=" "){
     this.index = index;
     this.timestamp = timestamp;
     this.data = data;
     this.precedingHash = precedingHash;
     this.hash = this.computeHash();
     this.nonce = 0;
    }
    computeHash(){
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');
    }
    proofOfWork(difficulty){
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.computeHash();
        }        
    }
  
}
exports.CryptoBlock = CryptoBlock;
