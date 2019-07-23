"use strict";
exports.__esModule = true;
var a = /** @class */ (function () {
    function a(postData) {
        var postDataObject = {};
        postData = postData.replace(/\r\n\r/img, "=>");
        // 去掉转义字符
        postData = postData.replace(/[\/\b\f\n\r\t]/g, '');
        // 去掉特殊字符
        postData = postData.replace(/[\@\#\$\%\^\&\*\(\)\{\}\:\L\<\>\?\[\]]/, "");
        postData
            .replace(/-{6}(.|\n)*?(form-data;|-{2})/img, '').split("name=")
            .filter(function (e) { return e.replace(/\s/img, "").length > 0; })
            .forEach(function (e) {
            var arr = e.split("=>");
            var keyName = arr[0];
            var keyNameMatch = keyName.match(/\[.*\]/img);
            if (keyNameMatch) {
                keyName = keyName.replace(/\[.*?\]/img, "");
            }
            keyName = keyName.replace(/\'|\"/img, "");
            try {
                var evalval = null;
                eval("evalval = " + arr[1]);
                if (keyNameMatch && keyNameMatch.length > 0) {
                    try {
                        postDataObject[keyName] = postDataObject[keyName] || [];
                        keyNameMatch[0].split("][").forEach(function (e) {
                            var index = e.replace(/\[|\]/img, "");
                            postDataObject[keyName][index] = postDataObject[keyName][index] || [];
                            return e;
                        });
                        eval("postDataObject[\"" + keyName + "\"]" + keyNameMatch[0] + " = " + arr[1]);
                    }
                    catch (e) { }
                    return;
                }
                postDataObject[keyName] = evalval;
            }
            catch (err) {
                if (keyNameMatch && keyNameMatch.length > 0) {
                    try {
                        console.log(postDataObject[keyName]);
                        postDataObject[keyName] = postDataObject[keyName] || [];
                        keyNameMatch[0].split("][").forEach(function (e) {
                            var index = e.replace(/\[|\]/img, "");
                            postDataObject[keyName][index] = postDataObject[keyName][index] || [];
                            return e;
                        });
                        eval("postDataObject[\"" + keyName + "\"]" + keyNameMatch[0] + " = \"" + arr[1] + "\"");
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                    return;
                }
                postDataObject[keyName] = arr[1];
            }
            ;
        });
        return postDataObject;
    }
    return a;
}());
exports["default"] = a;
