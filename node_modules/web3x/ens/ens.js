"use strict";
/*
  This file is part of web3x.

  web3x is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  web3x is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with web3x.  If not, see <http://www.gnu.org/licenses/>.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("../address");
const net_1 = require("../net");
const config_1 = require("./config");
const registry_1 = require("./registry");
const namehash_1 = require("./registry/namehash");
/**
 * Constructs a new instance of ENS
 *
 * @method ENS
 * @param {Object} eth
 * @constructor
 */
class ENS {
    constructor(eth) {
        this.eth = eth;
        this.registry = new registry_1.Registry(this);
        this.net = new net_1.Net(eth);
    }
    getRegistry() {
        return this.registry;
    }
    /**
     * @param {string} name
     * @returns {Promise<Contract>}
     */
    getResolver(name) {
        return this.registry.resolver(name);
    }
    /**
     * Returns the address record associated with a name.
     *
     * @method getAddress
     * @param {string} name
     * @param {function} callback
     * @return {eventifiedPromise}
     */
    async getAddress(name) {
        const resolver = await this.registry.resolver(name);
        return await resolver.methods.addr(namehash_1.namehash(name)).call();
    }
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
    async setAddress(name, address, sendOptions) {
        const resolver = await this.registry.resolver(name);
        return await resolver.methods.setAddr(namehash_1.namehash(name), address).send(sendOptions);
    }
    /**
     * Returns the public key
     *
     * @method getPubkey
     * @param {string} name
     * @param {function} callback
     * @returns {eventifiedPromise}
     */
    async getPubkey(name) {
        const resolver = await this.registry.resolver(name);
        return await resolver.methods.pubkey(namehash_1.namehash(name)).call();
    }
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
    async setPubkey(name, x, y, sendOptions) {
        const resolver = await this.registry.resolver(name);
        return await resolver.methods.setPubkey(namehash_1.namehash(name), x, y).send(sendOptions);
    }
    /**
     * Returns the content
     *
     * @method getContent
     * @param {string} name
     * @param {function} callback
     * @returns {eventifiedPromise}
     */
    async getContent(name) {
        const resolver = await this.registry.resolver(name);
        return await resolver.methods.content(namehash_1.namehash(name)).call();
    }
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
    async setContent(name, hash, sendOptions) {
        const resolver = await this.registry.resolver(name);
        return await resolver.methods.setContent(namehash_1.namehash(name), hash).send(sendOptions);
    }
    /**
     * Get the multihash
     *
     * @method getMultihash
     * @param {string} name
     * @param {function} callback
     * @returns {eventifiedPromise}
     */
    async getMultihash(name) {
        const resolver = await this.registry.resolver(name);
        return await resolver.methods.multihash(namehash_1.namehash(name)).call();
    }
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
    async setMultihash(name, hash, sendOptions) {
        const resolver = await this.registry.resolver(name);
        return await resolver.methods.setMultihash(namehash_1.namehash(name), hash).send(sendOptions);
    }
    /**
     * Checks if the current used network is synced and looks for ENS support there.
     * Throws an error if not.
     *
     * @returns {Promise<Block>}
     */
    async checkNetwork() {
        const block = await this.eth.getBlock('latest');
        const headAge = new Date().getTime() / 1000 - block.timestamp;
        if (headAge > 3600) {
            throw new Error('Network not synced; last block was ' + headAge + ' seconds ago');
        }
        const networkType = await this.net.getNetworkType();
        const addr = config_1.config.addresses[networkType];
        if (typeof addr === 'undefined') {
            throw new Error('ENS is not supported on network ' + networkType);
        }
        return address_1.Address.fromString(addr);
    }
}
exports.ENS = ENS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vucy9lbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUFFRix3Q0FBcUM7QUFHckMsZ0NBQTZCO0FBQzdCLHFDQUFrQztBQUNsQyx5Q0FBc0M7QUFDdEMsa0RBQStDO0FBRS9DOzs7Ozs7R0FNRztBQUNILE1BQWEsR0FBRztJQUlkLFlBQXFCLEdBQVE7UUFBUixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBSHJCLGFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFJcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFNBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVcsQ0FBQyxJQUFZO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQVk7UUFDbEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxPQUFPLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVELENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQVksRUFBRSxPQUFnQixFQUFFLFdBQXdCO1FBQzlFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsT0FB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