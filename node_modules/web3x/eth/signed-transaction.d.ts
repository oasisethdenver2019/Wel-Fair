import { Address } from '../address';
export interface SignedTransaction {
    raw: string;
    tx: {
        nonce: string;
        gasPrice: string;
        gas: string;
        to: Address;
        value: string;
        input: string;
        v: string;
        r: string;
        s: string;
        hash: string;
    };
}
