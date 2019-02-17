import { Address } from '../address';
export declare type IbanAddress = string;
export declare type BbanAddress = string;
/**
 * This prototype should be used to create iban object from iban correct string
 *
 * @param {String} iban
 */
export declare class Iban {
    private iban;
    constructor(iban: string);
    /**
     * This method should be used to create an ethereum address from a direct iban address
     *
     * @method toAddress
     * @param {String} iban address
     * @return {String} the ethereum address
     */
    static toAddress(ib: IbanAddress): Address;
    /**
     * This method should be used to create iban address from an ethereum address
     *
     * @method toIban
     * @param {String} address
     * @return {String} the IBAN address
     */
    static toIban(address: Address): IbanAddress;
    /**
     * This method should be used to create iban object from an ethereum address
     *
     * @method fromAddress
     * @param {String} address
     * @return {Iban} the IBAN object
     */
    static fromAddress(address: Address): Iban;
    static fromString(address: string): Iban;
    /**
     * Convert the passed BBAN to an IBAN for this country specification.
     * Please note that <i>"generation of the IBAN shall be the exclusive responsibility of the bank/branch servicing the account"</i>.
     * This method implements the preferred algorithm described in http://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_IBAN_check_digits
     *
     * @method fromBban
     * @param {String} bban the BBAN to convert to IBAN
     * @returns {Iban} the IBAN object
     */
    static fromBban(bban: BbanAddress): Iban;
    /**
     * Should be used to create IBAN object for given institution and identifier
     *
     * @method createIndirect
     * @param {Object} options, required options are "institution" and "identifier"
     * @return {Iban} the IBAN object
     */
    static createIndirect(options: {
        institution: string;
        identifier: string;
    }): Iban;
    /**
     * This method should be used to check if given string is valid iban object
     *
     * @method isValid
     * @param {String} iban string
     * @return {Boolean} true if it is valid IBAN
     */
    static isValid(iban: any): boolean;
    /**
     * Should be called to check if iban is correct
     *
     * @method isValid
     * @returns {Boolean} true if it is, otherwise false
     */
    isValid(): boolean;
    /**
     * Should be called to check if iban number is direct
     *
     * @method isDirect
     * @returns {Boolean} true if it is, otherwise false
     */
    isDirect(): boolean;
    /**
     * Should be called to check if iban number if indirect
     *
     * @method isIndirect
     * @returns {Boolean} true if it is, otherwise false
     */
    isIndirect(): boolean;
    /**
     * Should be called to get iban checksum
     * Uses the mod-97-10 checksumming protocol (ISO/IEC 7064:2003)
     *
     * @method checksum
     * @returns {String} checksum
     */
    checksum(): string;
    /**
     * Should be called to get institution identifier
     * eg. XREG
     *
     * @method institution
     * @returns {String} institution identifier
     */
    institution(): string;
    /**
     * Should be called to get client identifier within institution
     * eg. GAVOFYORK
     *
     * @method client
     * @returns {String} client identifier
     */
    client(): string;
    /**
     * Should be called to get client direct address
     *
     * @method toAddress
     * @returns {String} ethereum address
     */
    toAddress(): Address;
    toString(): string;
}
