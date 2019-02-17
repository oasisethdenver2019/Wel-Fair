'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// We use this for base 36 maths
const bn_js_1 = tslib_1.__importDefault(require("bn.js"));
const bytes_1 = require("./bytes");
const hash_1 = require("../eth-lib/hash");
const rlp_1 = require("./rlp");
const errors = tslib_1.__importStar(require("./errors"));
const address_1 = require("../address");
///////////////////////////////
// Shims for environments that are missing some required constants and functions
var MAX_SAFE_INTEGER = 0x1fffffffffffff;
function log10(x) {
    if (Math.log10) {
        return Math.log10(x);
    }
    return Math.log(x) / Math.LN10;
}
// See: https://en.wikipedia.org/wiki/International_Bank_Account_Number
// Create lookup table
var ibanLookup = {};
for (var i = 0; i < 10; i++) {
    ibanLookup[String(i)] = String(i);
}
for (var i = 0; i < 26; i++) {
    ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
}
// How many decimal digits can we process? (for 64-bit float, this is 15)
var safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
function ibanChecksum(address) {
    address = address.toUpperCase();
    address = address.substring(4) + address.substring(0, 2) + '00';
    var expanded = '';
    address.split('').forEach(function (c) {
        expanded += ibanLookup[c];
    });
    // Javascript can handle integers safely up to 15 (decimal) digits
    while (expanded.length >= safeDigits) {
        var block = expanded.substring(0, safeDigits);
        expanded = (parseInt(block, 10) % 97) + expanded.substring(block.length);
    }
    var checksum = String(98 - (parseInt(expanded, 10) % 97));
    while (checksum.length < 2) {
        checksum = '0' + checksum;
    }
    return checksum;
}
function getAddress(address) {
    if (typeof address !== 'string') {
        errors.throwError('invalid address', errors.INVALID_ARGUMENT, { arg: 'address', value: address });
    }
    if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
        // Missing the 0x prefix
        if (address.substring(0, 2) !== '0x') {
            address = '0x' + address;
        }
        const result = address_1.Address.fromString(address);
        return result;
    }
    else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        // It is an ICAP address with a bad checksum
        if (address.substring(2, 4) !== ibanChecksum(address)) {
            errors.throwError('bad icap checksum', errors.INVALID_ARGUMENT, { arg: 'address', value: address });
        }
        let result = new bn_js_1.default(address.substring(4), 36).toString(16);
        while (result.length < 40) {
            result = '0' + result;
        }
        return address_1.Address.fromString(result);
    }
    else {
        return errors.throwError('invalid address', errors.INVALID_ARGUMENT, { arg: 'address', value: address });
    }
}
exports.getAddress = getAddress;
function getIcapAddress(address) {
    var base36 = new bn_js_1.default(address_1.Address.fromString(address).toBuffer()).toString(36).toUpperCase();
    while (base36.length < 30) {
        base36 = '0' + base36;
    }
    return 'XE' + ibanChecksum('XE00' + base36) + base36;
}
exports.getIcapAddress = getIcapAddress;
// http://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed
function getContractAddress(transaction) {
    if (!transaction.from) {
        throw new Error('missing from address');
    }
    var nonce = transaction.nonce;
    return getAddress('0x' + hash_1.keccak256(rlp_1.encode([getAddress(transaction.from), bytes_1.stripZeros(bytes_1.hexlify(nonce))])).substring(26));
}
exports.getContractAddress = getContractAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldGhlcnMvYWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7OztBQUViLGdDQUFnQztBQUNoQywwREFBdUI7QUFFdkIsbUNBQXdEO0FBRXhELDBDQUE0QztBQUM1QywrQkFBK0I7QUFFL0IseURBQW1DO0FBTW5DLHdDQUFxQztBQUVyQywrQkFBK0I7QUFFL0IsZ0ZBQWdGO0FBQ2hGLElBQUksZ0JBQWdCLEdBQVcsZ0JBQWdCLENBQUM7QUFFaEQsU0FBUyxLQUFLLENBQUMsQ0FBUztJQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEI7SUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNqQyxDQUFDO0FBRUQsdUVBQXVFO0FBRXZFLHNCQUFzQjtBQUN0QixJQUFJLFVBQVUsR0FBb0MsRUFBRSxDQUFDO0FBQ3JELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDM0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuQztBQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDM0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUMxRDtBQUVELHlFQUF5RTtBQUN6RSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFD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