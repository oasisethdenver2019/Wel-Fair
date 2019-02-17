import { hexToNumber } from '../utils';
export declare class NetRequestPayloads {
    getId(): {
        method: string;
        format: typeof hexToNumber;
    };
    isListening(): {
        method: string;
        format: (result: any) => any;
    };
    getPeerCount(): {
        method: string;
        format: typeof hexToNumber;
    };
}
