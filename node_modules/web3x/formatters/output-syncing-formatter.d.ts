export interface Sync {
    startingBlock: number;
    currentBlock: number;
    highestBlock: number;
    knownStates: number;
    pulledStated: number;
}
export declare function outputSyncingFormatter(result: any): Sync | boolean;
