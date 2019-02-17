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
const JsonRpc = {
    messageId: 0,
};
const validateSingleMessage = message => !!message &&
    !message.error &&
    message.jsonrpc === '2.0' &&
    (typeof message.id === 'number' || typeof message.id === 'string') &&
    message.result !== undefined;
/**
 * Should be called to valid json create payload object
 */
function createJsonRpcPayload(method, params) {
    JsonRpc.messageId++;
    return {
        jsonrpc: '2.0',
        id: JsonRpc.messageId,
        method,
        params: params || [],
    };
}
exports.createJsonRpcPayload = createJsonRpcPayload;
/**
 * Should be called to check if jsonrpc response is valid
 */
function isValidJsonRpcResponse(response) {
    return Array.isArray(response) ? response.every(validateSingleMessage) : validateSingleMessage(response);
}
exports.isValidJsonRpcResponse = isValidJsonRpcResponse;
/**
 * Should be called to create batch payload object
 */
function createJsonRpcBatchPayload(messages) {
    return messages.map(message => createJsonRpcPayload(message.method, message.params));
}
exports.createJsonRpcBatchPayload = createJsonRpcBatchPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnJwYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm92aWRlcnMvanNvbnJwYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLE1BQU0sT0FBTyxHQUFHO0lBQ2QsU0FBUyxFQUFFLENBQUM7Q0FDYixDQUFDO0FBRUYsTUFBTSxxQkFBcUIsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUN0QyxDQUFDLENBQUMsT0FBTztJQUNULENBQUMsT0FBTyxDQUFDLEtBQUs7SUFDZCxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUs7SUFDekIsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxFQUFFLEtBQUssUUFBUSxJQUFJLE9BQU8sT0FBTyxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUM7SUFDbEUsT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7QUFvQi9COztHQUVHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsTUFBYyxFQUFFLE1BQWM7SUFDakUsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXBCLE9BQU87UUFDTCxPQUFPLEVBQUUsS0FBSztRQUNkLEVBQUUsRUFBRSxPQUFPLENBQUMsU0FBUztRQUNyQixNQUFNO1FBQ04sTUFBTSxFQUFFLE1BQU0sSUFBSSxFQUFFO0tBQ3JCLENBQUM7QUFDSixDQUFDO0FBVEQsb0RBU0M7QUFFRDs7R0FFRztBQUNILFNBQWdCLHNCQUFzQixDQUFDLFFBQWE7SUFDbEQsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNHLENBQUM7QUFGRCx3REFFQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IseUJBQXlCLENBQUMsUUFBOEM7SUFDdEYsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUN2RixDQUFDO0FBRkQsOERBRUMifQ==