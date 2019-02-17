/// <reference types="node" />
import { Account } from '../account';
import { Address } from '../address';
import { KeyStore } from '../utils/encryption';
export declare class Wallet {
    length: number;
    accounts: Account[];
    constructor(numberOfAccounts?: number);
    static fromMnemonic(mnemonic: string, numberOfAccounts: number): Wallet;
    static fromSeed(seed: Buffer, numberOfAccounts: number): Wallet;
    static fromKeystores(encryptedWallet: KeyStore[], password: string): Promise<Wallet>;
    static fromLocalStorage(password: string, keyName?: string): Promise<Wallet | undefined>;
    create(numberOfAccounts: number, entropy?: Buffer): Account[];
    get(addressOrIndex: string | number | Address): Account | undefined;
    indexOf(addressOrIndex: string | number | Address): number;
    add(accountOrKey: Buffer | Account): Account;
    remove(addressOrIndex: string | number | Address): boolean;
    clear(): void;
    encrypt(password: string, options?: any): Promise<KeyStore[]>;
    decrypt(encryptedWallet: KeyStore[], password: string): Promise<Account[]>;
    saveToLocalStorage(password: string, keyName?: string): Promise<boolean>;
    private findSafeIndex;
    currentIndexes(): number[];
    currentAddresses(): Address[];
}
