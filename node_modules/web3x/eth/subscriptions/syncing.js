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
const util_1 = require("util");
const formatters_1 = require("../../formatters");
const subscriptions_1 = require("../../subscriptions");
function subscribeForSyncing(provider) {
    return new subscriptions_1.Subscription('eth', 'newHeads', [], provider, (result, sub) => {
        const output = formatters_1.outputSyncingFormatter(result);
        sub.emit(util_1.isBoolean(output) ? 'changed' : 'data', output, sub);
    });
}
exports.subscribeForSyncing = subscribeForSyncing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ldGgvc3Vic2NyaXB0aW9ucy9zeW5jaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBRUYsK0JBQWlDO0FBQ2pDLGlEQUEwRDtBQUUxRCx1REFBbUQ7QUFFbkQsU0FBZ0IsbUJBQW1CLENBQUMsUUFBMEI7SUFDNUQsT0FBTyxJQUFJLDRCQUFZLENBQW1CLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN6RixNQUFNLE1BQU0sR0FBRyxtQ0FBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFMRCxrREFLQyJ9