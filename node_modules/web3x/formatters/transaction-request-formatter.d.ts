/// <reference types="node" />
import { Address } from '../address';
export interface PartialTransactionRequest {
    from?: Address;
    to?: Address;
    gas?: string | number;
    gasPrice?: string | number;
    value?: string | number;
    data?: Buffer;
    nonce?: string | number;
}
export interface TransactionRequest {
    from: Address;
    to?: Address;
    gas?: string | number;
    gasPrice?: string | number;
    value?: string | number;
    data?: Buffer;
    nonce?: string | number;
}
export interface RawTransactionRequest {
    from: string;
    to?: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
    nonce?: string;
}
export declare function toRawTransactionRequest(tx: TransactionRequest): RawTransactionRequest;
export declare function fromRawTransactionRequest(tx: RawTransactionRequest): TransactionRequest;
