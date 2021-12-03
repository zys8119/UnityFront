import {PathLike} from "fs";

declare module "fs" {
    export function readFileSync<T = string>(path: PathLike | number, options?: { encoding?: null; flag?: string; } | null | T): Buffer & T;
}

declare interface PromiseConstructor {
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
}