import * as _THREE from 'three';
import THREE_MODEL from 'THREE_MODEL';

export const THREE = {
    ..._THREE,
    ...THREE_MODEL
}
export type addCubeGeometryType = {
    width:number;
    height:number;
    depth?:number;
    x?:number;
    y?:number;
    z?:number;
    color?:string|number;
}
export interface initContentInterface {
    addCubeGeometry(data:addCubeGeometryType):void;
}