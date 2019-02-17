import { Address } from '../address';
export declare type BlockType = 'latest' | 'pending' | 'genesis' | number;
export declare type BlockHash = string;
export interface Transaction {
    hash: string;
    nonce: number;
    blockHash: string;
    blockNumber: number;
    transactionIndex: number;
    from: Address;
    to: Address;
    value: string;
    gasPrice: string;
    gas: number;
    input: string;
    v?: string;
    r?: string;
    s?: string;
}
