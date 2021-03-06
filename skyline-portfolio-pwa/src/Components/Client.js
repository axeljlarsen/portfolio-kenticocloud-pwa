// kentico cloud
import { DeliveryClient, DeliveryClientConfig, TypeResolver } from 'kentico-cloud-delivery-typescript-sdk';
import localForage from "localforage";

// models
import { PortfolioItem } from './Models/PortfolioItem'
import { PortfolioItemFeature } from './Models/PortfolioItemFeature'
import { PortfolioItemTechnology } from './Models/PortfolioItemTechnology'
import { PortfolioItemDeviceSection } from './Models/PortfolioItemDeviceSection'
import { PortfolioItemDeviceSectionColumn } from './Models/PortfolioItemDeviceSectionColumn'
import { SkylineClient } from './Models/SkylineClient'
// import { PortfolioItem } from './Models/portfolio_item'
// import { PortfolioItemFeature } from './Models/portfolio_item_feature'
// import { PortfolioItemTechnology } from './Models/portfolio_item_technology'
// import { PortfolioItemDeviceSection } from './Models/portfolio_item_device_section'
// import { PortfolioItemDeviceSectionColumn } from './Models/portfolio_item_device_section_column'
// import { SkylineClient } from './Models/client';


const projectId = "85959714-35a9-4801-a0df-d6386e336d65";
const previewApiKey = "ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAidWlkIjogInVzcl8wdlF1emM0c1FPZ2FGaTExc0xYYW43IiwNCiAgImVtYWlsIjogImFsYXJzZW5Ac2t5bGluZXRlY2hub2xvZ2llcy5jb20iLA0KICAicHJvamVjdF9pZCI6ICI4NTk1OTcxNC0zNWE5LTQ4MDEtYTBkZi1kNjM4NmUzMzZkNjUiLA0KICAianRpIjogIk9udVV5am82Zlk1dGNuWnYiLA0KICAidmVyIjogIjEuMC4wIiwNCiAgImdpdmVuX25hbWUiOiAiQXhlbCIsDQogICJmYW1pbHlfbmFtZSI6ICJMYXJzZW4iLA0KICAiYXVkIjogInByZXZpZXcuZGVsaXZlci5rZW50aWNvY2xvdWQuY29tIg0KfQ.SDQWsk1fI67braexqlH1Hw5JQSsPj7RjgywS2OQPxhM";

// configure type resolvers
let typeResolvers = [
    new TypeResolver('portfolio_item', () => new PortfolioItem()),
    new TypeResolver('portfolio_item_feature', () => new PortfolioItemFeature()),
    new TypeResolver('portfolio_item_technology', () => new PortfolioItemTechnology()),
    new TypeResolver('portfolio_item_device_section', () => new PortfolioItemDeviceSection()),
    new TypeResolver('portfolio_item_device_section_column', () => new PortfolioItemDeviceSectionColumn()),
  new TypeResolver('client', ()=> new SkylineClient())
];


function isPreview() {
    return previewApiKey !== "";
}
/*
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

                //if a specific item was requested
                //loop through and find the item in our values and return it
                if (options["elements.friendly_url"]) {
                    var storedItems = value.items;
                    for (var i = 0; i < value.items.length; i++) {
                        //if the friendly url is the same as the item requested
                        //sort that item to be the first in our value's items array.
                        if (value.items[i].elements.friendly_url.value == options["elements.friendly_url"]) {
                            var first = options["elements.friendly_url"];
                            value.items.sort(function (x, y) { return x.elements.friendly_url.value == first ? -1 : y.elements.friendly_url.value == first ? 1 : 0; });                            
                        }
                    }
                }

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
*/
//export default new Client();

export default new DeliveryClient(
  new DeliveryClientConfig(projectId, typeResolvers,
    {
      enablePreviewMode: isPreview(),
      previewApiKey: previewApiKey
    }
  )
)