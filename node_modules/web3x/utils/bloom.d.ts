/**
 * Returns true if address is part of the given bloom.
 * note: false positives are possible.
 *
 * @method testAddress
 * @param {String} hex encoded bloom
 * @param {String} address in hex notation
 * @returns {Boolean} topic is (probably) part of the block
 */
export declare let testAddress: (bloom: string, address: string) => boolean;
/**
 * Returns true if the topic is part of the given bloom.
 * note: false positives are possible.
 *
 * @method hasTopic
 * @param {String} hex encoded bloom
 * @param {String} address in hex notation
 * @returns {Boolean} topic is (probably) part of the block
 */
export declare let testTopic: (bloom: string, topic: string) => boolean;
/**
 * Returns true if given string is a valid Ethereum block header bloom.
 *
 * TODO UNDOCUMENTED
 *
 * @method isBloom
 * @param {String} hex encoded bloom filter
 * @return {Boolean}
 */
export declare let isBloom: (bloom: string) => boolean;
