import Client from "../Client.js";
import localforage from "localforage";

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

    getItemFromStorage(urlSlug) {

        //Access offline storage and assign items to Portfolio Item details list
        localforage.getItem(systemType).then(function (value) {
            if (value != null) {
                console.log('accessed items from offline storage', value);

                //if a specific item was requested
                //loop through and find the item in our values and return it
                if (urlSlug) {
                    var storedItems = JSON.parse(value);
                    for (var i = 0; i < storedItems.length; i++) {
                        //if the friendly url is the same as the item requested
                        //sort that item to be the first in our value's items array.
                        if (storedItems[i].friendlyURL.value == urlSlug) {
                            var first = urlSlug;
                            storedItems.sort(function (x, y) { return x.friendlyURL.value == first ? -1 : y.friendlyURL.value == first ? 1 : 0; });
                        }
                    }
                }

                return storedItems[0];
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

        if (itemDetailsPromises[urlSlug]) {
            return;
        }

        itemDetailsPromises[urlSlug] = Client.items()
            .type(systemType)
            .equalsFilter('elements.friendly_url', urlSlug)
            .orderParameter('system.name')
            .get()
            .subscribe(response => {
                if (response.items.length > 0) {
                    itemDetails[urlSlug] = response.firstItem;
                    notifyChange();
                    initialized = true;
                    this.getItemFromStorage(urlSlug);
                }
            });
    }

    provideItems(count) {
        if (count <= itemListCapacity || itemList.length > 0) {
            return;
        }

        itemListCapacity = count;

        itemList = Client.items()
            .type(systemType)
            .get()
            .subscribe(response => {
                if (response.items.length > 0) {
                    itemList = response.items;
                    notifyChange();
                    initialized = true;
                    this.setItemsToStorage(itemList);
                }
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