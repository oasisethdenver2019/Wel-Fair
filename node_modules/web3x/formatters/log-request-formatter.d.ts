import { Address } from '../address';
import { BlockType } from '../eth';
export interface LogRequest {
    filter?: {
        [k: string]: any;
    };
    toBlock?: BlockType;
    fromBlock?: BlockType;
    address?: Address | Address[];
    topics?: (string | string[] | null)[];
}
export interface RawLogRequest {
    toBlock?: string;
    fromBlock?: string;
    address?: string | string[];
    topics?: (string | string[])[];
}
export declare function toRawLogRequest(logRequest?: LogRequest): RawLogRequest;
export declare function fromRawLogRequest(rawLogRequest: RawLogRequest): LogRequest;
