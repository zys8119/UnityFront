import {PathLike} from "fs";

declare module "fs" {
    export function readFileSync<T = string>(path: PathLike | number, options?: { encoding?: null; flag?: string; } | null | T): Buffer & T;
}