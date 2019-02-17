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
const tslib_1 = require("tslib");
const swarm_js_1 = tslib_1.__importDefault(require("swarm-js"));
class Bzz {
    constructor(provider) {
        this.provider = provider;
        if (typeof document !== 'undefined') {
            // Only allow file picker when in browser.
            this.pick = swarm_js_1.default.pick;
        }
    }
    download(bzzHash, localPath) {
        swarm_js_1.default.at(this.provider).download(bzzHash, localPath);
    }
    upload(mixed) {
        swarm_js_1.default.at(this.provider).upload(mixed);
    }
    isAvailable(swarmUrl) {
        swarm_js_1.default.at(this.provider).isAvailable(swarmUrl);
    }
}
exports.Bzz = Bzz;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnp6L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7OztBQUVGLGdFQUE2QjtBQUc3QixNQUFhLEdBQUc7SUFHZCxZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUMxQyxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRTtZQUNuQywwQ0FBMEM7WUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxrQkFBSyxDQUFDLElBQUksQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFTSxRQUFRLENBQUMsT0FBZSxFQUFFLFNBQWtCO1FBQ2pELGtCQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSxNQUFNLENBQUMsS0FBMEM7UUFDdEQsa0JBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sV0FBVyxDQUFDLFFBQWdCO1FBQ2pDLGtCQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNGO0FBckJELGtCQXFCQyJ9