/// <reference types="node" />
import { Address } from '../address';
export interface Signature {
    message: string;
    messageHash: string;
    r: string;
    s: string;
    v: string;
    signature: string;
}
export declare function sign(data: string, privateKey: Buffer): Signature;
export declare function recoverFromSignature(signature: Signature): Address;
export declare function recoverFromVRS(message: string, v: string, r: string, s: string, prefixed?: boolean): Address;
export declare function recoverFromSigString(message: string, signature: string, preFixed?: boolean): Address;
export declare function recover(signature: Signature): Address;
export declare function recover(message: string, v: string, r: string, s: string, prefixed?: boolean): Address;
export declare function recover(message: string, signature: string, preFixed?: boolean): Address;
