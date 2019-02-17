import { EventLog, LogResponse } from '../../formatters';
import { ContractEntryDefinition } from './contract-abi-definition';
import { ContractEntry } from './contract-entry';
export declare class ContractEventEntry extends ContractEntry {
    readonly signature: string;
    constructor(entry: ContractEntryDefinition);
    getEventTopics(filter?: object): (string | string[] | null)[];
    decodeEvent(log: LogResponse): EventLog<any>;
}
