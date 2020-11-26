import MD5 from "md5.js"
import lodash from 'lodash'
export default {
    lodash:lodash,
    $$confirm(msg, bool){
        return window._this.$confirm(bool? msg : `确定删除${msg}吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
    },
    // md5 加密
    MD5(str){
        return new MD5().update(str).digest('hex')
    },
    // 登录
    login(data){
        localStorage.clear();
        this.action({
            moduleName:"login",
            goods:{
                code:200,
                data
            }
        });
        localStorage.setItem("login",JSON.stringify({
            code:200,
            data
        }));
        this.$router.push("/");
    },
    // 退出登录
    logout(){
        this.action({
            moduleName:"login",
            goods:null
        });
        this.action({
            moduleName:"tabs",
            goods:null
        });
        localStorage.clear();
        this.$router.push("/login");
    },
    // 设置缓存菜单
    setMenu(data, bool){
        this.action({
            moduleName:"menusInfo",
            goods:null,
        });
        this.action({
            moduleName:"menusInfo",
            goods:data,
        });
        if(!bool){
            this.$router.push(data.path);
            localStorage.setItem("menusInfo",JSON.stringify(data));
            if(!data.children || (data.children && data.children.length === 0)){
                this.$root.$emit("addTabs",data);
            }
        }
    },
    // 获取缓存菜单
    getMenu(){
        let menusInfo = localStorage.getItem("menusInfo");
        try {
            if(menusInfo){
                menusInfo = JSON.parse(menusInfo)
            }
        }catch (e){
            // err
        }
        let menusId = localStorage.getItem("menusId");
        if(menusId){
            this.action({
                moduleName:"menusId",
                goods:menusId,
            });
        }
        if(menusInfo){
            this.$utils.setMenu.call(this,menusInfo, true);
        }
    },
    // 添加外部js
    addJs(src){
        return new Promise(resolve => {
            if(document.getElementById(src)){
                resolve();
                return ;
            }
            const js = document.createElement("script");
            js.id = src;
            js.src = src;
            document.body.appendChild(js)
            js.onload = ()=>{
                setTimeout(()=>{
                    resolve();
                });
            }
            js.onerror = ()=>{
                this.addJs(src).then(()=>{
                    setTimeout(()=> {
                        resolve();
                    });
                })
            }
        })
    },
    isNumber(val){
        return !/^[0-9]*$/.test(val);
    },
    is_S: function (val, lng, isSatrt) {
        if (Object.prototype.toString.call(val) === '[object Object]') {
            return false;
        }
        if (Object.prototype.toString.call(val) === '[object Array]') {
            if (typeof lng === "number") {
                return val.length < lng;
            }
            else {
                return false;
            }
        }
        var is_SS = !(val && /^\S{1,}|^\s{1,}\S{1,}/.test(val));
        if (typeof lng === "boolean" || isSatrt === true) {
            is_SS = !(val && /\S{1,}/.test(val));
        }
        var result = is_SS || ((val && val.length && typeof val.length == "number" && typeof lng == "number") ? (val && val.length && val.length < lng) : false);
        return result;
    },
    isPhone: function (val) {
        return this.is_S(val) || !/^1\d{10}$/.test(val);
    },
    //数字转中文
    number_chinese: function (strObj) {
        //如果数字含有小数部分，那么可以将小数部分单独取出
        //将小数部分的数字转换为字符串的方法：
        var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
        var chnUnitChar = ['', '十', '百', '千'];
        var numToChn = function (num) {
            var index = num.toString().indexOf('.');
            if (index != -1) {
                var str = num.toString().slice(index);
                var a = '点';
                for (var i = 1; i < str.length; i++) {
                    a += chnNumChar[parseInt(str[i])];
                }
                return a;
            }
            else {
                return '';
            }
        };
        //定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
        function sectionToChinese(section) {
            var str = '', chnstr = '', zero = false, count = 0; //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
            while (section > 0) {
                var v = section % 10; //对数字取余10，得到的数即为个位数
                if (v == 0) { //如果数字为零，则对字符串进行补零
                    if (zero) {
                        zero = false; //如果遇到连续多次取余都是0，那么只需补一个零即可
                        chnstr = chnNumChar[v] + chnstr;
                    }
                }
                else {
                    zero = true; //第一次取余之后，如果再次取余为零，则需要补零
                    str = chnNumChar[v];
                    str += chnUnitChar[count];
                    chnstr = str + chnstr;
                }
                count++;
                section = Math.floor(section / 10);
            }
            return chnstr;
        }
        //定义整个数字全部转换的方法，需要依次对数字进行10000为单位的取余，然后分成小节，按小节计算，当每个小节的数不足1000时，则需要进行补零
        function TransformToChinese(num) {
            var a = numToChn(num);
            num = Math.floor(num);
            var unitPos = 0;
            var strIns = '', chnStr = '';
            var needZero = false;
            if (num === 0) {
                return chnNumChar[0];
            }
            while (num > 0) {
                var section = num % 10000;
                if (needZero) {
                    chnStr = chnNumChar[0] + chnStr;
                }
                strIns = sectionToChinese(section);
                strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
                chnStr = strIns + chnStr;
                needZero = (section < 1000) && (section > 0);
                num = Math.floor(num / 10000);
                unitPos++;
            }
            return chnStr + a;
        }
        return TransformToChinese(strObj);
    },
    findPath(options,criteria,optionsOld,parent,resDataAll,childName='children'){
        if(typeof optionsOld == 'string'){
            childName = optionsOld;
            optionsOld = null;
        }
        optionsOld = optionsOld || options;
        let resData = null;
        resDataAll = resDataAll || [];
        options.forEach(item=>{
            if(!resData){
                let bool = true;
                for(let key in criteria){
                    if(Object.prototype.toString.call(criteria[key]) === "[object Function]"){
                        bool = criteria[key](item, options);
                    }else {
                        bool = criteria[key] === item[key];
                    }
                }
                if(bool){
                    resData = item;
                    resDataAll.unshift(item);
                    if(optionsOld && parent){
                        this.findPath(optionsOld,parent,optionsOld,null,resDataAll,childName);
                    }
                }
                if(item[childName] && item[childName].length > 0){
                    this.findPath(item[childName],criteria,optionsOld,item,resDataAll,childName);
                }
            }
        });
        if(resDataAll.length > 0){
            return resDataAll;
        }
        return null;
    },
    getOptions(options,calllback, parent,bool){
        let currentOptions = (bool)?options:this.lodash.cloneDeep(options);
        return currentOptions.map(e=>{
            let keyName = calllback(e, parent);
            if(Object.prototype.toString.call(e[keyName]) === "[object Array]"){
                e[keyName] = this.getOptions(e[keyName],calllback, e, bool)
            }
            return e;
        });
    },
    // 复制处理
    copyToClipboard(txt) {
        let transfer = document.createElement('input');
        document.body.appendChild(transfer);
        transfer.value = txt;  // 这里表示想要复制的内容
        transfer.focus();
        transfer.select();
        if (document.execCommand) {
            document.execCommand('copy');
        }
        transfer.blur();
        this.$message({type:"success",message:"已复制"})
        document.body.removeChild(transfer);
    },
}