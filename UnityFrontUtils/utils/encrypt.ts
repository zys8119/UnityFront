import { encryptOptions } from "../typeStript"
export default class encrypt implements encryptOptions{
    key:string;
    constructor(newKey?:string){
        this.key = newKey || "lWIbMmw1xrKscZL0R8kA7DUF4Hgij6OSV2hqyadpfNeGCzQTEJBX9Yn3Ptuo5v";
    }

    encodeItem(id)
    {
        var chars = this.key;
        var resutl = '';
        for (var i = 0; i < 6; i++) {
            var chr:any = id % 62;
            resutl = chars[(i * 3 + parseInt(chr)) % 62] + resutl;
            id = id / 62;
        }
        return resutl;
    }

    decodeItem(str)
    {
        var chars = this.key;
        var pow = [1, 62, 3844, 238328, 14776336, 916132832];
        var resutl:any = '';
        for (var i = 0; i < 6; i++) {
            var num = (62 + chars.indexOf(str[i]) - (5 - i) * 3) % 62;
            resutl = (+resutl) + num * pow[5 - i];
        }
        return resutl;
    }
    encode(data){
        return JSON.stringify(data).split("").map(e=>this.encodeItem((code=>{
            if(code < 1000){
                return code+100000;
            };
            return code;
        })(e.charCodeAt(0)))).join("")
    }

    decode(str){
        return JSON.parse(String.fromCharCode.apply(null,str.match(/\w{6}/img).map(e=>this.decodeItem(e) - 100000)));
    }
}