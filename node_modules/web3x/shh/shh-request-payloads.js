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
const identity = result => result;
class ShhRequestPayloads {
    getVersion() {
        return {
            method: 'shh_version',
            format: identity,
        };
    }
    getInfo() {
        return {
            method: 'shh_info',
            format: identity,
        };
    }
    setMaxMessageSize(size) {
        return {
            method: 'shh_setMaxMessageSize',
            params: [size],
            format: identity,
        };
    }
    setMinPoW(pow) {
        return {
            method: 'shh_setMinPow',
            params: [pow],
            format: identity,
        };
    }
    markTrustedPeer(enode) {
        return {
            method: 'shh_markTrustedPeer',
            params: [enode],
            format: identity,
        };
    }
    newKeyPair() {
        return {
            method: 'shh_newKeyPair',
            format: identity,
        };
    }
    addPrivateKey(privateKey) {
        return {
            method: 'shh_addPrivateKey',
            params: [privateKey],
            format: identity,
        };
    }
    deleteKeyPair(id) {
        return {
            method: 'shh_deleteKeyPair',
            params: [id],
            format: identity,
        };
    }
    hasKeyPair(id) {
        return {
            method: 'shh_hasKeyPair',
            params: [id],
            format: identity,
        };
    }
    getPublicKey(id) {
        return {
            method: 'shh_getPublicKey',
            params: [id],
            format: identity,
        };
    }
    getPrivateKey(id) {
        return {
            method: 'shh_getPrivateKey',
            params: [id],
            format: identity,
        };
    }
    newSymKey() {
        return {
            method: 'shh_newSymKey',
            format: identity,
        };
    }
    addSymKey(symKey) {
        return {
            method: 'shh_addSymKey',
            params: [symKey],
            format: identity,
        };
    }
    generateSymKeyFromPassword(password) {
        return {
            method: 'shh_generateSymKeyFromPassword',
            params: [password],
            format: identity,
        };
    }
    hasSymKey(id) {
        return {
            method: 'shh_hasSymKey',
            params: [id],
            format: identity,
        };
    }
    getSymKey(id) {
        return {
            method: 'shh_getSymKey',
            params: [id],
            format: identity,
        };
    }
    deleteSymKey(id) {
        return {
            method: 'shh_deleteSymKey',
            params: [id],
            format: identity,
        };
    }
    newMessageFilter(options) {
        return {
            method: 'shh_newMessageFilter',
            params: [options],
            format: identity,
        };
    }
    getFilterMessages(id) {
        return {
            method: 'shh_getFilterMessages',
            params: [id],
            format: identity,
        };
    }
    deleteMessageFilter(id) {
        return {
            method: 'shh_deleteMessageFilter',
            params: [id],
            format: identity,
        };
    }
    post(post) {
        return {
            method: 'shh_post',
            params: [post],
            format: identity,
        };
    }
    unsubscribe(id) {
        return {
            method: 'shh_unsubscribe',
            params: [id],
            format: identity,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hoLXJlcXVlc3QtcGF5bG9hZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2hoL3NoaC1yZXF1ZXN0LXBheWxvYWRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7QUF3QkYsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFFbEMsTUFBTSxrQkFBa0I7SUFDZixVQUFVO1FBQ2YsT0FBTztZQUNMLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLE1BQU0sRUFBRSxRQUFRO1NBQ2pCLENBQUM7SUFDSixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU87WUFDTCxNQUFNLEVBQUUsVUFBVTtZQUNsQixNQUFNLEVBQUUsUUFBUTtTQUNqQixDQUFDO0lBQ0osQ0FBQztJQUVNLGlCQUFpQixDQUFDLElBQVk7UUFDbkMsT0FBTztZQUNMLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2QsTUFBTSxFQUFFLFFBQVE7U0FDakIsQ0FBQztJQUNKLENBQUM7SUFFTSxTQUFTLENBQUMsR0FBVztRQUMxQixPQUFPO1lBQ0wsTUFBTSxFQUFFLGVBQWU7WUFDdkIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2IsTUFBTSxFQUFFLFFBQVE7U0FDakIsQ0FBQztJQUNKLENBQUM7SUFFTSxlQUFlLENBQUMsS0FBYTtRQUNsQyxPQUFPO1lBQ0wsTUFBTSxFQUFFLHFCQUFxQjtZQUM3QixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDZixNQUFNLEVBQUUsUUFBUTtTQUNqQixDQUFDO0lBQ0osQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPO1lBQ0wsTUFBTSxFQUFFLGdCQUFnQjtZQUN4QixNQUFNLEVBQUUsUUFBUTtTQUNqQixDQUFDO0lBQ0osQ0FBQztJQUVNLGFBQWEsQ0FBQyxVQUFrQjtRQUNyQyxPQUFPO1lBQ0wsTUFBTSxFQUFF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