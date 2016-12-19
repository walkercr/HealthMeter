export default class Ajax {

    static httpGet(uri, callback) {
        let request = Ajax.buildRequest('GET', uri);
        request.onload = () => Ajax.handleCallback(request, callback);
        request.send();
    }

    static httpPut(uri, body, callback) {
        let request = Ajax.buildRequest('PUT', uri);
        request.onload = () => Ajax.handleCallback(request, callback);
        request.send(JSON.stringify(body));
    }

    static httpPost(uri, body, callback) {
        let request = Ajax.buildRequest('POST', uri);
        request.onload = () => Ajax.handleCallback(request, callback);
        request.send(JSON.stringify(body));
    }

    static httpDelete(uri, callback) {
        let request = Ajax.buildRequest('DELETE', uri);
        request.onload = () => Ajax.handleCallback(request, callback);
        request.send();
    }

    static buildRequest(method, uri) {
        let request = new XMLHttpRequest();
        request.open(method, uri, true);
        request.setRequestHeader('Content-Type', 'application/json');
        return request;
    }

    static handleCallback(request, callback) {
        callback(request.status, request.responseText);
    }
}