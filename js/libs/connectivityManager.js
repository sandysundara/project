function connectivityManager() {
    this.accessToken;
}
connectivityManager.prototype.doGet = function(url, params, fnSuccessCallback) {
    var sReqUrl = url + "?" + "params";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            fnSuccessCallback(xhr.responseText);
        }

    };

    xhr.open("GET", url + '?' + params, true);
    xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
    xhr.send();

};

connectivityManager.prototype.fetchAccessToken = function() {
    var APPID = "163121800698753";
    var APP_SECRET = "0c2d352625f6128043736538343e3fd0";

    function fnSuccessCallBack(responseText) {
        var AccessToken = responseText.split("access_token=");
        if (AccessToken.length === 2) {
            oAppUtils.ConnectivityManager.setAccessToken(AccessToken[1]);
        }
    }
    oAppUtils.ConnectivityManager.doGet("https://graph.facebook.com/oauth/access_token", "client_id=" + APPID + "&client_secret=" + APP_SECRET + "&grant_type=client_credentials", fnSuccessCallBack);
}


connectivityManager.prototype.setAccessToken = function(sToken) {
    this.accessToken = sToken;
}


connectivityManager.prototype.getAccessToken = function(sToken) {
    return this.accessToken;
}


oAppUtils.ConnectivityManager = new connectivityManager();