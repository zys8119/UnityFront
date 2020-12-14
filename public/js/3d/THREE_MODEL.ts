declare module "THREE_MODEL" {
    // import { Geometry, BufferGeometry, BufferGeometry } from "three"
    namespace THREE_MODEL {
        interface THREE{
            CubeGeometry?(width?:number,height?:number,depth?:number):void;
            OrbitControls?(camera?:number,domElement?:Element):void;
        }
    }
    const THREE:THREE_MODEL.THREE;
    export default THREE;
}