/// <reference types="node" />
import { Address } from '../address';
export interface CallRequest {
    from?: Address;
    to: Address;
    gas?: string | number;
    gasPrice?: string | number;
    value?: string | number;
    data?: Buffer;
}
export interface RawCallRequest {
    from?: string;
    to: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
}
export declare function toRawCallRequest(tx: CallRequest): RawCallRequest;
export declare function fromRawCallRequest(tx: RawCallRequest): CallRequest;
