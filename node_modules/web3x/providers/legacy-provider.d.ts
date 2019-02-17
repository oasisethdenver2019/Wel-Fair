export { WebsocketProvider } from './ws';
export { HttpProvider } from './http';
export { IpcProvider } from './ipc';
import { JsonRpcRequest, JsonRpcResponse } from './jsonrpc';
export declare type Callback = (err?: Error, result?: JsonRpcResponse) => void;
export declare type NotificationCallback = (result: any, deprecatedResult?: any) => void;
export interface LegacyProvider {
    send(payload: JsonRpcRequest, callback: Callback): any;
    disconnect(): any;
    on?(type: string, callback: NotificationCallback): any;
    removeListener?(type: string, callback: NotificationCallback): any;
    removeAllListeners?(type: string): any;
    reset?(): any;
}
