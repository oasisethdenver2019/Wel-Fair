/// <reference types="node" />
import { Address } from '../address';
import { Eth } from '../eth';
import { SendTx } from '../eth/send-tx';
import { KeyStore } from '../utils';
export interface AccountTx {
    nonce?: string | number;
    chainId?: string | number;
    to?: Address;
    data?: Buffer;
    value?: string | number;
    gas?: string | number;
    gasPrice?: string | number;
}
export declare class Account {
    readonly address: Address;
    readonly privateKey: Buffer;
    readonly publicKey: Buffer;
    constructor(address: Address, privateKey: Buffer, publicKey: Buffer);
    static create(entropy?: Buffer): Account;
    static fromPrivate(privateKey: Buffer): Account;
    static createFromMnemonicAndPath(mnemonic: string, derivationPath: string): Account;
    static createFromSeedAndPath(seed: Buffer, derivationPath: string): Account;
    static fromKeystore(v3Keystore: KeyStore | string, password: string, nonStrict?: boolean): Promise<Account>;
    sendTransaction(tx: AccountTx, eth: Eth): SendTx;
    signTransaction(tx: AccountTx, eth: Eth): Promise<import("./sign-transaction").SignedTx>;
    sign(data: string): import("../utils").Signature;
    encrypt(password: string, options?: any): Promise<KeyStore>;
}
