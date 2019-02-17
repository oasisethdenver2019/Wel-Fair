/// <reference types="node" />
import BN from 'bn.js';
/**
 * Check if string is HEX, requires a 0x in front
 */
export declare function isHexStrict(hex: string): boolean;
/**
 * Check if string is HEX
 */
export declare function isHex(hex: string): boolean;
/**
 * Auto converts any given value into it's hex representation.
 */
export declare function toHex(value: string | number | BN | boolean | object, returnType?: any): string;
export declare function randomHex(size: any): string;
export declare function randomBuffer(size: any): Buffer;
export declare function trimHexLeadingZero(hex: string): string;
export declare function makeHexEven(hex: string): string;
