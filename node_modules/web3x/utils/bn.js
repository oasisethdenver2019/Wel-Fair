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
const bn_js_1 = tslib_1.__importDefault(require("bn.js"));
const number_to_bn_1 = require("./number-to-bn");
/**
 * Returns true if object is BN, otherwise false
 *
 * @method isBN
 * @param {Object} object
 * @return {Boolean}
 */
function isBN(object) {
    return object instanceof bn_js_1.default || (object && object.constructor && object.constructor.name === 'BN');
}
exports.isBN = isBN;
/**
 * Takes an input and transforms it into an BN
 *
 * @method toBN
 * @param {Number|String|BN} num, string, HEX string or BN
 * @return {BN} BN
 */
function toBN(num) {
    try {
        return number_to_bn_1.numberToBN(num);
    }
    catch (e) {
        throw new Error(e + ' Given value: "' + num + '"');
    }
}
exports.toBN = toBN;
/**
 * Takes and input transforms it into BN and if it is negative value, into two's complement
 *
 * @method toTwosComplement
 * @param {Number|String|BN} num
 * @return {String}
 */
function toTwosComplement(num) {
    return ('0x' +
        toBN(num)
            .toTwos(256)
            .toString(16, 64));
}
exports.toTwosComplement = toTwosComplement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvYm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7O0FBRUYsMERBQXVCO0FBQ3ZCLGlEQUE0QztBQUU1Qzs7Ozs7O0dBTUc7QUFDSCxTQUFnQixJQUFJLENBQUMsTUFBTTtJQUN6QixPQUFPLE1BQU0sWUFBWSxlQUFFLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztBQUNwRyxDQUFDO0FBRkQsb0JBRUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixJQUFJLENBQUMsR0FBeUI7SUFDNUMsSUFBSTtRQUNGLE9BQU8seUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4QjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsaUJBQWlCLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQ3BEO0FBQ0gsQ0FBQztBQU5ELG9CQU1DO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsR0FBeUI7SUFDeEQsT0FBTyxDQUNMLElBQUk7UUFDSixJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ3BCLENBQUM7QUFDSixDQUFDO0FBUEQsNENBT0MifQ==