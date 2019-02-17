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
const util_1 = require("util");
const legacy_provider_adapter_1 = require("./legacy-provider-adapter");
class IpcProvider extends legacy_provider_adapter_1.LegacyProviderAdapter {
    constructor(path, net) {
        super(new LegacyIpcProvider(path, net));
    }
}
exports.IpcProvider = IpcProvider;
class LegacyIpcProvider {
    constructor(path, net) {
        this.path = path;
        this.responseCallbacks = {};
        this.notificationCallbacks = [];
        this.path = path;
        this.connected = false;
        this.connection = net.connect({ path: this.path });
        this.addDefaultEvents();
        // LISTEN FOR CONNECTION RESPONSES
        const callback = function (result) {
            let id = null;
            // get the id which matches the returned id
            if (util_1.isArray(result)) {
                result.forEach(load => {
                    if (this.responseCallbacks[load.id]) {
                        id = load.id;
                    }
                });
            }
            else {
                id = result.id;
            }
            // notification
            if (!id && result.method.indexOf('_subscription') !== -1) {
                this.notificationCallbacks.forEach(callback => {
                    if (util_1.isFunction(callback)) {
                        callback(result);
                    }
                });
                // fire the callback
            }
            else if (this.responseCallbacks[id]) {
                this.responseCallbacks[id](null, result);
                delete this.responseCallbacks[id];
            }
        };
        this.connection.on('data', data => {
            this._parseResponse(data.toString()).forEach(callback);
        });
    }
    addDefaultEvents() {
        this.connection.on('connect', () => {
            this.connected = true;
        });
        this.connection.on('close', () => {
            this.connected = false;
        });
        this.connection.on('error', () => {
            this._timeout();
        });
        this.connection.on('end', () => {
            this._timeout();
        });
        this.connection.on('timeout', () => {
            this._timeout();
        });
    }
    _parseResponse(data) {
        const returnValues = [];
        // DE-CHUNKER
        const dechunkedData = data
            .replace(/\}[\n\r]?\{/g, '}|--|{') // }{
            .replace(/\}\][\n\r]?\[\{/g, '}]|--|[{') // }][{
            .replace(/\}[\n\r]?\[\{/g, '}|--|[{') // }[{
            .replace(/\}\][\n\r]?\{/g, '}]|--|{') // }]{
            .split('|--|');
        dechunkedData.forEach(data => {
            // prepend the last chunk
            if (this.lastChunk) {
                data = this.lastChunk + data;
            }
            let result = null;
            try {
                result = JSON.parse(data);
            }
            catch (e) {
                this.lastChunk = data;
                // start timeout to cancel all requests
                clearTimeout(this.lastChunkTimeout);
                this.lastChunkTimeout = setTimeout(() => {
                    this._timeout();
                    throw new Error('Timeout');
                }, 1000 * 15);
                return;
            }
            // cancel timeout and set chunk to null
            clearTimeout(this.lastChunkTimeout);
            this.lastChunk = null;
            if (result) {
                returnValues.push(result);
            }
        });
        return returnValues;
    }
    _addResponseCallback(payload, callback) {
        const id = payload.id || payload[0].id;
        const method = payload.method || payload[0].method;
        this.responseCallbacks[id] = callback;
        this.responseCallbacks[id].method = method;
    }
    _timeout() {
        for (const key in this.responseCallbacks) {
            if (this.responseCallbacks.hasOwnProperty(key)) {
                this.responseCallbacks[key](new Error(`CONNECTION ERROR: Couldn't connect to node on IPC.`));
                delete this.responseCallbacks[key];
            }
        }
    }
    reconnect() {
        this.connection.connect({ path: this.path });
    }
    send(payload, callback) {
        // try reconnect, when connection is gone
        if (!this.connection.writable) {
            this.connection.connect({ path: this.path });
        }
        this.connection.write(JSON.stringify(payload));
        this._addResponseCallback(payload, callback);
    }
    on(type, callback) {
        if (typeof callback !== 'function') {
            throw new Error('The second parameter callback must be a function.');
        }
        switch (type) {
            case 'data':
                this.notificationCallbacks.push(callback);
                break;
            // adds error, end, timeout, connect
            default:
                this.connection.on(type, callback);
                break;
        }
    }
    once(type, callback) {
        if (typeof callback !== 'function') {
            throw new Error('The second parameter callback must be a function.');
        }
        this.connection.once(type, callback);
    }
    removeListener(type, callback) {
        switch (type) {
            case 'data':
                this.notificationCallbacks.forEach((cb, index) => {
                    if (cb === callback) {
                        this.notificationCallbacks.splice(index, 1);
                    }
                });
                break;
            default:
                this.connection.removeListener(type, callback);
                break;
        }
    }
    removeAllListeners(type) {
        switch (type) {
            case 'data':
                this.notificationCallbacks = [];
                break;
            default:
                this.connection.removeAllListeners(type);
                break;
        }
    }
    reset() {
        this._timeout();
        this.notificationCallbacks = [];
        this.connection.removeAllListeners('error');
        this.connection.removeAllListeners('end');
        this.connection.removeAllListeners('timeout');
        this.addDefaultEvents();
    }
    disconnect() {
        this.connection.close();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb3ZpZGVycy9pcGMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTs7QUFFRiwrQkFBMkM7QUFFM0MsdUVBQWtFO0FBRWxFLE1BQWEsV0FBWSxTQUFRLCtDQUFxQjtJQUNwRCxZQUFZLElBQVksRUFBRSxHQUFRO1FBQ2hDLEtBQUssQ0FBQyxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDRjtBQUpELGtDQUlDO0FBRUQsTUFBTSxpQkFBaUI7SUFRckIsWUFBb0IsSUFBWSxFQUFFLEdBQVE7UUFBdEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLGtDQUFrQztRQUNsQyxNQUFNLFFBQVEsR0FBRyxVQUFTLE1BQU07WUFDOUIsSUFBSSxFQUFFLEdBQVEsSUFBSSxDQUFDO1lBRW5CLDJDQUEyQztZQUMzQyxJQUFJLGNBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUNuQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVB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