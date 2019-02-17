import { Address } from '../address';
import { SendOptions } from '../contract';
import { Eth } from '../eth';
import { Registry } from './registry';
/**
 * Constructs a new instance of ENS
 *
 * @method ENS
 * @param {Object} eth
 * @constructor
 */
export declare class ENS {
    readonly eth: Eth;
    private registry;
    private net;
    constructor(eth: Eth);
    getRegistry(): Registry;
    /**
     * @param {string} name
     * @returns {Promise<Contract>}
     */
    getResolver(name: string): Promise<import("./contracts/EnsResolver").EnsResolver>;
    /**
     * Returns the address record associated with a name.
     *
     * @method getAddress
     * @param {string} name
     * @param {function} callback
     * @return {eventifiedPromise}
     */
    getAddress(name: string): Promise<Address>;
    /**
     * Sets a new address
     *
     * @method setAddress
     * @param {string} name
     * @param {string} address
     * @param {Object} sendOptions
     * @param {function} callback
     * @returns {eventifiedPromise}
     */
    setAddress(name: string, address: Address, sendOptions: SendOptions): Promise<import("../eth").SendTx<import("./contracts/EnsResolver").EnsResolverTransactionReceipt>>;
    /**
     * Returns the public key
     *
     * @method getPubkey
     * @param {string} name
     * @param {function} callback
     * @returns {eventifiedPromise}
     */
    getPubkey(name: string): Promise<[string, string]>;
    /**
     * Set the new public key
     *
     * @method setPubkey
     * @param {string} name
     * @param {string} x
     * @param {string} y
     * @param {Object} sendOptions
     * @param {function} callback
     * @returns {eventifiedPromise}
     */
    setPubkey(name: string, x: string, y: string, sendOptions: SendOptions): Promise<import("../eth").SendTx<import("./contracts/EnsResolver").EnsResolverTransactionReceipt>>;
    /**
     * Returns the content
     *
     * @method getContent
     * @param {string} name
     * @param {function} callback
     * @returns {eventifiedPromise}
     */
    getContent(name: string): Promise<string>;
    /**
     * Set the content
     *
     * @method setContent
     * @param {string} name
     * @param {string} hash
     * @param {function} callback
     * @param {Object} sendOptions
     * @returns {eventifiedPromise}
     */
    setContent(name: string, hash: string, sendOptions: SendOptions): Promise<import("../eth").SendTx<import("./contracts/EnsResolver").EnsResolverTransactionReceipt>>;
    /**
     * Get the multihash
     *
     * @method getMultihash
     * @param {string} name
     * @param {function} callback
     * @returns {eventifiedPromise}
     */
    getMultihash(name: string): Promise<string>;
    /**
     * Set the multihash
     *
     * @method setMultihash
     * @param {string} name
     * @param {string} hash
     * @param {Object} sendOptions
     * @param {function} callback
     * @returns {eventifiedPromise}
     */
    setMultihash(name: string, hash: string, sendOptions: SendOptions): Promise<import("../eth").SendTx<import("./contracts/EnsResolver").EnsResolverTransactionReceipt>>;
    /**
     * Checks if the current used network is synced and looks for ENS support there.
     * Throws an error if not.
     *
     * @returns {Promise<Block>}
     */
    checkNetwork(): Promise<Address>;
}
