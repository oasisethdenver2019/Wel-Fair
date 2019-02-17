/// <reference types="node" />
import { LegacyProvider } from '../providers/legacy-provider';
export declare class Bzz {
    private provider;
    readonly pick?: any;
    constructor(provider: LegacyProvider);
    download(bzzHash: string, localPath?: string): void;
    upload(mixed: string | Buffer | number[] | object): void;
    isAvailable(swarmUrl: string): void;
}
