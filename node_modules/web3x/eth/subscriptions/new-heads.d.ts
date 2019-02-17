import { RawBlockHeaderResponse } from '../../formatters';
import { EthereumProvider } from '../../providers';
import { Subscription } from '../../subscriptions';
export declare function subscribeForNewHeads(provider: EthereumProvider): Subscription<RawBlockHeaderResponse>;
