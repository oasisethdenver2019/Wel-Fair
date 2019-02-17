import { EthereumProvider } from '../../providers';
import { Subscription } from '../../subscriptions';
export declare function subscribeForSyncing(provider: EthereumProvider): Subscription<object | boolean>;
