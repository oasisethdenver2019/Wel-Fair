/// <reference types="node" />
import { Address } from '../address';
import { Eth } from '../eth';
export interface SignTransactionRequest {
    chainId?: number | string;
    to?: Address;
    gas?: string | number;
    gasPrice?: string | number;
    value?: string | number;
    data?: Buffer;
    nonce?: string | number;
}
export interface SignedTx {
    messageHash: string;
    v: string;
    r: string;
    s: string;
    rawTransaction: string;
    chainId?: any;
    gasPrice?: any;
    nonce?: number;
}
export declare function signTransaction(tx: SignTransactionRequest, privateKey: Buffer, eth: Eth): Promise<SignedTx>;
export declare function recoverTransaction(rawTx: string): string;
export declare function sign(tx: SignTransactionRequest, privateKey: Buffer): SignedTx;
