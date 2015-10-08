oAppUtils = {};
oAppUtils.FavObject = {};


includeScript("js/libs/connectivityManager.js", "text/javascript");

function initializaApp() {
    oAppUtils.ConnectivityManager.fetchAccessToken();
    if (!window.localStorage.getItem("FavObject")) {
        oAppUtils.FavObject = {};

    } else {
        oAppUtils.FavObject = JSON.parse(window.localStorage.getItem("FavObject"));
    }

}

function includeScript(jsFilePath, type) {

    var js = document.createElement("script");
    js.type = type;
    js.src = jsFilePath;
    document.body.appendChild(js);
    js.onload = function() {
        initializaApp();
    };


}