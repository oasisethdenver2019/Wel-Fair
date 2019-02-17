/// <reference types="node" />
import { Address } from '../address';
interface ScryptKdfParams {
    dklen: number;
    n: number;
    p: number;
    r: number;
    salt: string;
}
interface PbKdf2Params {
    dklen: number;
    c: number;
    prf: string;
    salt: string;
}
export interface KeyStore {
    address?: string;
    crypto: {
        cipher: string;
        ciphertext: string;
        cipherparams: {
            iv: string;
        };
        kdf: string;
        kdfparams: ScryptKdfParams | PbKdf2Params;
        mac: string;
    };
    id: string;
    version: number;
}
export declare function decrypt(v3Keystore: KeyStore | string, password: string, nonStrict?: boolean): Promise<Buffer>;
export declare function encrypt(privateKey: Buffer, address: Address, password: string, options?: any): Promise<KeyStore>;
export {};
