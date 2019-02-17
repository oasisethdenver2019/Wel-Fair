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
const idna_uts46_hx_1 = tslib_1.__importDefault(require("idna-uts46-hx"));
const utils_1 = require("../../utils");
function namehash(inputName) {
    // Reject empty names:
    let node = '';
    for (let i = 0; i < 32; i++) {
        node += '00';
    }
    const name = normalize(inputName);
    if (name) {
        const labels = name.split('.');
        for (let i = labels.length - 1; i >= 0; i--) {
            const labelSha = utils_1.sha3(labels[i]).slice(2);
            node = utils_1.sha3(new Buffer(node + labelSha, 'hex')).slice(2);
        }
    }
    return '0x' + node;
}
exports.namehash = namehash;
function normalize(name) {
    return name ? idna_uts46_hx_1.default.toAscii(name, { useStd3ASCII: true, transitional: false }) : name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZWhhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZW5zL3JlZ2lzdHJ5L25hbWVoYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7OztBQUVGLDBFQUFrQztBQUNsQyx1Q0FBbUM7QUFFbkMsU0FBZ0IsUUFBUSxDQUFDLFNBQVM7SUFDaEMsc0JBQXNCO0lBQ3RCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDM0IsSUFBSSxJQUFJLElBQUksQ0FBQztLQUNkO0lBRUQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWxDLElBQUksSUFBSSxFQUFFO1FBQ1IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQixLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsTUFBTSxRQUFRLEdBQUcsWUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLEdBQUcsWUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7S0FDRjtJQUVELE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNyQixDQUFDO0FBbkJELDRCQW1CQztBQUVELFNBQVMsU0FBUyxDQUFDLElBQUk7SUFDckIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLHVCQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUN4RixDQUFDIn0=