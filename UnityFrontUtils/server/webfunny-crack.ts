import {resolve} from "path";
import {readFileSync, writeFileSync, existsSync} from "fs";
class  webfunnyCrack{
    constructor() {
    }

    static crack(purchaseCodeDate?:string, version?:string){
        const controllers = resolve(process.cwd(),"controllers/controllers.js")
        const purchaseCode = resolve(process.cwd(),"bin/purchaseCode.js");
        if(!existsSync(controllers)){throw new Error(controllers + "不存在")}
        if(!existsSync(purchaseCode)){throw new Error(controllers + "不存在")}
        // 修改控制器激活码校验数据
        const str = readFileSync(controllers).toString();
        const defaultVersion = str
            .replace(/await Utils\[_0xc9a6ce(.|\n)*?if/img,"if")
            .replace(/[^\s]Utils\[_0xf86851(.|\n)*?\{\}\);global/img,";global")
        writeFileSync(controllers, {
            "3.0.57": defaultVersion,
            // @ts-ignore
        }[version] || defaultVersion);
        // 修改激活码
        const defaultPurchaseCodeConfig = `
// 密钥
const keys = {
    '1': 'P',
    '2': 'Z',
    '3': 'D',
    '4': 'W',
    '5': 'U',
    '6': 'B',
    '7': 'S',
    '8': 'M',
    '9': 'G',
    '0': 'K',
}
const purchaseCode = str=>{
    const arr = (str.match(/\\d/img) || []).map(e=>keys[e]);
    return Object.values({
        "19": arr[0],// y1, 并且 19 位值必须为 Z， 故年份的开始位必须位 2yyy-mm-dd 形式
        "12": arr[1],// y2
        "7": arr[2],// y3
        "17": arr[3],// y4
        "10": arr[4],// m1
        "8": arr[5],// m2
        "15": arr[6],// d1
        "1": arr[7],// d2

        // purchaseCodeType 计算,结果必须满足后面等式， 不然就是个人版本限制项目个数， purchaseCode[9].charCodeAt() - purchaseCode[4].charCodeAt() > 3, 默认取最大范围
        "4": "A",// purchaseCodeType 开始 charCodeAt
        "9": "Z",// purchaseCodeType 结束 charCodeAt

        "0": "B",
        "2": "C",
        "3": "D",
        "5": "E",
        "6": "F",
        "11": "G",
        "13": "H",
        "14": "I",
        "16": "J",
        "18": "K",
    }).join("")
}
module.exports = {
  purchaseCode:purchaseCode('${purchaseCodeDate || "2092-04-06"}'),
  secretCode: ''
}
`
        writeFileSync(purchaseCode,{
            "3.0.57": defaultPurchaseCodeConfig,
            // @ts-ignore
        }[version] || defaultPurchaseCodeConfig)
    }
}
export default webfunnyCrack
