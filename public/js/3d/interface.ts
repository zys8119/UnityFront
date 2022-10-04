import * as _THREE from 'three';

export const THREE:any = {
    ..._THREE,
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