function createRequest() {
    try {
        request = new XMLHttpRequest();
    } catch (tryMS) {
        request = null;
    }
    return request;
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}