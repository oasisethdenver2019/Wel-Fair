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
const hash_1 = tslib_1.__importDefault(require("../eth-lib/hash"));
/**
 * Hashes values to a sha3 hash using keccak 256
 *
 * To hash a HEX string the hex must have 0x in front.
 *
 * @method sha3
 * @return {String} the sha3 string
 */
function sha3(value) {
    return hash_1.default.keccak256(value);
}
exports.sha3 = sha3;
function sha3Buffer(value) {
    return Buffer.from(hash_1.default.keccak256(value).slice(2), 'hex');
}
exports.sha3Buffer = sha3Buffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zaGEzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7OztBQUVGLG1FQUFtQztBQUVuQzs7Ozs7OztHQU9HO0FBRUgsU0FBZ0IsSUFBSSxDQUFDLEtBQXNCO0lBQ3pDLE9BQU8sY0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRkQsb0JBRUM7QUFFRCxTQUFnQixVQUFVLENBQUMsS0FBc0I7SUFDL0MsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFGRCxnQ0FFQyJ9