/// <reference types="node" />
export declare function pbkdf2(password: Buffer, salt: Buffer, iterations: number, dklen: number): Promise<Buffer>;
