import { encryptOptions } from "../typeStript"
export default class encrypt implements encryptOptions{
    key:string;
    constructor(newKey?:string){
        this.key = newKey || "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
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
            if(code < 100000){
                return code+100000;
            };
            return code;
        })(e.charCodeAt(0)))).join("")
    }

    decode(str){
        return JSON.parse(String.fromCharCode.apply(null,str.match(/\w{6}/img).map(e=>this.decodeItem(e) - 100000)));
    }

    decodeWsFrame(data) {
        let start = 0;
        let frame:any = {
            isFinal: (data[start] & 0x80) === 0x80,
            opcode: data[start++] & 0xF,
            masked: (data[start] & 0x80) === 0x80,
            payloadLen: data[start++] & 0x7F,
            maskingKey: '',
            payloadData: null
        };

        if (frame.payloadLen === 126) {
            frame.payloadLen = (data[start++] << 8) + data[start++];
        } else if (frame.payloadLen === 127) {
            frame.payloadLen = 0;
            for (let i = 7; i >= 0; --i) {
                frame.payloadLen += (data[start++] << (i * 8));
            }
        }

        if (frame.payloadLen) {
            if (frame.masked) {
                const maskingKey = [
                    data[start++],
                    data[start++],
                    data[start++],
                    data[start++]
                ];

                frame.maskingKey = maskingKey;

                frame.payloadData = data
                    .slice(start, start + frame.payloadLen)
                    .map((byte, idx) => byte ^ maskingKey[idx % 4]);
            } else {
                frame.payloadData = data.slice(start, start + frame.payloadLen);
            }
        }
        return frame;
    }

    encodeWsFrame(data) {
        const isFinal = data.isFinal !== undefined ? data.isFinal : true,
            opcode = data.opcode !== undefined ? data.opcode : 1,
            payloadData = data.payloadData ? Buffer.from(data.payloadData) : null,
            payloadLen = payloadData ? payloadData.length : 0;

        let frame = [];

        if (isFinal) frame.push((1 << 7) + opcode);
        else frame.push(opcode);

        if (payloadLen < 126) {
            frame.push(payloadLen);
        } else if (payloadLen < 65536) {
            frame.push(126, payloadLen >> 8, payloadLen & 0xFF);
        } else {
            frame.push(127);
            for (let i = 7; i >= 0; --i) {
                frame.push((payloadLen & (0xFF << (i * 8))) >> (i * 8));
            }
        }

        frame = payloadData ? Buffer.concat([Buffer.from(frame), payloadData]) : Buffer.from(frame);
        return frame;
    }

    parseHeader(str) {
        // 将请求头数据按回车符切割为数组，得到每一行数据
        let arr = str.split('\r\n').filter(item => item)

        // 第一行数据为GET / HTTP/1.1，可以丢弃。
        arr.shift()

        let headers = {}  // 存储最终处理的数据

        arr.forEach((item) => {
            // 需要用":"将数组切割成key和value
            let [name, value] = item.split(':')

            // 去除无用的空格，将属性名转为小写
            name = name.replace(/^\s|\s+$/g, '').toLowerCase()
            value = value.replace(/^\s|\s+$/g, '')

            // 获取所有的请求头属性
            headers[name] = value
        })

        return headers
    }
}
