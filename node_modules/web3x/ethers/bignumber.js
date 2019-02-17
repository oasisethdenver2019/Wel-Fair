'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 *  BigNumber
 *
 *  A wrapper around the BN.js object. We use the BN.js library
 *  because it is used by elliptic, so it is required regardles.
 *
 */
const bn_js_1 = tslib_1.__importDefault(require("bn.js"));
const bytes_1 = require("./bytes");
const properties_1 = require("./properties");
const errors = tslib_1.__importStar(require("./errors"));
const BN_1 = new bn_js_1.default(-1);
function toHex(bn) {
    let value = bn.toString(16);
    if (value[0] === '-') {
        if (value.length % 2 === 0) {
            return '-0x0' + value.substring(1);
        }
        return '-0x' + value.substring(1);
    }
    if (value.length % 2 === 1) {
        return '0x0' + value;
    }
    return '0x' + value;
}
function toBN(value) {
    return _bnify(bigNumberify(value));
}
function toBigNumber(bn) {
    return new BigNumber(toHex(bn));
}
function _bnify(value) {
    let hex = value._hex;
    if (hex[0] === '-') {
        return new bn_js_1.default(hex.substring(3), 16).mul(BN_1);
    }
    return new bn_js_1.default(hex.substring(2), 16);
}
class BigNumber {
    constructor(value) {
        this._hex = '';
        errors.checkNew(this, BigNumber);
        properties_1.setType(this, 'BigNumber');
        if (typeof value === 'string') {
            if (bytes_1.isHexString(value)) {
                if (value == '0x') {
                    value = '0x0';
                }
                properties_1.defineReadOnly(this, '_hex', value);
            }
            else if (value[0] === '-' && bytes_1.isHexString(value.substring(1))) {
                properties_1.defineReadOnly(this, '_hex', value);
            }
            else if (value.match(/^-?[0-9]*$/)) {
                if (value == '') {
                    value = '0';
                }
                properties_1.defineReadOnly(this, '_hex', toHex(new bn_js_1.default(value)));
            }
            else {
                errors.throwError('invalid BigNumber string value', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
            }
        }
        else if (typeof value === 'number') {
            if (parseInt(String(value)) !== value) {
                errors.throwError('underflow', errors.NUMERIC_FAULT, {
                    operation: 'setValue',
                    fault: 'underflow',
                    value: value,
                    outputValue: parseInt(String(value)),
                });
            }
            try {
                properties_1.defineReadOnly(this, '_hex', toHex(new bn_js_1.default(value)));
            }
            catch (error) {
                errors.throwError('overflow', errors.NUMERIC_FAULT, {
                    operation: 'setValue',
                    fault: 'overflow',
                    details: error.message,
                });
            }
        }
        else if (value instanceof BigNumber) {
            properties_1.defineReadOnly(this, '_hex', value._hex);
        }
        else if (value.toHexString) {
            properties_1.defineReadOnly(this, '_hex', toHex(toBN(value.toHexString())));
        }
        else if (value._hex && bytes_1.isHexString(value._hex)) {
            properties_1.defineReadOnly(this, '_hex', value._hex);
        }
        else if (bytes_1.isArrayish(value)) {
            properties_1.defineReadOnly(this, '_hex', toHex(new bn_js_1.default(bytes_1.hexlify(value).substring(2), 16)));
        }
        else {
            errors.throwError('invalid BigNumber value', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
        }
    }
    fromTwos(value) {
        return toBigNumber(_bnify(this).fromTwos(value));
    }
    toTwos(value) {
        return toBigNumber(_bnify(this).toTwos(value));
    }
    add(other) {
        return toBigNumber(_bnify(this).add(toBN(other)));
    }
    sub(other) {
        return toBigNumber(_bnify(this).sub(toBN(other)));
    }
    div(other) {
        let o = bigNumberify(other);
        if (o.isZero()) {
            errors.throwError('division by zero', errors.NUMERIC_FAULT, { operation: 'divide', fault: 'division by zero' });
        }
        return toBigNumber(_bnify(this).div(toBN(other)));
    }
    mul(other) {
        return toBigNumber(_bnify(this).mul(toBN(other)));
    }
    mod(other) {
        return toBigNumber(_bnify(this).mod(toBN(other)));
    }
    pow(other) {
        return toBigNumber(_bnify(this).pow(toBN(other)));
    }
    maskn(value) {
        return toBigNumber(_bnify(this).maskn(value));
    }
    eq(other) {
        return _bnify(this).eq(toBN(other));
    }
    lt(other) {
        return _bnify(this).lt(toBN(other));
    }
    lte(other) {
        return _bnify(this).lte(toBN(other));
    }
    gt(other) {
        return _bnify(this).gt(toBN(other));
    }
    gte(other) {
        return _bnify(this).gte(toBN(other));
    }
    isZero() {
        return _bnify(this).isZero();
    }
    toNumber() {
        try {
            return _bnify(this).toNumber();
        }
        catch (error) {
            return errors.throwError('overflow', errors.NUMERIC_FAULT, {
                operation: 'setValue',
                fault: 'overflow',
                details: error.message,
            });
        }
    }
    toString() {
        return _bnify(this).toString(10);
    }
    toHexString() {
        return this._hex;
    }
    static isBigNumber(value) {
        return properties_1.isType(value, 'BigNumber');
    }
}
exports.BigNumber = BigNumber;
function bigNumberify(value) {
    if (bn_js_1.default.isBN(value)) {
        return new BigNumber(value.toString());
    }
    if (BigNumber.isBigNumber(value)) {
        return value;
    }
    return new BigNumber(value);
}
exports.bigNumberify = bigNumberify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlnbnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V0aGVycy9iaWdudW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYjs7Ozs7O0dBTUc7QUFFSCwwREFBdUI7QUFFdkIsbUNBQW9FO0FBQ3BFLDZDQUErRDtBQUkvRCx5REFBbUM7QUFFbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxlQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV4QixTQUFTLEtBQUssQ0FBQyxFQUFNO0lBQ25CLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ3BCLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLE9BQU8sTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25DO0lBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3RCO0lBQ0QsT0FBTyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ3RCLENBQUM7QUFFRCxTQUFTLElBQUksQ0FBQyxLQUFtQjtJQUMvQixPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsRUFBTTtJQUN6QixPQUFPLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxLQUFnQjtJQUM5QixJ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