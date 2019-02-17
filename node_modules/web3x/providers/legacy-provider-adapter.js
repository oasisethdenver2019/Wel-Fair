"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const jsonrpc_1 = require("./jsonrpc");
class LegacyProviderAdapter {
    constructor(provider) {
        this.provider = provider;
        this.eventEmitter = new events_1.EventEmitter();
    }
    subscribeToLegacyProvider() {
        if (!this.provider.on) {
            throw new Error('Legacy provider does not support subscriptions.');
        }
        this.provider.on('data', (result, deprecatedResult) => {
            result = result || deprecatedResult;
            if (!result.method) {
                return;
            }
            this.eventEmitter.emit('notification', result.params);
        });
    }
    send(method, params) {
        return new Promise((resolve, reject) => {
            const payload = jsonrpc_1.createJsonRpcPayload(method, params);
            this.provider.send(payload, (err, message) => {
                if (err) {
                    return reject(err);
                }
                if (!message) {
                    return reject(new Error('No response.'));
                }
                if (!jsonrpc_1.isValidJsonRpcResponse(message)) {
                    const msg = message.error && message.error.message
                        ? message.error.message
                        : 'Invalid JSON RPC response: ' + JSON.stringify(message);
                    return reject(new Error(msg));
                }
                const response = message;
                if (response.error) {
                    const message = response.error.message ? response.error.message : JSON.stringify(response);
                    return reject(new Error('Returned error: ' + message));
                }
                if (response.id && payload.id !== response.id) {
                    return reject(new Error(`Wrong response id ${payload.id} != ${response.id} in ${JSON.stringify(payload)}`));
                }
                resolve(response.result);
            });
        });
    }
    on(notification, listener) {
        if (notification !== 'notification') {
            throw new Error('Legacy providers only support notification event.');
        }
        if (this.eventEmitter.listenerCount('notification') === 0) {
            this.subscribeToLegacyProvider();
        }
        this.eventEmitter.on('notification', listener);
        return this;
    }
    removeListener(notification, listener) {
        if (!this.provider.removeListener) {
            throw new Error('Legacy provider does not support subscriptions.');
        }
        if (notification !== 'notification') {
            throw new Error('Legacy providers only support notification event.');
        }
        this.eventEmitter.removeListener('notification', listener);
        if (this.eventEmitter.listenerCount('notification') === 0) {
            this.provider.removeAllListeners('data');
        }
        return this;
    }
    removeAllListeners(notification) {
        this.eventEmitter.removeAllListeners('notification');
        if (this.provider.removeAllListeners) {
            this.provider.removeAllListeners('data');
        }
    }
}
exports.LegacyProviderAdapter = LegacyProviderAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LXByb3ZpZGVyLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvdmlkZXJzL2xlZ2FjeS1wcm92aWRlci1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXNDO0FBRXRDLHVDQUEwRjtBQUcxRixNQUFhLHFCQUFxQjtJQUdoQyxZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUZwQyxpQkFBWSxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFDO0lBRUssQ0FBQztJQUV4Qyx5QkFBeUI7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztTQUNwRTtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQVcsRUFBRSxnQkFBc0IsRUFBRSxFQUFFO1lBQy9ELE1BQU0sR0FBRyxNQUFNLElBQUksZ0JBQWdCLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sSUFBSSxDQUFDLE1BQWMsRUFBRSxNQUFjO1FBQ3hDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxPQUFPLEdBQUcsOEJBQW9CLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxHQUFH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