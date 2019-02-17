/// <reference types="ws" />
import { ClientOptions } from 'isomorphic-ws';
import { LegacyProviderAdapter } from './legacy-provider-adapter';
interface WebsocketProviderOptions {
    timeout?: number;
    protocol?: string;
    clientOptions?: ClientOptions;
}
export declare class WebsocketProvider extends LegacyProviderAdapter {
    private legacyProvider;
    constructor(url: string, options?: WebsocketProviderOptions);
    disconnect(): void;
}
export {};
