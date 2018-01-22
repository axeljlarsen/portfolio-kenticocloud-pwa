import { CloudError } from 'kentico-cloud-delivery-typescript-sdk';
import Client from "../Client.js";
import localforage from "localforage";
import { PortfolioItem } from "../Models/PortfolioItem";

let systemType = "portfolio_item";
let itemList = [];
let itemListCapacity = 0;

let itemDetails = {};
let itemDetailsPromises = {};


let changeListeners = [];
let initialized = false;

let notifyChange = () => {
    changeListeners.forEach((listener) => {
        listener();
    });
}

class PortfolioItemStore {

    // Actions

    getItemsFromStorage() {
        //Access offline storage and assign items to Portfolio Item details list
        localforage.getItem(systemType).then(function (value) {
            if (value != null) {
                console.log('accessed ' + value.length + ' items from offline storage', value);

                //set our itemList object with the value stored by local forage
                itemList = JSON.parse(value);

                //notify the application the itemList has changed
                notifyChange();
            }
        }).catch(function (err) {
            console.log('failed to access items from offline storage', err);
        });
    }

    getItemFromStorage(urlSlug) {

        //Access offline storage and assign items to Portfolio Item details list
        localforage.getItem(systemType).then(function (value) {
            if (value != null) {
                if (urlSlug) {
                    var storedItems = JSON.parse(value);
                    for (var i = 0; i < storedItems.length; i++) {
                        if (storedItems[i].friendlyURL.value == urlSlug) {
                            var first = urlSlug;
                            storedItems.sort(function (x, y) { return x.friendlyURL.value == first ? -1 : y.friendlyURL.value == first ? 1 : 0 });
                        }
                    }
                }

                console.log('accessed ' + storedItems[0].system.name, storedItems[0]);

                //set our itemDetails object with the value stored by local forage                
                //itemDetails[urlSlug] = storedItems[0];
                return storedItems[0];

                //notify the application the itemList has changed
                //notifyChange();
            }
        }).catch(function (err) {
            console.log('failed to access items from offline storage', err);
        });
    }

    setItemsToStorage(items) {
        var uniqueObjs = [];
        var jsonObj = JSON.stringify(items, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (uniqueObjs.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                uniqueObjs.push(value);
            }
            return value;
        });
        uniqueObjs = null; // Enable garbage collection

        localforage.setItem(systemType, jsonObj).then(function () {
        }).then(function (value) {
            // we got our value
            console.log('set', value);
        }).catch(function (err) {
            // we got an error
            console.log(err);
        });
    }

    provideItem(urlSlug) {

        itemDetails[urlSlug] = this.getItemFromStorage(urlSlug);

        if (itemDetails[urlSlug]) {
            let query = Client.items()
                .type(systemType)
                .equalsFilter('elements.friendly_url', urlSlug)
                .orderParameter('system.name')
                .depthParameter(10);
    
            query.get().toPromise().then(response => {
                if (!response.isEmpty) {
                    itemDetails[urlSlug] = response.items[0];
                    initialized = true;
                    notifyChange();
                }
            }).catch(err => {
            });
        }
        notifyChange();        
    }

    provideItems(count) {

        let query = Client.items()
            .type(systemType)
            .depthParameter(10);

        query.get()
            .toPromise()
            .then(response => {
                console.log('get items ', response);
                itemList = response.items;
                this.setItemsToStorage(itemList);
                initialized = true;
                notifyChange();
            })
            .catch(err => {
                console.log('error: ', err);
                this.getItemsFromStorage();
            });
    }

    // Methods

    getItem(urlSlug) {
        return itemDetails[urlSlug];
    }

    getItems(count) {
        return itemList.slice(0, count);
    }

    // Listeners

    addChangeListener(listener) {
        changeListeners.push(listener);
    }

    removeChangeListener(listener) {
        changeListeners = changeListeners.filter((element) => {
            return element !== listener;
        });
    }

}

export default new PortfolioItemStore();