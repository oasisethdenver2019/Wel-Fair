"use strict";
/*
  This file is part of web3x.

  web3x is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  web3x is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with web3x.  If not, see <http://www.gnu.org/licenses/>.
*/
Object.defineProperty(exports, "__esModule", { value: true });
class SentTransaction {
    constructor(eth, txHashPromise) {
        this.eth = eth;
        this.txHashPromise = txHashPromise;
        this.blocksSinceSent = 0;
    }
    async getTxHash() {
        return this.txHashPromise;
    }
    async getReceipt(numConfirmations = 1, confirmationCallback) {
        if (this.receipt) {
            return this.receipt;
        }
        return new Promise(async (resolve, reject) => {
            try {
                const txHash = await this.getTxHash();
                this.receipt = await this.eth.getTransactionReceipt(txHash);
                if (this.receipt) {
                    this.receipt = await this.handleReceipt(this.receipt);
                    if (numConfirmations === 1) {
                        if (confirmationCallback) {
                            confirmationCallback(1, this.receipt);
                        }
                        resolve(this.receipt);
                        return;
                    }
                }
                this.eth
                    .subscribe('newBlockHeaders')
                    .on('data', async (blockHeader, sub) => {
                    try {
                        this.blocksSinceSent++;
                        if (!this.receipt) {
                            this.receipt = await this.eth.getTransactionReceipt(txHash);
                            if (this.receipt) {
                                this.receipt = await this.handleReceipt(this.receipt);
                            }
                        }
                        if (!this.receipt) {
                            if (this.blocksSinceSent > 50) {
                                sub.unsubscribe();
                                reject(new Error('No receipt after 50 blocks.'));
                            }
                            return;
                        }
                        const confirmations = 1 + blockHeader.number - this.receipt.blockNumber;
                        if (confirmationCallback) {
                            confirmationCallback(confirmations, this.receipt);
                        }
                        if (confirmations >= numConfirmations) {
                            sub.unsubscribe();
                            resolve(this.receipt);
                        }
                    }
                    catch (err) {
                        sub.unsubscribe();
                        reject(err);
                    }
                })
                    .on('error', reject);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    async handleReceipt(receipt) {
        if (receipt.status === false) {
            throw new Error('Transaction has been reverted by the EVM.');
        }
        return receipt;
    }
}
exports.SentTransaction = SentTransaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC10eC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldGgvc2VuZC10eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQWNGLE1BQWEsZUFBZTtJQUkxQixZQUFzQixHQUFRLEVBQVksYUFBdUM7UUFBM0QsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFZLGtCQUFhLEdBQWIsYUFBYSxDQUEwQjtRQUZ6RSxvQkFBZSxHQUFHLENBQUMsQ0FBQztJQUV3RCxDQUFDO0lBRTlFLEtBQUssQ0FBQyxTQUFTO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FDckIsbUJBQTJCLENBQUMsRUFDNUIsb0JBQTBFO1FBRTFFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckI7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFxQixLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQy9ELElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUU1RCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUU7d0JBQzFCLElBQUksb0JBQW9CLEVBQUU7NEJBQ3hCLG9CQUFvQixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ3ZDO3dCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RCLE9BQU87cUJBQ1I7aUJBQ0Y7Z0JBRUQsSUFBSSxDQUFDLEdBQUc7cUJBQ0wsU0FBUyxDQUFDLGlCQUFpQixDQUFDO3FCQUM1QixFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFnQyxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUMxRCxJQUFJO3dCQUNGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzt3QkFFdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUM1RCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0NBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs2QkFDdkQ7eUJBQ0Y7d0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBQ2pCLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLEVBQUU7Z0NBQzdCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQ0FDbEIsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQzs2QkFDbEQ7NEJBQ0QsT0FBTzt5QkFDUjt3QkFFRCxNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQzt3QkFFekUsSUFBSSxvQkFBb0IsRUFBRTs0QkFDeEIsb0JBQW9CLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDbkQ7d0JBRUQsSUFBSSxhQUFhLElBQUksZ0JBQWdCLEVBQUU7NEJBQ3JDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDdkI7cUJBQ0Y7b0JBQUMsT0FBTyxHQUFHLEVBQUU7d0JBQ1osR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2I7Z0JBQ0gsQ0FBQyxDQUFDO3FCQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDeEI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBMkI7UUFDdkQsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtZQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFuRkQsMENBbUZDIn0=