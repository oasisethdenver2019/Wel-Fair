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
const utils_1 = require("../utils");
function outputSyncingFormatter(result) {
    if (util_1.isBoolean(result)) {
        return result;
    }
    result.startingBlock = utils_1.hexToNumber(result.startingBlock);
    result.currentBlock = utils_1.hexToNumber(result.currentBlock);
    result.highestBlock = utils_1.hexToNumber(result.highestBlock);
    if (result.knownStates) {
        result.knownStates = utils_1.hexToNumber(result.knownStates);
        result.pulledStates = utils_1.hexToNumber(result.pulledStates);
    }
    return result;
}
exports.outputSyncingFormatter = outputSyncingFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXN5bmNpbmctZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Zvcm1hdHRlcnMvb3V0cHV0LXN5bmNpbmctZm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBRUYsK0JBQWlDO0FBQ2pDLG9DQUF1QztBQVV2QyxTQUFnQixzQkFBc0IsQ0FBQyxNQUFNO0lBQzNDLElBQUksZ0JBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQixPQUFPLE1BQU0sQ0FBQztLQUNmO0lBQ0QsTUFBTSxDQUFDLGFBQWEsR0FBRyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsWUFBWSxHQUFHLG1CQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxZQUFZLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkQsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxXQUFXLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLFlBQVksR0FBRyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4RDtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFiRCx3REFhQyJ9