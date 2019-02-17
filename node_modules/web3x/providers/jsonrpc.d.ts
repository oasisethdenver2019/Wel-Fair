export interface JsonRpcRequest {
    jsonrpc: string;
    method: string;
    params: any[];
    id: number;
}
export interface JsonRpcResponse {
    jsonrpc: string;
    id: number;
    result?: any;
    error?: {
        code: number;
        message: string;
        data?: any;
    };
}
/**
 * Should be called to valid json create payload object
 */
export declare function createJsonRpcPayload(method: string, params?: any[]): JsonRpcRequest;
/**
 * Should be called to check if jsonrpc response is valid
 */
export declare function isValidJsonRpcResponse(response: any): boolean;
/**
 * Should be called to create batch payload object
 */
export declare function createJsonRpcBatchPayload(messages: {
    method: string;
    params?: any[];
}[]): JsonRpcRequest[];
