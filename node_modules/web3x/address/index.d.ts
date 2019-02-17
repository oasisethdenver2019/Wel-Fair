/// <reference types="node" />
export declare class Address {
    private buffer;
    static ZERO: Address;
    constructor(buffer: Buffer);
    static fromString(address: string): Address;
    static isAddress(address: string): boolean;
    static checkAddressChecksum(address: string): boolean;
    static toChecksumAddress(address: string): string;
    equals(rhs: Address): boolean;
    toJSON(): string;
    toString(): string;
    toBuffer(): Buffer;
    toBuffer32(): Buffer;
}
