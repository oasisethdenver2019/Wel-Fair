'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
const constants_1 = require("./constants");
const errors = tslib_1.__importStar(require("./errors"));
const address_1 = require("./address");
const bignumber_1 = require("./bignumber");
const bytes_1 = require("./bytes");
const utf8_1 = require("./utf8");
const properties_1 = require("./properties");
const address_2 = require("../address");
const util_1 = require("util");
///////////////////////////////
const paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
const paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
const paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
exports.defaultCoerceFunc = function (type, value) {
    var match = type.match(paramTypeNumber);
    if (match && parseInt(match[2]) <= 48) {
        return value.toNumber();
    }
    return value;
};
///////////////////////////////////
// Parsing for Solidity Signatures
const regexParen = new RegExp('^([^)(]*)\\((.*)\\)([^)(]*)$');
const regexIdentifier = new RegExp('^[A-Za-z_][A-Za-z0-9_]*$');
function verifyType(type) {
    // These need to be transformed to their full description
    if (type.match(/^uint($|[^1-9])/)) {
        type = 'uint256' + type.substring(4);
    }
    else if (type.match(/^int($|[^1-9])/)) {
        type = 'int256' + type.substring(3);
    }
    return type;
}
function parseParam(param, allowIndexed) {
    function throwError(i) {
        throw new Error('unexpected character "' + param[i] + '" at position ' + i + ' in "' + param + '"');
    }
    var parent = { type: '', name: '', state: { allowType: true } };
    var node = parent;
    for (var i = 0; i < param.length; i++) {
        var c = param[i];
        switch (c) {
            case '(':
                if (!node.state.allowParams) {
                    throwError(i);
                }
                node.state.allowType = false;
                node.type = verifyType(node.type);
                node.components = [{ type: '', name: '', parent: node, state: { allowType: true } }];
                node = node.components[0];
                break;
            case ')':
                delete node.state;
                if (allowIndexed && node.name === 'indexed') {
                    node.indexed = true;
                    node.name = '';
                }
                node.type = verifyType(node.type);
                var child = node;
                node = node.parent;
                if (!node) {
                    throwError(i);
                }
                delete child.parent;
                node.state.allowParams = false;
                node.state.allowName = true;
                node.state.allowArray = true;
                break;
            case ',':
                delete node.state;
                if (allowIndexed && node.name === 'indexed') {
                    node.indexed = true;
                    node.name = '';
                }
                node.type = verifyType(node.type);
                var sibling = { type: '', name: '', parent: node.parent, state: { allowType: true } };
                node.parent.components.push(sibling);
                delete node.parent;
                node = sibling;
                break;
            // Hit a space...
            case ' ':
                // If reading type, the type is done and may read a param or name
                if (node.state.allowType) {
                    if (node.type !== '') {
                        node.type = verifyType(node.type);
                        delete node.state.allowType;
                        node.state.allowName = true;
                        node.state.allowParams = true;
                    }
                }
                // If reading name, the name is done
                if (node.state.allowName) {
                    if (node.name !== '') {
                        if (allowIndexed && node.name === 'indexed') {
                            node.indexed = true;
                            node.name = '';
                        }
                        else {
                            node.state.allowName = false;
                        }
                    }
                }
                break;
            case '[':
                if (!node.state.allowArray) {
                    throwError(i);
                }
                node.type += c;
                node.state.allowArray = false;
                node.state.allowName = false;
                node.state.readArray = true;
                break;
            case ']':
                if (!node.state.readArray) {
                    throwError(i);
                }
                node.type += c;
                node.state.readArray = false;
                node.state.allowArray = true;
                node.state.allowName = true;
                break;
            default:
                if (node.state.allowType) {
                    node.type += c;
                    node.state.allowParams = true;
                    node.state.allowArray = true;
                }
                else if (node.state.allowName) {
                    node.name += c;
                    delete node.state.allowArray;
                }
                else if (node.state.readArray) {
                    node.type += c;
                }
                else {
                    throwError(i);
                }
        }
    }
    if (node.parent) {
        throw new Error('unexpected eof');
    }
    delete parent.state;
    if (allowIndexed && node.name === 'indexed') {
        node.indexed = true;
        node.name = '';
    }
    parent.type = verifyType(parent.type);
    return parent;
}
// @TODO: Better return type
function parseSignatureEvent(fragment) {
    var abi = {
        anonymous: false,
        inputs: [],
        name: '',
        type: 'event',
    };
    var match = fragment.match(regexParen);
    if (!match) {
        throw new Error('invalid event: ' + fragment);
    }
    abi.name = match[1].trim();
    splitNesting(match[2]).forEach(function (param) {
        param = parseParam(param, true);
        param.indexed = !!param.indexed;
        abi.inputs.push(param);
    });
    match[3].split(' ').forEach(function (modifier) {
        switch (modifier) {
            case 'anonymous':
                abi.anonymous = true;
                break;
            case '':
                break;
            default:
                console.log('unknown modifier: ' + modifier);
        }
    });
    if (abi.name && !abi.name.match(regexIdentifier)) {
        throw new Error('invalid identifier: "' + abi.name + '"');
    }
    return abi;
}
function parseSignatureFunction(fragment) {
    var abi = {
        constant: false,
        gas: null,
        inputs: [],
        name: '',
        outputs: [],
        payable: false,
        stateMutability: null,
        type: 'function',
    };
    let comps = fragment.split('@');
    if (comps.length !== 1) {
        if (comps.length > 2) {
            throw new Error('invalid signature');
        }
        if (!comps[1].match(/^[0-9]+$/)) {
            throw new Error('invalid signature gas');
        }
        abi.gas = bignumber_1.bigNumberify(comps[1]);
        fragment = comps[0];
    }
    comps = fragment.split(' returns ');
    var left = comps[0].match(regexParen);
    if (!left) {
        throw new Error('invalid signature');
    }
    abi.name = left[1].trim();
    if (!abi.name.match(regexIdentifier)) {
        throw new Error('invalid identifier: "' + left[1] + '"');
    }
    splitNesting(left[2]).forEach(function (param) {
        abi.inputs.push(parseParam(param));
    });
    left[3].split(' ').forEach(function (modifier) {
        switch (modifier) {
            case 'constant':
                abi.constant = true;
                break;
            case 'payable':
                abi.payable = true;
                abi.stateMutability = 'payable';
                break;
            case 'pure':
                abi.constant = true;
                abi.stateMutability = 'pure';
                break;
            case 'view':
                abi.constant = true;
                abi.stateMutability = 'view';
                break;
            case 'external':
            case 'public':
            case '':
                break;
            default:
                console.log('unknown modifier: ' + modifier);
        }
    });
    // We have outputs
    if (comps.length > 1) {
        var right = comps[1].match(regexParen);
        if (right[1].trim() != '' || right[3].trim() != '') {
            throw new Error('unexpected tokens');
        }
        splitNesting(right[2]).forEach(function (param) {
            abi.outputs.push(parseParam(param));
        });
    }
    if (abi.name === 'constructor') {
        abi.type = 'constructor';
        if (abi.outputs.length) {
            throw new Error('constructor may not have outputs');
        }
        delete abi.name;
        delete abi.outputs;
    }
    return abi;
}
function parseParamType(type) {
    return parseParam(type, true);
}
exports.parseParamType = parseParamType;
// @TODO: Allow a second boolean to expose names
function formatParamType(paramType) {
    return getParamCoder(exports.defaultCoerceFunc, paramType).type;
}
exports.formatParamType = formatParamType;
// @TODO: Allow a second boolean to expose names and modifiers
function formatSignature(fragment) {
    return fragment.name + '(' + fragment.inputs.map(i => formatParamType(i)).join(',') + ')';
}
exports.formatSignature = formatSignature;
function parseSignature(fragment) {
    if (typeof fragment === 'string') {
        // Make sure the "returns" is surrounded by a space and all whitespace is exactly one space
        fragment = fragment
            .replace(/\(/g, ' (')
            .replace(/\)/g, ') ')
            .replace(/\s+/g, ' ');
        fragment = fragment.trim();
        if (fragment.substring(0, 6) === 'event ') {
            return parseSignatureEvent(fragment.substring(6).trim());
        }
        else {
            if (fragment.substring(0, 9) === 'function ') {
                fragment = fragment.substring(9);
            }
            return parseSignatureFunction(fragment.trim());
        }
    }
    throw new Error('unknown signature');
}
exports.parseSignature = parseSignature;
class Coder {
    constructor(coerceFunc, name, type, localName = '', dynamic) {
        this.coerceFunc = coerceFunc;
        this.name = name;
        this.type = type;
        this.localName = localName;
        this.dynamic = dynamic;
    }
}
// Clones the functionality of an existing Coder, but without a localName
class CoderAnonymous extends Coder {
    constructor(coder) {
        super(coder.coerceFunc, coder.name, coder.type, undefined, coder.dynamic);
        properties_1.defineReadOnly(this, 'coder', coder);
    }
    encode(value) {
        return this.coder.encode(value);
    }
    decode(data, offset) {
        return this.coder.decode(data, offset);
    }
}
class CoderNull extends Coder {
    constructor(coerceFunc, localName) {
        super(coerceFunc, 'null', '', localName, false);
    }
    encode(value) {
        return bytes_1.arrayify([]);
    }
    decode(data, offset) {
        if (offset > data.length) {
            throw new Error('invalid null');
        }
        return {
            consumed: 0,
            value: this.coerceFunc('null', undefined),
        };
    }
}
class CoderNumber extends Coder {
    constructor(coerceFunc, size, signed, localName) {
        const name = (signed ? 'int' : 'uint') + size * 8;
        super(coerceFunc, name, name, localName, false);
        this.size = size;
        this.signed = signed;
    }
    encode(value) {
        try {
            let v = bignumber_1.bigNumberify(value);
            if (this.signed) {
                let bounds = constants_1.MaxUint256.maskn(this.size * 8 - 1);
                if (v.gt(bounds)) {
                    throw new Error('out-of-bounds');
                }
                bounds = bounds.add(constants_1.One).mul(constants_1.NegativeOne);
                if (v.lt(bounds)) {
                    throw new Error('out-of-bounds');
                }
            }
            else if (v.lt(constants_1.Zero) || v.gt(constants_1.MaxUint256.maskn(this.size * 8))) {
                throw new Error('out-of-bounds');
            }
            v = v.toTwos(this.size * 8).maskn(this.size * 8);
            if (this.signed) {
                v = v.fromTwos(this.size * 8).toTwos(256);
            }
            return bytes_1.padZeros(bytes_1.arrayify(v), 32);
        }
        catch (error) {
            return errors.throwError('invalid number value', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: this.name,
                value: value,
            });
        }
    }
    decode(data, offset) {
        if (data.length < offset + 32) {
            errors.throwError('insufficient data for ' + this.name + ' type', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: this.name,
                value: bytes_1.hexlify(data.slice(offset, offset + 32)),
            });
        }
        var junkLength = 32 - this.size;
        var value = bignumber_1.bigNumberify(data.slice(offset + junkLength, offset + 32));
        if (this.signed) {
            value = value.fromTwos(this.size * 8);
        }
        else {
            value = value.maskn(this.size * 8);
        }
        return {
            consumed: 32,
            value: this.coerceFunc(this.name, value),
        };
    }
}
var uint256Coder = new CoderNumber(function (type, value) {
    return value;
}, 32, false, 'none');
class CoderBoolean extends Coder {
    constructor(coerceFunc, localName) {
        super(coerceFunc, 'bool', 'bool', localName, false);
    }
    encode(value) {
        return uint256Coder.encode(!!value ? 1 : 0);
    }
    decode(data, offset) {
        try {
            var result = uint256Coder.decode(data, offset);
        }
        catch (error) {
            if (error.reason === 'insufficient data for uint256 type') {
                errors.throwError('insufficient data for boolean type', errors.INVALID_ARGUMENT, {
                    arg: this.localName,
                    coderType: 'boolean',
                    value: error.value,
                });
            }
            throw error;
        }
        return {
            consumed: result.consumed,
            value: this.coerceFunc('bool', !result.value.isZero()),
        };
    }
}
class CoderFixedBytes extends Coder {
    constructor(coerceFunc, length, localName) {
        const name = 'bytes' + length;
        super(coerceFunc, name, name, localName, false);
        this.length = length;
    }
    encode(value) {
        var result = new Uint8Array(32);
        try {
            if (value.length % 2 !== 0) {
                throw new Error(`hex string cannot be odd-length`);
            }
            let data = bytes_1.arrayify(value);
            if (data.length > this.length) {
                throw new Error(`incorrect data length`);
            }
            result.set(data);
        }
        catch (error) {
            errors.throwError('invalid ' + this.name + ' value', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: this.name,
                value: error.value || value,
            });
        }
        return result;
    }
    decode(data, offset) {
        if (data.length < offset + 32) {
            errors.throwError('insufficient data for ' + name + ' type', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: this.name,
                value: bytes_1.hexlify(data.slice(offset, offset + 32)),
            });
        }
        return {
            consumed: 32,
            value: this.coerceFunc(this.name, bytes_1.hexlify(data.slice(offset, offset + this.length))),
        };
    }
}
class CoderAddress extends Coder {
    constructor(coerceFunc, localName) {
        super(coerceFunc, 'address', 'address', localName, false);
    }
    encode(value) {
        let result = new Uint8Array(32);
        value = util_1.isString(value) ? address_2.Address.fromString(value) : value;
        try {
            result.set(bytes_1.arrayify(value.toBuffer()), 12);
        }
        catch (error) {
            errors.throwError(`invalid address (${error.message})`, errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: 'address',
                value: value,
            });
        }
        return result;
    }
    decode(data, offset) {
        if (data.length < offset + 32) {
            errors.throwError('insufficuent data for address type', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: 'address',
                value: bytes_1.hexlify(data.slice(offset, offset + 32)),
            });
        }
        return {
            consumed: 32,
            value: this.coerceFunc('address', address_1.getAddress(bytes_1.hexlify(data.slice(offset + 12, offset + 32)))),
        };
    }
}
function _encodeDynamicBytes(value) {
    var dataLength = 32 * Math.ceil(value.length / 32);
    var padding = new Uint8Array(dataLength - value.length);
    return bytes_1.concat([uint256Coder.encode(value.length), value, padding]);
}
function _decodeDynamicBytes(data, offset, localName) {
    if (data.length < offset + 32) {
        errors.throwError('insufficient data for dynamicBytes length', errors.INVALID_ARGUMENT, {
            arg: localName,
            coderType: 'dynamicBytes',
            value: bytes_1.hexlify(data.slice(offset, offset + 32)),
        });
    }
    var length = uint256Coder.decode(data, offset).value;
    try {
        length = length.toNumber();
    }
    catch (error) {
        errors.throwError('dynamic bytes count too large', errors.INVALID_ARGUMENT, {
            arg: localName,
            coderType: 'dynamicBytes',
            value: length.toString(),
        });
    }
    if (data.length < offset + 32 + length) {
        errors.throwError('insufficient data for dynamicBytes type', errors.INVALID_ARGUMENT, {
            arg: localName,
            coderType: 'dynamicBytes',
            value: bytes_1.hexlify(data.slice(offset, offset + 32 + length)),
        });
    }
    return {
        consumed: 32 + 32 * Math.ceil(length / 32),
        value: data.slice(offset + 32, offset + 32 + length),
    };
}
class CoderDynamicBytes extends Coder {
    constructor(coerceFunc, localName) {
        super(coerceFunc, 'bytes', 'bytes', localName, true);
    }
    encode(value) {
        try {
            return _encodeDynamicBytes(bytes_1.arrayify(value));
        }
        catch (error) {
            return errors.throwError('invalid bytes value', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: 'bytes',
                value: error.value,
            });
        }
    }
    decode(data, offset) {
        var result = _decodeDynamicBytes(data, offset, this.localName);
        result.value = this.coerceFunc('bytes', bytes_1.hexlify(result.value));
        return result;
    }
}
class CoderString extends Coder {
    constructor(coerceFunc, localName) {
        super(coerceFunc, 'string', 'string', localName, true);
    }
    encode(value) {
        if (typeof value !== 'string') {
            errors.throwError('invalid string value', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: 'string',
                value: value,
            });
        }
        return _encodeDynamicBytes(utf8_1.toUtf8Bytes(value));
    }
    decode(data, offset) {
        var result = _decodeDynamicBytes(data, offset, this.localName);
        result.value = this.coerceFunc('string', utf8_1.toUtf8String(result.value));
        return result;
    }
}
function alignSize(size) {
    return 32 * Math.ceil(size / 32);
}
function pack(coders, values) {
    if (Array.isArray(values)) {
        // do nothing
    }
    else if (values && typeof values === 'object') {
        var arrayValues = [];
        coders.forEach(function (coder) {
            arrayValues.push(values[coder.localName]);
        });
        values = arrayValues;
    }
    else {
        errors.throwError('invalid tuple value', errors.INVALID_ARGUMENT, {
            coderType: 'tuple',
            value: values,
        });
    }
    if (coders.length !== values.length) {
        errors.throwError('types/value length mismatch', errors.INVALID_ARGUMENT, {
            coderType: 'tuple',
            value: values,
        });
    }
    var parts = [];
    coders.forEach(function (coder, index) {
        parts.push({ dynamic: coder.dynamic, value: coder.encode(values[index]) });
    });
    var staticSize = 0, dynamicSize = 0;
    parts.forEach(function (part) {
        if (part.dynamic) {
            staticSize += 32;
            dynamicSize += alignSize(part.value.length);
        }
        else {
            staticSize += alignSize(part.value.length);
        }
    });
    var offset = 0, dynamicOffset = staticSize;
    var data = new Uint8Array(staticSize + dynamicSize);
    parts.forEach(function (part) {
        if (part.dynamic) {
            //uint256Coder.encode(dynamicOffset).copy(data, offset);
            data.set(uint256Coder.encode(dynamicOffset), offset);
            offset += 32;
            //part.value.copy(data, dynamicOffset);  @TODO
            data.set(part.value, dynamicOffset);
            dynamicOffset += alignSize(part.value.length);
        }
        else {
            //part.value.copy(data, offset);  @TODO
            data.set(part.value, offset);
            offset += alignSize(part.value.length);
        }
    });
    return data;
}
function unpack(coders, data, offset) {
    var baseOffset = offset;
    var consumed = 0;
    var value = [];
    coders.forEach(function (coder) {
        if (coder.dynamic) {
            var dynamicOffset = uint256Coder.decode(data, offset);
            var result = coder.decode(data, baseOffset + dynamicOffset.value.toNumber());
            // The dynamic part is leap-frogged somewhere else; doesn't count towards size
            result.consumed = dynamicOffset.consumed;
        }
        else {
            var result = coder.decode(data, offset);
        }
        if (result.value != undefined) {
            value.push(result.value);
        }
        offset += result.consumed;
        consumed += result.consumed;
    });
    coders.forEach(function (coder, index) {
        let name = coder.localName;
        if (!name) {
            return;
        }
        if (name === 'length') {
            name = '_length';
        }
        if (value[name] != null) {
            return;
        }
        value[name] = value[index];
    });
    return {
        value: value,
        consumed: consumed,
    };
}
class CoderArray extends Coder {
    constructor(coerceFunc, coder, length, localName) {
        const type = coder.type + '[' + (length >= 0 ? length : '') + ']';
        const dynamic = length === -1 || coder.dynamic;
        super(coerceFunc, 'array', type, localName, dynamic);
        this.coder = coder;
        this.length = length;
    }
    encode(value) {
        if (!Array.isArray(value)) {
            errors.throwError('expected array value', errors.INVALID_ARGUMENT, {
                arg: this.localName,
                coderType: 'array',
                value: value,
            });
        }
        var count = this.length;
        var result = new Uint8Array(0);
        if (count === -1) {
            count = value.length;
            result = uint256Coder.encode(count);
        }
        errors.checkArgumentCount(count, value.length, 'in coder array' + (this.localName ? ' ' + this.localName : ''));
        var coders = [];
        for (var i = 0; i < value.length; i++) {
            coders.push(this.coder);
        }
        return bytes_1.concat([result, pack(coders, value)]);
    }
    decode(data, offset) {
        // @TODO:
        //if (data.length < offset + length * 32) { throw new Error('invalid array'); }
        var consumed = 0;
        var count = this.length;
        if (count === -1) {
            try {
                var decodedLength = uint256Coder.decode(data, offset);
            }
            catch (error) {
                return errors.throwError('insufficient data for dynamic array length', errors.INVALID_ARGUMENT, {
                    arg: this.localName,
                    coderType: 'array',
                    value: error.value,
                });
            }
            try {
                count = decodedLength.value.toNumber();
            }
            catch (error) {
                errors.throwError('array count too large', errors.INVALID_ARGUMENT, {
                    arg: this.localName,
                    coderType: 'array',
                    value: decodedLength.value.toString(),
                });
            }
            consumed += decodedLength.consumed;
            offset += decodedLength.consumed;
        }
        var coders = [];
        for (var i = 0; i < count; i++) {
            coders.push(new CoderAnonymous(this.coder));
        }
        var result = unpack(coders, data, offset);
        result.consumed += consumed;
        result.value = this.coerceFunc(this.type, result.value);
        return result;
    }
}
class CoderTuple extends Coder {
    constructor(coerceFunc, coders, localName) {
        var dynamic = false;
        var types = [];
        coders.forEach(function (coder) {
            if (coder.dynamic) {
                dynamic = true;
            }
            types.push(coder.type);
        });
        var type = 'tuple(' + types.join(',') + ')';
        super(coerceFunc, 'tuple', type, localName, dynamic);
        this.coders = coders;
    }
    encode(value) {
        return pack(this.coders, value);
    }
    decode(data, offset) {
        var result = unpack(this.coders, data, offset);
        result.value = this.coerceFunc(this.type, result.value);
        return result;
    }
}
/*
function getTypes(coders) {
    var type = coderTuple(coders).type;
    return type.substring(6, type.length - 1);
}
*/
function splitNesting(value) {
    value = value.trim();
    var result = [];
    var accum = '';
    var depth = 0;
    for (var offset = 0; offset < value.length; offset++) {
        var c = value[offset];
        if (c === ',' && depth === 0) {
            result.push(accum);
            accum = '';
        }
        else {
            accum += c;
            if (c === '(') {
                depth++;
            }
            else if (c === ')') {
                depth--;
                if (depth === -1) {
                    throw new Error('unbalanced parenthsis');
                }
            }
        }
    }
    if (accum) {
        result.push(accum);
    }
    return result;
}
// @TODO: Is there a way to return "class"?
const paramTypeSimple = {
    address: CoderAddress,
    bool: CoderBoolean,
    string: CoderString,
    bytes: CoderDynamicBytes,
};
function getTupleParamCoder(coerceFunc, components, localName) {
    if (!components) {
        components = [];
    }
    var coders = [];
    components.forEach(function (component) {
        coders.push(getParamCoder(coerceFunc, component));
    });
    return new CoderTuple(coerceFunc, coders, localName);
}
function getParamCoder(coerceFunc, param) {
    var coder = paramTypeSimple[param.type];
    if (coder) {
        return new coder(coerceFunc, param.name);
    }
    var match = param.type.match(paramTypeNumber);
    if (match) {
        let size = parseInt(match[2] || '256');
        if (size === 0 || size > 256 || size % 8 !== 0) {
            return errors.throwError('invalid ' + match[1] + ' bit length', errors.INVALID_ARGUMENT, {
                arg: 'param',
                value: param,
            });
        }
        return new CoderNumber(coerceFunc, size / 8, match[1] === 'int', param.name);
    }
    var match = param.type.match(paramTypeBytes);
    if (match) {
        let size = parseInt(match[1]);
        if (size === 0 || size > 32) {
            errors.throwError('invalid bytes length', errors.INVALID_ARGUMENT, {
                arg: 'param',
                value: param,
            });
        }
        return new CoderFixedBytes(coerceFunc, size, param.name);
    }
    var match = param.type.match(paramTypeArray);
    if (match) {
        let size = parseInt(match[2] || '-1');
        param = properties_1.shallowCopy(param);
        param.type = match[1];
        param = properties_1.deepCopy(param);
        return new CoderArray(coerceFunc, getParamCoder(coerceFunc, param), size, param.name);
    }
    if (param.type.substring(0, 5) === 'tuple') {
        return getTupleParamCoder(coerceFunc, param.components, param.name);
    }
    if (param.type === '') {
        return new CoderNull(coerceFunc, param.name);
    }
    return errors.throwError('invalid type', errors.INVALID_ARGUMENT, {
        arg: 'type',
        value: param.type,
    });
}
class AbiCoder {
    constructor(coerceFunc) {
        errors.checkNew(this, AbiCoder);
        if (!coerceFunc) {
            coerceFunc = exports.defaultCoerceFunc;
        }
        properties_1.defineReadOnly(this, 'coerceFunc', coerceFunc);
    }
    encode(types, values) {
        if (types.length !== values.length) {
            errors.throwError('types/values length mismatch', errors.INVALID_ARGUMENT, {
                count: { types: types.length, values: values.length },
                value: { types: types, values: values },
            });
        }
        var coders = [];
        types.forEach(function (type) {
            // Convert types to type objects
            //   - "uint foo" => { type: "uint", name: "foo" }
            //   - "tuple(uint, uint)" => { type: "tuple", components: [ { type: "uint" }, { type: "uint" }, ] }
            let typeObject;
            if (typeof type === 'string') {
                typeObject = parseParam(type);
            }
            else {
                typeObject = type;
            }
            coders.push(getParamCoder(this.coerceFunc, typeObject));
        }, this);
        return bytes_1.hexlify(new CoderTuple(this.coerceFunc, coders, '_').encode(values));
    }
    decode(types, data) {
        var coders = [];
        types.forEach(function (type) {
            // See encode for details
            let typeObject;
            if (typeof type === 'string') {
                typeObject = parseParam(type);
            }
            else {
                typeObject = properties_1.deepCopy(type);
            }
            coders.push(getParamCoder(this.coerceFunc, typeObject));
        }, this);
        return new CoderTuple(this.coerceFunc, coders, '_').decode(bytes_1.arrayify(data), 0).value;
    }
}
exports.AbiCoder = AbiCoder;
exports.defaultAbiCoder = new AbiCoder();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJpLWNvZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V0aGVycy9hYmktY29kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYixtRUFBbUU7QUFFbkUsMkNBQWlFO0FBRWpFLHlEQUFtQztBQUVuQyx1Q0FBdUM7QUFDdkMsMkNBQXNEO0FBQ3RELG1DQUE4RDtBQUM5RCxpQ0FBbUQ7QUFDbkQsNkNBQXFFO0FBT3JFLHdDQUFxQztBQUNyQywrQkFBZ0M7QUF3Q2hDLCtCQUErQjtBQUUvQixNQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JELE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDeEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUUzQyxRQUFBLGlCQUFpQixHQUFlLFVBQVMsSUFBWSxFQUFFLEtBQVU7SUFDNUUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4QyxJQUFJLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JDLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3pCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7QUFFRixtQ0FBbUM7QUFDbkMsa0NBQWtDO0FBRWxDLE1BQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDOUQsTUFBTSxlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUUvRCxTQUFTLFVBQVUsQ0FBQyxJQUFZO0lBQzlCLHlEQUF5RDtJQUN6RCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFB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