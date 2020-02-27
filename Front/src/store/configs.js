export default {
    axiosThen(resultData,data,commit){
        window.__vm__.$vux.loading.hide();
        if(resultData.code != 200){
            if(resultData.data && resultData.data.sqlMessage){
                window.__vm__.$vux.toast.text(resultData.data.sqlMessage);
                return;
            }
            window.__vm__.$vux.toast.text(resultData.msg);
        }
    },
    axiosCatch(resultData,data,commit){
        window.__vm__.$vux.loading.hide();
        window.__vm__.$vux.toast.text(resultData);
    },
}
