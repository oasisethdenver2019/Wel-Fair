import { Address } from '../address';
export interface RawTransactionResponse {
    blockHash: string | null;
    blockNumber: string | null;
    from: string;
    gas: string;
    gasPrice: string;
    hash: string;
    input: string;
    nonce: string;
    to: string | null;
    transactionIndex: string | null;
    value: string;
    v: string;
    r: string;
    s: string;
}
export interface TransactionResponse {
    blockHash: string | null;
    blockNumber: number | null;
    from: Address;
    gas: number;
    gasPrice: string;
    hash: string;
    input: string;
    nonce: number;
    to: Address | null;
    transactionIndex: number | null;
    value: string;
    v: string;
    r: string;
    s: string;
}
export declare function fromRawTransactionResponse(tx: RawTransactionResponse): TransactionResponse;
export declare function toRawTransactionResponse(tx: TransactionResponse): RawTransactionResponse;
