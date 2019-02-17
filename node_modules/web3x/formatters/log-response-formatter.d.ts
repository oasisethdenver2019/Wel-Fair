import { Address } from '../address';
import { Data, TransactionHash } from '../types';
export interface RawLogResponse {
    id?: string;
    removed?: boolean;
    logIndex: string | null;
    blockNumber: string | null;
    blockHash: string | null;
    transactionHash: string | null;
    transactionIndex: string | null;
    address: string;
    data: string;
    topics: string[];
}
export interface LogResponse {
    id: string | null;
    removed?: boolean;
    logIndex: number | null;
    blockNumber: number | null;
    blockHash: string | null;
    transactionHash: TransactionHash | null;
    transactionIndex: number | null;
    address: Address;
    data: Data;
    topics: string[];
}
export declare function fromRawLogResponse(log: RawLogResponse): LogResponse;
export declare function toRawLogResponse(log: LogResponse): RawLogResponse;
