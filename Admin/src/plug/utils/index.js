export default {
    is_S(val,lng,isSatrt){
        if(Object.prototype.toString.call(val) === '[object Object]'){
            return false;
        }
        if(Object.prototype.toString.call(val) === '[object Array]'){
            if(typeof lng === "number"){
                return  val.length < lng;
            }else {
                return  false
            }
        }
        let is_SS = !(val && /^\S{1,}|^\s{1,}\S{1,}/.test(val));
        if(typeof lng === "boolean" || isSatrt === true){
            is_SS = !(val && /\S{1,}/.test(val));
        }
        let result = is_SS || ((val && val.length && typeof val.length == "number" && typeof lng == "number")?(val && val.length && val.length < lng):false);
        return result
    },
}