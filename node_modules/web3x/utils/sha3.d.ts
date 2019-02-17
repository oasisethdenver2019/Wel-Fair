/// <reference types="node" />
/**
 * Hashes values to a sha3 hash using keccak 256
 *
 * To hash a HEX string the hex must have 0x in front.
 *
 * @method sha3
 * @return {String} the sha3 string
 */
export declare function sha3(value: string | Buffer): string;
export declare function sha3Buffer(value: string | Buffer): Buffer;
