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
const formatters_1 = require("../../formatters");
const subscriptions_1 = require("../../subscriptions");
function subscribeForNewHeads(provider) {
    return new subscriptions_1.Subscription('eth', 'newHeads', [], provider, (result, sub) => {
        const output = formatters_1.fromRawBlockHeaderResponse(result);
        sub.emit('data', output, sub);
    });
}
exports.subscribeForNewHeads = subscribeForNewHeads;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWhlYWRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V0aC9zdWJzY3JpcHRpb25zL25ldy1oZWFkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLGlEQUFzRjtBQUV0Rix1REFBbUQ7QUFFbkQsU0FBZ0Isb0JBQW9CLENBQUMsUUFBMEI7SUFDN0QsT0FBTyxJQUFJLDRCQUFZLENBQXlCLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUMvRixNQUFNLE1BQU0sR0FBRyx1Q0FBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBTEQsb0RBS0MifQ==