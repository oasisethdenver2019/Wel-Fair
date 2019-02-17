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
const events_1 = require("events");
const util_1 = require("util");
class Subscription extends events_1.EventEmitter {
    constructor(type, subscription, params, provider, callback, subscribeImmediately = true) {
        super();
        this.type = type;
        this.subscription = subscription;
        this.params = params;
        this.provider = provider;
        this.callback = callback;
        if (subscribeImmediately) {
            this.subscribe();
        }
    }
    async subscribe() {
        if (this.id) {
            this.unsubscribe();
        }
        try {
            this.listener = params => this.notificationHandler(params);
            this.provider.on('notification', this.listener);
            this.id = await this.provider.send(`${this.type}_subscribe`, [this.subscription, ...this.params]);
            if (!this.id) {
                throw new Error(`Failed to subscribe to ${this.subscription}.`);
            }
        }
        catch (err) {
            this.emit('error', err, this);
        }
        return this;
    }
    notificationHandler(params) {
        const { subscription, result } = params;
        if (subscription !== this.id) {
            return;
        }
        if (result instanceof Error) {
            this.unsubscribe();
            this.emit('error', result, this);
            return;
        }
        const resultArr = util_1.isArray(result) ? result : [result];
        resultArr.forEach(resultItem => {
            this.callback(resultItem, this);
        });
    }
    unsubscribe() {
        if (this.listener) {
            this.provider.removeListener('notification', this.listener);
        }
        if (this.id) {
            this.provider.send(`${this.type}_unsubscribe`, [this.id]);
        }
        this.id = undefined;
        this.listener = undefined;
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N1YnNjcmlwdGlvbnMvc3Vic2NyaXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBRUYsbUNBQXNDO0FBQ3RDLCtCQUErQjtBQVEvQixNQUFhLFlBQStDLFNBQVEscUJBQVk7SUFJOUUsWUFDVyxJQUFtQixFQUNuQixZQUFvQixFQUNwQixNQUFhLEVBQ2QsUUFBMEIsRUFDMUIsUUFBMkUsRUFDbkYsdUJBQWdDLElBQUk7UUFFcEMsS0FBSyxFQUFFLENBQUM7UUFQQyxTQUFJLEdBQUosSUFBSSxDQUFlO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQU87UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUFtRTtRQUtuRixJQUFJLG9CQUFvQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsU0FBUztRQUNwQixJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7UUFFRCxJQUFJO1lBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhELElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUVsRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDWixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQzthQUNqRTtTQUNGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxNQUEwQjtRQUNwRCxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUV4QyxJQUFJLFlBQVksS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUVELElBQUksTUFBTSxZQUFZLEtBQUssRUFBRTtZQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pDLE9BQU87U0FDUjtRQUVELE1BQU0sU0FBUyxHQUFHLGNBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3RDtRQUNELElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUF0RUQsb0NBc0VDIn0=