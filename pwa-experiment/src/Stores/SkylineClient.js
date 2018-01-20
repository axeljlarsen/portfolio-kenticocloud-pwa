import Client from "../Client.js";
import localForage from "localforage";

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

class SkylineClientStore {

    // Actions
    provideItem(urlSlug) {

        if (itemDetailsPromises[urlSlug]) {
            return;
        }

        itemDetailsPromises[urlSlug] = Client.items()
            .type('client')
            .equalsFilter('elements.friendly_url', urlSlug)
            .orderParameter('system.name')
            .get()
            .subscribe(response => {
                if (response.items.length > 0) {
                    itemDetails[urlSlug] = response.firstItem;
                    notifyChange();
                    initialized = true;
                }
            });
    }

    provideItems(count) {
        if (count <= itemListCapacity || itemList.length > 0) {
            return;
        }

        itemListCapacity = count;

        itemList = Client.items()
            .type('client')
            .get()
            .subscribe(response => {
                if (response.items.length > 0) {
                    itemList = response.items;
                    notifyChange();
                    initialized = true;
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

export default new SkylineClientStore();