/**
 * URLパラメータを取得
 * @method getURLParamsObject
 */
KS.getURLParamsObject = function () {
    var vars = null;
    var hash;
    var index = window.location.href.indexOf('?');
    if (index != -1) {
        vars = {};
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            if (hash[0] != "") vars[hash[0]] = decodeURI(hash[1]);
        }
    }
    return vars;
};
/**
 * URLパラメータをオブジェクト配列で取得
 * @method getURLParamArray
 */
KS.getURLParamArray =function(){
    var result ;
    var hash;
    var index = window.location.href.indexOf('?');
    if (index != -1) {
        result =[];
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            var obj = {};
            obj[hash[0]] =  decodeURI(hash[1]);
            result.push(obj);
        }
    }
    return result;
}

/**
 * objectをurl param形式にする
 *
 * @method convertObjectToURLParams
 * @param obj {Object}
 */
KS.convertObjectToURLParams = function (obj) {
    var param_str = null;
    if (obj != null && obj != undefined) {
        param_str = _.map(_.keys(obj).sort(), function (key) {
            return key + '=' + obj[key];
        }).join('&');
    }
    ;
    return param_str
}

/**
 * URLパラメータ形式stringをobjectに変換
 *
 * @method convertObjectByURLParam
 * @param query_str
 * @returns {*}
 */
KS.convertObjectByURLParam = function (query_str) {
    var obj;
    if (query_str) {
        obj = {}
        var hashes = query_str.split('&');
        for (var i = 0; i < hashes.length; i++) {
            var hash = hashes[i].split('=');
            if (hash[0] != "") obj[hash[0]] = hash[1];
        }
    }
    return obj;
};

/**
 * ゼロパディング。
 * 指定桁数になるように左側に0を埋めた数値文字列を返す
 *
 * @method zeroPadding
 * @param num {number} 数値
 * @param row  {number} 何桁にしたいか
 * @returns {string}
 */
KS.zeroPadding = function (num, row) {
    var len = String(num).length;
    var diff = row - len;
    if (diff <= 0) return String(num);
    var zeros = "";
    for (var i = 0; i < diff; i++) {
        zeros += "0"
    }
    return zeros + String(num)
};


/**
 * 改行や空白スペースを削除して空文字かどうかチェックする
 * @param str
 * @returns {boolean}
 */
KS.isEmpty = function (str) {
    if (!str) return true;
    var val = str;
    val = val.replace(/\n|\s+/g, "");
    return val == ""
}

/**
 * 特殊文字("<"と">")をHTMLエンティティに変換する
 * @param str
 */
KS.encodeHtmlSpecialChars = function (str) {
    if (!str) {
        return null
    }
    return str.replace(/[<>]/g, function ($0) {
        if ($0 == "<")  return '&lt;';
        if ($0 == ">")  return '&gt;';
    });
};

/**
 * 特殊なHTMLエンティティ("<"と">")を文字に戻す
 * @param str
 */
KS.decodeHtmlSpecialChars = function (str) {
    return str.replace(/&(gt|lt);/ig, function ($0, $1) {
        if (/^gt$/i.test($1))   return ">";
        if (/^lt$/i.test($1))   return "<";
    });
};


KS.UA = (function(u){
    return {
        Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
        || u.indexOf("ipad") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
        || u.indexOf("kindle") != -1
        || u.indexOf("silk") != -1
        || u.indexOf("playbook") != -1,
        Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
        || u.indexOf("iphone") != -1
        || u.indexOf("ipod") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
        || u.indexOf("blackberry") != -1
    }
})(window.navigator.userAgent.toLowerCase());