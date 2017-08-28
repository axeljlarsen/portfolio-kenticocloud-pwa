import localForage from "localforage";

const projectId = "85959714-35a9-4801-a0df-d6386e336d65";
const previewApiKey = "ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAidWlkIjogInVzcl8wdlF1emM0c1FPZ2FGaTExc0xYYW43IiwNCiAgImVtYWlsIjogImFsYXJzZW5Ac2t5bGluZXRlY2hub2xvZ2llcy5jb20iLA0KICAicHJvamVjdF9pZCI6ICI4NTk1OTcxNC0zNWE5LTQ4MDEtYTBkZi1kNjM4NmUzMzZkNjUiLA0KICAianRpIjogIk9udVV5am82Zlk1dGNuWnYiLA0KICAidmVyIjogIjEuMC4wIiwNCiAgImdpdmVuX25hbWUiOiAiQXhlbCIsDQogICJmYW1pbHlfbmFtZSI6ICJMYXJzZW4iLA0KICAiYXVkIjogInByZXZpZXcuZGVsaXZlci5rZW50aWNvY2xvdWQuY29tIg0KfQ.SDQWsk1fI67braexqlH1Hw5JQSsPj7RjgywS2OQPxhM";

function isPreview() {
    return previewApiKey !== "";
}

function getBaseUrl() {
    if (isPreview()) {
        return "https://preview-deliver.kenticocloud.com/";
    }

    return "https://deliver.kenticocloud.com/";
}

function getHeaders() {
    const headers = {};
    if (isPreview()) {
        headers["Authorization"] = "Bearer " + previewApiKey;
    }

    return new Headers(headers);
}

function getJsonContent(relativeUrl, options) {
    let url = getBaseUrl() + projectId + "/" + relativeUrl;
    const headers = getHeaders();

    if (options) {
        let parameters = Object.getOwnPropertyNames(options).map((name) => encodeURIComponent(name) + "=" + encodeURIComponent(options[name]));
        if (parameters.length > 0) {
            url = url + "?" + parameters.join("&");
        }
    }

    const context = {
        headers: headers,
    };

    return fetch(url, context).then(checkStatus).then((response) => {
        var jsonData = response.json();

        //Store the general portfolio items list
        localForage.setItem(options["system.type"], jsonData).then(function (value) {
            console.log('set', value);
        }).catch(function (err) {
            console.log(err);
            });

        return jsonData;

    }).catch((err) => {
        console.log(err);

        //Access offline storage and assign items to Portfolio Item details list
        return localForage.getItem(options["system.type"]).then(function (value) {
            if (value != null) {
                console.log('accessed items from offline storage', value);
                return value;
            }
        }).catch(function (err) {
            console.log('failed to access items from offline storage', err);
        });
    });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = "HTTP error " + response.status + ": " + response.statusText;
    console.log(error); // eslint-disable-line no-console
    throw error;
}

class Client {

    getItem(codename, options) {
        return getJsonContent("items/" + encodeURIComponent(codename), options);
    }

    getItems(options) {
        return getJsonContent("items", options).then(function (response) {
            return response;
        }).catch(function (err) {
            console.log('error getting items',err);
        });
    }

    getType(codename, options) {
        return getJsonContent("types/" + encodeURIComponent(codename), options);
    }
}

export default new Client();