import {ControllerInitDataOptions_readdirSyncIgnore} from "../typeStript";

export default <Config>{
    ignore:[
        {name:".git", type:"directory"},
        {name:".idea", type:"directory"},
        {name:"Admin", type:"directory"},
        {name:"Front", type:"directory"},
        {name:"docs", type:"directory"},
        {name:"node_modules", type:"directory"},
        {name:"README", type:"directory"},
    ],
    allFiles:[
        {name:"public", type:"directory"},
        {name:"views", type:"directory"},
    ]
}

export interface Config {
    [key:string]:any;
    ignore:Array<ControllerInitDataOptions_readdirSyncIgnore>;// 忽略配置
    allFiles:Array<ControllerInitDataOptions_readdirSyncIgnore>;// 忽略配置
}