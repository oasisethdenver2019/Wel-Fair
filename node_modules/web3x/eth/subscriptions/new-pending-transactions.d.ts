import { TransactionResponse } from '../../formatters';
import { EthereumProvider } from '../../providers';
import { Subscription } from '../../subscriptions';
export declare function subscribeForNewPendingTransactions(provider: EthereumProvider): Subscription<TransactionResponse>;
