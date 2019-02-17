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
const tslib_1 = require("tslib");
const randombytes_1 = tslib_1.__importDefault(require("randombytes"));
const util_1 = require("util");
const address_1 = require("../address");
const bn_1 = require("./bn");
const hex_number_1 = require("./hex-number");
const hex_utf8_1 = require("./hex-utf8");
/**
 * Check if string is HEX, requires a 0x in front
 */
function isHexStrict(hex) {
    return /^(-)?0x[0-9a-f]*$/i.test(hex);
}
exports.isHexStrict = isHexStrict;
/**
 * Check if string is HEX
 */
function isHex(hex) {
    return /^(-0x|0x)?[0-9a-f]*$/i.test(hex);
}
exports.isHex = isHex;
/**
 * Auto converts any given value into it's hex representation.
 */
function toHex(value, returnType) {
    /*jshint maxcomplexity: false */
    if (util_1.isString(value) && address_1.Address.isAddress(value)) {
        return returnType ? 'address' : '0x' + value.toLowerCase().replace(/^0x/i, '');
    }
    if (util_1.isBoolean(value)) {
        return returnType ? 'bool' : value ? '0x01' : '0x00';
    }
    if (util_1.isObject(value) && !bn_1.isBN(value)) {
        return returnType ? 'string' : hex_utf8_1.utf8ToHex(JSON.stringify(value));
    }
    // if its a negative number, pass it through numberToHex
    if (util_1.isString(value)) {
        if (value.indexOf('-0x') === 0 || value.indexOf('-0X') === 0) {
            return returnType ? 'int256' : hex_number_1.numberToHex(value);
        }
        else if (value.indexOf('0x') === 0 || value.indexOf('0X') === 0) {
            return returnType ? 'bytes' : value;
        }
        else if (!isFinite(+value)) {
            return returnType ? 'string' : hex_utf8_1.utf8ToHex(value);
        }
    }
    return returnType ? (value < 0 ? 'int256' : 'uint256') : hex_number_1.numberToHex(value);
}
exports.toHex = toHex;
function randomHex(size) {
    if (size > 65536) {
        throw new Error('Requested too many random bytes.');
    }
    return '0x' + randombytes_1.default(size).toString('hex');
}
exports.randomHex = randomHex;
function randomBuffer(size) {
    if (size > 65536) {
        throw new Error('Requested too many random bytes.');
    }
    return randombytes_1.default(size);
}
exports.randomBuffer = randomBuffer;
function trimHexLeadingZero(hex) {
    return hex.replace(/^0x0*/, '0x');
}
exports.trimHexLeadingZero = trimHexLeadingZero;
function makeHexEven(hex) {
    return hex.length % 2 === 1 ? hex.replace('0x', '0x0') : hex;
}
exports.makeHexEven = makeHexEven;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2hleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOzs7QUFHRixzRUFBc0M7QUFDdEMsK0JBQXFEO0FBQ3JELHdDQUFxQztBQUNyQyw2QkFBNEI7QUFDNUIsNkNBQTJDO0FBQzNDLHlDQUF1QztBQUV2Qzs7R0FFRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxHQUFXO0lBQ3JDLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFGRCxrQ0FFQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFDLEdBQVc7SUFDL0IsT0FBTyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUZELHNCQUVDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixLQUFLLENBQUMsS0FBOEMsRUFBRSxVQUFnQjtJQUNwRixnQ0FBZ0M7SUFFaEMsSUFBSSxlQUFRLENBQUMsS0FBSyxDQUFDLElBQUksaUJBQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0MsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFJLEtBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM1RjtJQUVELElBQUksZ0JBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNwQixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQ3REO0lBRUQsSUFBSSxlQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkMsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsb0JBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDakU7SUFFRCx3REFBd0Q7SUFDeEQsSUFBSSxlQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1RCxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx3QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25EO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqRSxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDckM7YUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsb0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqRDtLQUNGO0lBRUQsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQVcsQ0FBQyxLQUFlLENBQUMsQ0FBQztBQUN4RixDQUFDO0FBM0JELHNCQTJCQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxJQUFJO0lBQzVCLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRTtRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7S0FDckQ7SUFFRCxPQUFPLElBQUksR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBTkQsOEJBTUM7QUFFRCxTQUFnQixZQUFZLENBQUMsSUFBSTtJQUMvQixJQUFJLElBQUksR0FBRyxLQUFLLEVBQUU7UUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0tBQ3JEO0lBRUQsT0FBTyxxQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFORCxvQ0FNQztBQUVELFNBQWdCLGtCQUFrQixDQUFDLEdBQVc7SUFDNUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRkQsZ0RBRUM7QUFFRCxTQUFnQixXQUFXLENBQUMsR0FBVztJQUNyQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUMvRCxDQUFDO0FBRkQsa0NBRUMifQ==