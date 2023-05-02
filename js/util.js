function getDocumentHeight(){
    const body = document.body,
        html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}