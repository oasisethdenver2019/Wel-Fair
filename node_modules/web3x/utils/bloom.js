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
const address_1 = require("../address");
const sha3_1 = require("./sha3");
const topic_1 = require("./topic");
/**
 * Ethereum bloom filter support.
 *
 * TODO UNDOCUMENTED
 *
 * @module bloom
 * @class [bloom] bloom
 */
function codePointToInt(codePoint) {
    if (codePoint >= 48 && codePoint <= 57) {
        /*['0'..'9'] -> [0..9]*/
        return codePoint - 48;
    }
    if (codePoint >= 65 && codePoint <= 70) {
        /*['A'..'F'] -> [10..15]*/
        return codePoint - 55;
    }
    if (codePoint >= 97 && codePoint <= 102) {
        /*['a'..'f'] -> [10..15]*/
        return codePoint - 87;
    }
    throw new Error('invalid bloom');
}
function testBytes(bloom, bytes) {
    const hash = sha3_1.sha3(bytes).replace('0x', '');
    for (let i = 0; i < 12; i += 4) {
        // calculate bit position in bloom filter that must be active
        const bitpos = ((parseInt(hash.substr(i, 2), 16) << 8) + parseInt(hash.substr(i + 2, 2), 16)) & 2047;
        // test if bitpos in bloom is active
        const code = codePointToInt(bloom.charCodeAt(bloom.length - 1 - Math.floor(bitpos / 4)));
        const offset = 1 << bitpos % 4;
        if ((code & offset) !== offset) {
            return false;
        }
    }
    return true;
}
/**
 * Returns true if address is part of the given bloom.
 * note: false positives are possible.
 *
 * @method testAddress
 * @param {String} hex encoded bloom
 * @param {String} address in hex notation
 * @returns {Boolean} topic is (probably) part of the block
 */
exports.testAddress = (bloom, address) => {
    if (!exports.isBloom(bloom)) {
        throw new Error('Invalid bloom given');
    }
    if (!address_1.Address.isAddress(address)) {
        throw new Error('Invalid address given: "' + address + '"');
    }
    return testBytes(bloom, address);
};
/**
 * Returns true if the topic is part of the given bloom.
 * note: false positives are possible.
 *
 * @method hasTopic
 * @param {String} hex encoded bloom
 * @param {String} address in hex notation
 * @returns {Boolean} topic is (probably) part of the block
 */
exports.testTopic = (bloom, topic) => {
    if (!exports.isBloom(bloom)) {
        throw new Error('invalid bloom');
    }
    if (!topic_1.isTopic(topic)) {
        throw new Error('invalid topic');
    }
    return testBytes(bloom, topic);
};
/**
 * Returns true if given string is a valid Ethereum block header bloom.
 *
 * TODO UNDOCUMENTED
 *
 * @method isBloom
 * @param {String} hex encoded bloom filter
 * @return {Boolean}
 */
exports.isBloom = (bloom) => {
    if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
        return false;
    }
    else if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
        return true;
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvYmxvb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUFFRix3Q0FBcUM7QUFDckMsaUNBQThCO0FBQzlCLG1DQUFrQztBQUVsQzs7Ozs7OztHQU9HO0FBRUgsU0FBUyxjQUFjLENBQUMsU0FBUztJQUMvQixJQUFJLFNBQVMsSUFBSSxFQUFFLElBQUksU0FBUyxJQUFJLEVBQUUsRUFBRTtRQUN0Qyx3QkFBd0I7UUFDeEIsT0FBTyxTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ3ZCO0lBRUQsSUFBSSxTQUFTLElBQUksRUFBRSxJQUFJLFNBQVMsSUFBSSxFQUFFLEVBQUU7UUFDdEMsMEJBQTBCO1FBQzFCLE9BQU8sU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUN2QjtJQUVELElBQUksU0FBUyxJQUFJLEVBQUUsSUFBSSxTQUFTLElBQUksR0FBRyxFQUFFO1FBQ3ZDLDBCQUEwQjtRQUMxQixPQUFPLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDdkI7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBYTtJQUNyQyxNQUFNLElBQUksR0FBRyxXQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDOUIsNkRBQTZEO1FBQzdELE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVyRyxvQ0FBb0M7UUFDcEMsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVEOzs7Ozs7OztHQVFHO0FBQ1EsUUFBQSxXQUFXLEdBQUcsQ0FBQyxLQUFhLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDMUQsSUFBSSxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7S0FDeEM7SUFDRCxJQUFJLENBQUMsaUJBQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDN0Q7SUFFRCxPQUFPLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDO0FBRUY7Ozs7Ozs7O0dBUUc7QUFDUSxRQUFBLFNBQVMsR0FBRyxDQUFDLEtBQWEsRUFBRSxLQUFhLEVBQUUsRUFBRTtJQUN0RCxJQUFJLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDbEM7SUFDRCxJQUFJLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDbEM7SUFFRCxPQUFPLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBRUY7Ozs7Ozs7O0dBUUc7QUFDUSxRQUFBLE9BQU8sR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO0lBQ3JDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDeEMsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuRixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUMifQ==