import { TransactionReceipt } from '../formatters';
import { TransactionHash } from '../types';
import { Eth } from './eth';
export interface SendTx<TxReceipt = TransactionReceipt> {
    getTxHash(): Promise<TransactionHash>;
    getReceipt(numConfirmations?: number, confirmationCallback?: (conf: number, receipt: TxReceipt) => void): Promise<TxReceipt>;
}
export declare class SentTransaction implements SendTx {
    protected eth: Eth;
    protected txHashPromise: Promise<TransactionHash>;
    private receipt?;
    private blocksSinceSent;
    constructor(eth: Eth, txHashPromise: Promise<TransactionHash>);
    getTxHash(): Promise<TransactionHash>;
    getReceipt(numConfirmations?: number, confirmationCallback?: (conf: number, receipt: TransactionReceipt) => void): Promise<TransactionReceipt>;
    protected handleReceipt(receipt: TransactionReceipt): Promise<TransactionReceipt<void>>;
}
