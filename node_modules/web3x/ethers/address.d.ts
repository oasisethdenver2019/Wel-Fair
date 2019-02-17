import { BigNumber } from './bignumber';
import { Arrayish } from './bytes';
import { Address } from '../address';
export declare function getAddress(address: string): Address;
export declare function getIcapAddress(address: string): string;
export declare function getContractAddress(transaction: {
    from: string;
    nonce: Arrayish | BigNumber | number;
}): Address;
