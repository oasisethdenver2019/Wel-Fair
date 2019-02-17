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
const util_1 = require("util");
const address_1 = require("../address");
const bn_1 = require("./bn");
const hex_1 = require("./hex");
const hex_utf8_1 = require("./hex-utf8");
const padding_1 = require("./padding");
const sha3_1 = require("./sha3");
const elementaryName = name => {
    /*jshint maxcomplexity:false */
    if (name.startsWith('int[')) {
        return 'int256' + name.slice(3);
    }
    else if (name === 'int') {
        return 'int256';
    }
    else if (name.startsWith('uint[')) {
        return 'uint256' + name.slice(4);
    }
    else if (name === 'uint') {
        return 'uint256';
    }
    else if (name.startsWith('fixed[')) {
        return 'fixed128x128' + name.slice(5);
    }
    else if (name === 'fixed') {
        return 'fixed128x128';
    }
    else if (name.startsWith('ufixed[')) {
        return 'ufixed128x128' + name.slice(6);
    }
    else if (name === 'ufixed') {
        return 'ufixed128x128';
    }
    return name;
};
// Parse N from type<N>
const parseTypeN = type => {
    const typesize = /^\D+(\d+).*$/.exec(type);
    return typesize ? parseInt(typesize[1], 10) : null;
};
// Parse N from type[<N>]
const parseTypeNArray = type => {
    const arraySize = /^\D+\d*\[(\d+)\]$/.exec(type);
    return arraySize ? parseInt(arraySize[1], 10) : null;
};
const parseNumber = arg => {
    const type = typeof arg;
    if (type === 'string') {
        if (hex_1.isHexStrict(arg)) {
            return new bn_js_1.default(arg.replace(/0x/i, ''), 16);
        }
        else {
            return new bn_js_1.default(arg, 10);
        }
    }
    else if (type === 'number') {
        return new bn_js_1.default(arg);
    }
    else if (bn_1.isBN(arg)) {
        return arg;
    }
    else {
        throw new Error(arg + ' is not a number');
    }
};
const solidityPack = (type, value, arraySize) => {
    /*jshint maxcomplexity:false */
    let size;
    let num;
    type = elementaryName(type);
    if (type === 'bytes') {
        if (value.replace(/^0x/i, '').length % 2 !== 0) {
            throw new Error('Invalid bytes characters ' + value.length);
        }
        return value;
    }
    else if (type === 'string') {
        return hex_utf8_1.utf8ToHex(value);
    }
    else if (type === 'bool') {
        return value ? '01' : '00';
    }
    else if (type.startsWith('address')) {
        if (arraySize) {
            size = 64;
        }
        else {
            size = 40;
        }
        if (!address_1.Address.isAddress(value)) {
            throw new Error(value + ' is not a valid address, or the checksum is invalid.');
        }
        return padding_1.leftPad(value.toLowerCase(), size);
    }
    size = parseTypeN(type);
    if (type.startsWith('bytes')) {
        if (!size) {
            throw new Error('bytes[] not yet supported in solidity');
        }
        // must be 32 byte slices when in an array
        if (arraySize) {
            size = 32;
        }
        if (size < 1 || size > 32 || size < value.replace(/^0x/i, '').length / 2) {
            throw new Error('Invalid bytes' + size + ' for ' + value);
        }
        return padding_1.rightPad(value, size * 2);
    }
    else if (type.startsWith('uint')) {
        if (size % 8 || size < 8 || size > 256) {
            throw new Error('Invalid uint' + size + ' size');
        }
        num = parseNumber(value);
        if (num.bitLength() > size) {
            throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
        }
        if (num.lt(new bn_js_1.default(0))) {
            throw new Error('Supplied uint ' + num.toString() + ' is negative');
        }
        return size ? padding_1.leftPad(num.toString('hex'), (size / 8) * 2) : num;
    }
    else if (type.startsWith('int')) {
        if (size % 8 || size < 8 || size > 256) {
            throw new Error('Invalid int' + size + ' size');
        }
        num = parseNumber(value);
        if (num.bitLength() > size) {
            throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
        }
        if (num.lt(new bn_js_1.default(0))) {
            return num.toTwos(size).toString('hex');
        }
        else {
            return size ? padding_1.leftPad(num.toString('hex'), (size / 8) * 2) : num;
        }
    }
    else {
        // FIXME: support all other types
        throw new Error('Unsupported or invalid type: ' + type);
    }
};
const processSoliditySha3Args = arg => {
    /*jshint maxcomplexity:false */
    if (util_1.isArray(arg)) {
        throw new Error('Autodetection of array types is not supported.');
    }
    let type;
    let value = '';
    let hexArg;
    let arraySize;
    // if type is given
    if (util_1.isObject(arg) &&
        (arg.hasOwnProperty('v') || arg.hasOwnProperty('t') || arg.hasOwnProperty('value') || arg.hasOwnProperty('type'))) {
        type = arg.hasOwnProperty('t') ? arg.t : arg.type;
        value = arg.hasOwnProperty('v') ? arg.v : arg.value;
        // otherwise try to guess the type
    }
    else {
        type = hex_1.toHex(arg, true);
        value = hex_1.toHex(arg);
        if (!type.startsWith('int') && !type.startsWith('uint')) {
            type = 'bytes';
        }
    }
    if ((type.startsWith('int') || type.startsWith('uint')) && typeof value === 'string' && !/^(-)?0x/i.test(value)) {
        value = new bn_js_1.default(value);
    }
    // get the array size
    if (util_1.isArray(value)) {
        arraySize = parseTypeNArray(type);
        if (arraySize && value.length !== arraySize) {
            throw new Error(type + ' is not matching the given array ' + JSON.stringify(value));
        }
        else {
            arraySize = value.length;
        }
    }
    if (util_1.isArray(value)) {
        hexArg = value.map(val => {
            return solidityPack(type, val, arraySize)
                .toString('hex')
                .replace('0x', '');
        });
        return hexArg.join('');
    }
    else {
        hexArg = solidityPack(type, value, arraySize);
        return hexArg.toString('hex').replace('0x', '');
    }
};
/**
 * Hashes solidity values to a sha3 hash using keccak 256
 *
 * @method soliditySha3
 * @return {Object} the sha3
 */
