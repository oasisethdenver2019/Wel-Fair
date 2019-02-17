/// <reference types="node" />
import { Address } from '../address';
export interface EstimateRequest {
    from?: Address;
    to?: Address;
    gas?: string | number;
    gasPrice?: string | number;
    value?: string | number;
    data?: Buffer;
}
export interface RawEstimateRequest {
    from?: string;
    to?: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
}
export declare function toRawEstimateRequest(tx: EstimateRequest): RawEstimateRequest;
export declare function fromRawEstimateRequest(tx: RawEstimateRequest): EstimateRequest;
