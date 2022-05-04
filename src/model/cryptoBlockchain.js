import { CryptoBlock } from './cryptoBlock';
import { Transaction } from './transaction';


class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    startGenesisBlock() {
        return new CryptoBlock(0, "01/01/2020", "Initial Block in the Chain", "0");
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction("Reward", miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        const block = new CryptoBlock(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        if (transaction.amount <= 0) {
            throw new Error('Transaction amount should be higher than 0');
        }

        if (this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount) {
            throw new Error('Not enough balance');
        }

        this.pendingTransactions.push(transaction);
        console.log('transaction added: %s', transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 100;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += parseInt(trans.amount);
                }
            }
        }

        for (const trans of this.pendingTransactions) {
            if (trans.fromAddress === address) {
                balance -= trans.amount;
            }

            if (trans.toAddress === address) {
                balance += parseInt(trans.amount);
            }
        }

        console.log('getBalanceOfAdrees: %s', balance);
        return balance;
    }

    getAllTransactionsForWallet(address) {
        const txs = [];

        for (const block of this.chain) {
            for (const tx of block.transactions) {
                if (tx.fromAddress === address || tx.toAddress === address) {
                    txs.push(tx);
                }
            }
        }

        for (const tx of this.pendingTransactions) {
            if (tx.fromAddress === address || tx.toAddress === address) {
                txs.push(tx);
            }
        }

        console.log('get transactions for wallet count: %s', txs.length);
        return txs;
    }
    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];

            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.precedingHash !== precedingBlock.hash)
                return false;
        }
        return true;
    }

}
const _CryptoBlockchain = CryptoBlockchain;
export { _CryptoBlockchain as CryptoBlockchain };