exports.soliditySha3 = (...args) => {
    /*jshint maxcomplexity:false */
    const hexArgs = args.map(processSoliditySha3Args);
    // console.log(args, hexArgs);
    // console.log('0x'+ hexArgs.join(''));
    return sha3_1.sha3('0x' + hexArgs.join(''));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29saWRpdHktc2hhMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zb2xpZGl0eS1zaGEzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7OztBQUVGLDBEQUF1QjtBQUN2QiwrQkFBeUM7QUFDekMsd0NBQXFDO0FBQ3JDLDZCQUE0QjtBQUM1QiwrQkFBMkM7QUFDM0MseUNBQXVDO0FBQ3ZDLHVDQUE4QztBQUM5QyxpQ0FBOEI7QUFFOUIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEVBQUU7SUFDNUIsK0JBQStCO0lBRS9CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUMzQixPQUFPLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pDO1NBQU0sSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ3pCLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ25DLE9BQU8sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEM7U0FBTSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDMUIsT0FBTyxTQUFTLENBQUM7S0FDbEI7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDcEMsT0FBTyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN2QztTQUFNLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUMzQixPQUFPLGNBQWMsQ0FBQztLQUN2QjtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNyQyxPQUFPLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLE9BQU8sZUFBZSxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFFRix1QkFBdUI7QUFDdkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUU7SUFDeEIsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3JELENBQUMsQ0FBQztBQUVGLHlCQUF5QjtBQUN6QixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsRUFBRTtJQUM3QixNQUFNLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUN2RCxDQUFDLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsRUFBRTtJQUN4QixNQUFNLElBQUksR0FBRyxPQUFPLEdBQUcsQ0FBQztJQUN4QixJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDckIsSUFBSSxpQkFBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxlQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLE9BQU8sSUFBSSxlQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7U0FBTSxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsT0FBTyxJQUFJLGVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjtTQUFNLElBQUksU0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3BCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7U0FBTTtRQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxHQUFHLGtCQUFrQixDQUFDLENBQUM7S0FDM0M7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUU7SUFDOUMsK0JBQStCO0lBRS9CLElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxHQUFHLENBQUM7SUFDUixJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVCLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUNwQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdEO1FBRUQsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixPQUFPLG9CQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDekI7U0FBTSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDMUIsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQzVCO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3JDLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNYO2FBQU07WUFDTCxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFJLENBQUMsaUJBQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsc0RBQXNELENBQUMsQ0FBQztTQUNqRjtRQUVELE9BQU8saUJBQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDM0M7SUFFRCxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXhCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM1QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsMENBQTBDO1FBQzFDLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNYO1FBRUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQztTQUMzRDtRQUVELE9BQU8sa0JBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsR0FBRyxJQUFJLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ3BGO1FBRUQsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksZUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7U0FDckU7UUFFRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FDbEU7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDakMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRTtZQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFFRCxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixHQUFHLElBQUksR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDbkY7UUFFRCxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxlQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDbEU7S0FDRjtTQUFNO1FBQ0wsaUNBQWlDO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDekQ7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQyxFQUFFO0lBQ3BDLCtCQUErQjtJQUUvQixJQUFJLGNBQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7S0FDbkU7SUFFRCxJQUFJLElBQUksQ0FBQztJQUNULElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQztJQUNwQixJQUFJLE1BQU0sQ0FBQztJQUNYLElBQUksU0FBUyxDQUFDO0lBRWQsbUJBQW1CO0lBQ25CLElBQ0UsZUFBUSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUNqSDtRQUNBLElBQUksR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ2xELEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBRXBELGtDQUFrQztLQUNuQztTQUFNO1FBQ0wsSUFBSSxHQUFHLFdBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEIsS0FBSyxHQUFHLFdBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkQsSUFBSSxHQUFHLE9BQU8sQ0FBQztTQUNoQjtLQUNGO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0csS0FBSyxHQUFHLElBQUksZUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQscUJBQXFCO0lBQ3JCLElBQUksY0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xCLFNBQVMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsbUNBQW1DLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JGO2FBQU07WUFDTCxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUMxQjtLQUNGO0lBRUQsSUFBSSxjQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbEIsTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsT0FBTyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUM7aUJBQ3RDLFFBQVEsQ0FBQyxLQUFLLENBQUM7aUJBQ2YsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ2pEO0FBQ0gsQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDUSxRQUFBLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUU7SUFDM0MsK0JBQStCO0lBRS9CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUVsRCw4QkFBOEI7SUFDOUIsdUNBQXVDO0lBRXZDLE9BQU8sV0FBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDIn0=