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
function inputBlockNumberFormatter(block) {
    if (block === undefined) {
        return;
    }
    else if (block === 'genesis' || block === 'earliest') {
        return '0x0';
    }
    else if (block === 'latest' || block === 'pending') {
        return block;
    }
    else if (util_1.isString(block) && utils_1.isHexStrict(block)) {
        return block.toLowerCase();
    }
    return utils_1.numberToHex(block);
}
exports.inputBlockNumberFormatter = inputBlockNumberFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtYmxvY2stbnVtYmVyLWZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXJzL2lucHV0LWJsb2NrLW51bWJlci1mb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUFFRiwrQkFBZ0M7QUFFaEMsb0NBQW9EO0FBRXBELFNBQWdCLHlCQUF5QixDQUFDLEtBQXdDO0lBQ2hGLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUN2QixPQUFPO0tBQ1I7U0FBTSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLFVBQVUsRUFBRTtRQUN0RCxPQUFPLEtBQUssQ0FBQztLQUNkO1NBQU0sSUFBSSxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDcEQsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNLElBQUksZUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLG1CQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEQsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDNUI7SUFDRCxPQUFPLG1CQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQVhELDhEQVdDIn0=