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
const utf8_1 = tslib_1.__importDefault(require("utf8"));
const hex_1 = require("./hex");
/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @method utf8ToHex
 * @param {String} str
 * @returns {String} hex representation of input string
 */
exports.utf8ToHex = (str) => {
    str = utf8_1.default.encode(str);
    let hex = '';
    // remove \u0000 padding from either side
    str = str.replace(/^(?:\u0000)*/, '');
    str = str
        .split('')
        .reverse()
        .join('');
    str = str.replace(/^(?:\u0000)*/, '');
    str = str
        .split('')
        .reverse()
        .join('');
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        // if (code !== 0) {
        const n = code.toString(16);
        hex += n.length < 2 ? '0' + n : n;
        // }
    }
    return '0x' + hex;
};
/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method hexToUtf8
 * @param {String} hex
 * @returns {String} ascii string representation of hex value
 */
exports.hexToUtf8 = (hex) => {
    if (!hex_1.isHexStrict(hex)) {
        throw new Error('The parameter "' + hex + '" must be a valid HEX string.');
    }
    let str = '';
    let code = 0;
    hex = hex.replace(/^0x/i, '');
    // remove 00 padding from either side
    hex = hex.replace(/^(?:00)*/, '');
    hex = hex
        .split('')
        .reverse()
        .join('');
    hex = hex.replace(/^(?:00)*/, '');
    hex = hex
        .split('')
        .reverse()
        .join('');
    const l = hex.length;
    for (let i = 0; i < l; i += 2) {
        code = parseInt(hex.substr(i, 2), 16);
        // if (code !== 0) {
        str += String.fromCharCode(code);
        // }
    }
    return utf8_1.default.decode(str);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4LXV0ZjguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaGV4LXV0ZjgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7O0FBRUYsd0RBQXdCO0FBQ3hCLCtCQUFvQztBQUVwQzs7Ozs7O0dBTUc7QUFDUSxRQUFBLFNBQVMsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO0lBQ3JDLEdBQUcsR0FBRyxjQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUViLHlDQUF5QztJQUN6QyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEMsR0FBRyxHQUFHLEdBQUc7U0FDTixLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ1QsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1osR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLEdBQUcsR0FBRyxHQUFHO1NBQ04sS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNULE9BQU8sRUFBRTtTQUNULElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0Isb0JBQW9CO1FBQ3BCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSTtLQUNMO0lBRUQsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUNRLFFBQUEsU0FBUyxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUU7SUFDckMsSUFBSSxDQUFDLGlCQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLEdBQUcsK0JBQStCLENBQUMsQ0FBQztLQUM1RTtJQUVELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNiLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUU5QixxQ0FBcUM7SUFDckMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLEdBQUcsR0FBRyxHQUFHO1NBQ04sS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNULE9BQU8sRUFBRTtTQUNULElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsQyxHQUFHLEdBQUcsR0FBRztTQUNOLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDVCxPQUFPLEVBQUU7U0FDVCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFWixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBRXJCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM3QixJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLG9CQUFvQjtRQUNwQixHQUFHLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJO0tBQ0w7SUFFRCxPQUFPLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDIn0=