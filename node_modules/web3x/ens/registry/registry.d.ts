import { Address } from '../../address';
import { EnsResolver } from '../contracts/EnsResolver';
import { ENS } from '../ens';
/**
 * A wrapper around the ENS registry contract.
 *
 * @method Registry
 * @param {Ens} ens
 * @constructor
 */
export declare class Registry {
    private ens;
    private contract;
    constructor(ens: ENS);
    /**
     * Returns the address of the owner of an ENS name.
     *
     * @method owner
     * @param {string} name
     * @param {function} callback
     * @return {Promise<any>}
     */
    owner(name: string): Promise<Address>;
    /**
     * Returns the resolver contract associated with a name.
     *
     * @method resolver
     * @param {string} name
     * @return {Promise<Contract>}
     */
    resolver(name: string): Promise<EnsResolver>;
}
