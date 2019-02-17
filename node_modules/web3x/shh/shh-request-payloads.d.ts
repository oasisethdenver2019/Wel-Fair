interface SubscriptionOptions {
    symKeyID: string;
    privateKeyID: string;
    sig?: string;
    topics?: string[];
    minPow?: number;
    allowP2P?: boolean;
}
interface Post {
    symKeyID?: string;
    pubKey?: string;
    sig?: string;
    ttl: number;
    topic: string;
    payload: string;
    padding?: number;
    powTime?: number;
    powTarget?: number;
    targetPeer?: number;
}
declare const identity: (result: any) => any;
declare class ShhRequestPayloads {
    getVersion(): {
        method: string;
        format: (result: any) => any;
    };
    getInfo(): {
        method: string;
        format: (result: any) => any;
    };
    setMaxMessageSize(size: number): {
        method: string;
        params: number[];
        format: (result: any) => any;
    };
    setMinPoW(pow: number): {
        method: string;
        params: number[];
        format: (result: any) => any;
    };
    markTrustedPeer(enode: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    newKeyPair(): {
        method: string;
        format: (result: any) => any;
    };
    addPrivateKey(privateKey: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    deleteKeyPair(id: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    hasKeyPair(id: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    getPublicKey(id: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    getPrivateKey(id: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    newSymKey(): {
        method: string;
        format: (result: any) => any;
    };
    addSymKey(symKey: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    generateSymKeyFromPassword(password: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    hasSymKey(id: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    getSymKey(id: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    deleteSymKey(id: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    newMessageFilter(options: SubscriptionOptions): {
        method: string;
        params: SubscriptionOptions[];
        format: (result: any) => any;
    };
    getFilterMessages(id: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    deleteMessageFilter(id: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
    post(post: Post): {
        method: string;
        params: Post[];
        format: (result: any) => any;
    };
    unsubscribe(id: string): {
        method: string;
        params: string[];
        format: (result: any) => any;
    };
}
