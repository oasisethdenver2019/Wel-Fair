import { Eth } from '..';
import { LogRequest, LogResponse, RawLogResponse } from '../../formatters';
import { Subscription } from '../../subscriptions';
export declare function subscribeForLogs(eth: Eth, logRequest?: LogRequest): Subscription<LogResponse, RawLogResponse>;
