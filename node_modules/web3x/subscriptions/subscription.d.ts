/// <reference types="node" />
import { EventEmitter } from 'events';
import { EthereumProvider } from '../providers/ethereum-provider';
export declare class Subscription<Result = any, RawResult = Result> extends EventEmitter {
    readonly type: 'eth' | 'shh';
    readonly subscription: string;
    readonly params: any[];
    private provider;
    private callback;
    private id?;
    private listener?;
    constructor(type: 'eth' | 'shh', subscription: string, params: any[], provider: EthereumProvider, callback: (result: RawResult, sub: Subscription<Result, RawResult>) => void, subscribeImmediately?: boolean);
    subscribe(): Promise<this>;
    private notificationHandler;
    unsubscribe(): void;
}
