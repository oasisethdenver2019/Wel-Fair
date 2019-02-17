/// <reference types="node" />
export declare const create: (entropy: Buffer) => {
    address: string;
    privateKey: Buffer;
    publicKey: Buffer;
};
export declare const toChecksum: (address: any) => string;
export declare const fromPrivate: (privateKey: Buffer) => {
    address: string;
    privateKey: Buffer;
    publicKey: Buffer;
};
export declare const encodeSignature: ([v, r, s]: [any, any, any]) => string;
export declare const decodeSignature: (hex: string) => string[];
export declare const makeSigner: (addToV: any) => (hash: any, privateKey: Buffer) => string;
export declare const sign: (hash: any, privateKey: Buffer) => string;
export declare const recover: (hash: any, signature: any) => string;
declare const _default: {
    create: (entropy: Buffer) => {
        address: string;
        privateKey: Buffer;
        publicKey: Buffer;
    };
    toChecksum: (address: any) => string;
    fromPrivate: (privateKey: Buffer) => {
        address: string;
        privateKey: Buffer;
        publicKey: Buffer;
    };
    sign: (hash: any, privateKey: Buffer) => string;
    makeSigner: (addToV: any) => (hash: any, privateKey: Buffer) => string;
    recover: (hash: any, signature: any) => string;
    encodeSignature: ([v, r, s]: [any, any, any]) => string;
    decodeSignature: (hex: string) => string[];
};
export default _default;
