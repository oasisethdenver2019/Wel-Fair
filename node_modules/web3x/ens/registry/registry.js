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
const EnsRegistry_1 = require("../contracts/EnsRegistry");
const EnsResolver_1 = require("../contracts/EnsResolver");
const namehash_1 = require("./namehash");
/**
 * A wrapper around the ENS registry contract.
 *
 * @method Registry
 * @param {Ens} ens
 * @constructor
 */
class Registry {
    constructor(ens) {
        this.ens = ens;
        this.contract = ens.checkNetwork().then(address => new EnsRegistry_1.EnsRegistry(ens.eth, address));
    }
    /**
     * Returns the address of the owner of an ENS name.
     *
     * @method owner
     * @param {string} name
     * @param {function} callback
     * @return {Promise<any>}
     */
    async owner(name) {
        const contract = await this.contract;
        return await contract.methods.owner(namehash_1.namehash(name)).call();
    }
    /**
     * Returns the resolver contract associated with a name.
     *
     * @method resolver
     * @param {string} name
     * @return {Promise<Contract>}
     */
    async resolver(name) {
        const contract = await this.contract;
        const address = await contract.methods.resolver(namehash_1.namehash(name)).call();
        return new EnsResolver_1.EnsResolver(this.ens.eth, address);
    }
}
exports.Registry = Registry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZW5zL3JlZ2lzdHJ5L3JlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBR0YsMERBQXVEO0FBQ3ZELDBEQUF1RDtBQUV2RCx5Q0FBc0M7QUFFdEM7Ozs7OztHQU1HO0FBQ0gsTUFBYSxRQUFRO0lBR25CLFlBQW9CLEdBQVE7UUFBUixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUkseUJBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQVk7UUFDN0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3JDLE9BQU8sTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBWTtRQUNoQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDckMsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkUsT0FBTyxJQUFJLHlCQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNGO0FBaENELDRCQWdDQyJ9