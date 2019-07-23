export default {
    axiosThen(resultData,data,commit){
        window.__vm__.$vux.loading.hide();
        if(resultData.code != 200){
            window.__vm__.$vux.toast.text(resultData.msg);
            return;
        }
    },
    axiosCatch(resultData,data,commit){
        window.__vm__.$vux.loading.hide();
        window.__vm__.$vux.toast.text(resultData);
    },
}
