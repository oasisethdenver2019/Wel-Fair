import BN from 'bn.js';
/**
 * Returns true if object is BN, otherwise false
 *
 * @method isBN
 * @param {Object} object
 * @return {Boolean}
 */
export declare function isBN(object: any): boolean;
/**
 * Takes an input and transforms it into an BN
 *
 * @method toBN
 * @param {Number|String|BN} num, string, HEX string or BN
 * @return {BN} BN
 */
export declare function toBN(num: number | string | BN): BN;
/**
 * Takes and input transforms it into BN and if it is negative value, into two's complement
 *
 * @method toTwosComplement
 * @param {Number|String|BN} num
 * @return {String}
 */
export declare function toTwosComplement(num: number | string | BN): string;
