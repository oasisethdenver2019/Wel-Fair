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
const subscriptions_1 = require("../../subscriptions");
function subscribeForNewPendingTransactions(provider) {
    return new subscriptions_1.Subscription('eth', 'newPendingTransactions', [], provider, (result, sub) => {
        sub.emit('data', result, sub);
    });
}
exports.subscribeForNewPendingTransactions = subscribeForNewPendingTransactions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LXBlbmRpbmctdHJhbnNhY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V0aC9zdWJzY3JpcHRpb25zL25ldy1wZW5kaW5nLXRyYW5zYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUlGLHVEQUFtRDtBQUVuRCxTQUFnQixrQ0FBa0MsQ0FBQyxRQUEwQjtJQUMzRSxPQUFPLElBQUksNEJBQVksQ0FBc0IsS0FBSyxFQUFFLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDMUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUpELGdGQUlDIn0=