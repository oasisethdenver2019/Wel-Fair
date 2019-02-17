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
const utils_1 = require("../utils");
const identity = result => result;
class NetRequestPayloads {
    getId() {
        return {
            method: 'net_version',
            format: utils_1.hexToNumber,
        };
    }
    isListening() {
        return {
            method: 'net_listening',
            format: identity,
        };
    }
    getPeerCount() {
        return {
            method: 'net_peerCount',
            format: utils_1.hexToNumber,
        };
    }
}
exports.NetRequestPayloads = NetRequestPayloads;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LXJlcXVlc3QtcGF5bG9hZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbmV0L25ldC1yZXF1ZXN0LXBheWxvYWRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBRUYsb0NBQXVDO0FBRXZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO0FBRWxDLE1BQWEsa0JBQWtCO0lBQ3RCLEtBQUs7UUFDVixPQUFPO1lBQ0wsTUFBTSxFQUFFLGFBQWE7WUFDckIsTUFBTSxFQUFFLG1CQUFXO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPO1lBQ0wsTUFBTSxFQUFFLGVBQWU7WUFDdkIsTUFBTSxFQUFFLFFBQVE7U0FDakIsQ0FBQztJQUNKLENBQUM7SUFFTSxZQUFZO1FBQ2pCLE9BQU87WUFDTCxNQUFNLEVBQUUsZUFBZTtZQUN2QixNQUFNLEVBQUUsbUJBQVc7U0FDcEIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXJCRCxnREFxQkMifQ==