/**
 * Should be called to pad string to expected length
 *
 * @method leftPad
 * @param {String} str to be padded
 * @param {Number} chars that result string should have
 * @param {String} sign, by default 0
 * @returns {String} right aligned string
 */
export declare let leftPad: (str: string, chars: number, sign?: string) => string;
/**
 * Should be called to pad string to expected length
 *
 * @method rightPad
 * @param {String} str to be padded
 * @param {Number} chars that result string should have
 * @param {String} sign, by default 0
 * @returns {String} right aligned string
 */
export declare let rightPad: (str: string, chars: number, sign?: string) => string;
