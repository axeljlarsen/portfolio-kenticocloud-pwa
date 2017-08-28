import Client from "../Client.js";
import { reactLocalStorage } from 'reactjs-localstorage';
import localForage from "localforage";

let portfolioItemList = [];
let portfolioItemListCapacity = 0;

let portfolioItemDetails = {};
let portfolioItemDetailsPromises = {};

let changeListeners = [];

let notifyChange = () => {
    changeListeners.forEach((listener) => {
        listener();
    });

}

let storageKey = {
    portfolioItems: 'portfolioItems',
    foragePortfolioItems: 'foragePortfolioItems'
}

let updatePortfolioItemsOfflineStore = () => {
    var listToStore = [];
    for (var i = 0; i < portfolioItemList.length; i++) {
        var key = portfolioItemList[i].elements.friendly_url.value;
        listToStore[key] = portfolioItemList[i];
    }
    //reactLocalStorage.setObject(storageKey.portfolioItems, listToStore);
    localForage.setItem(storageKey.foragePortfolioItems, listToStore).then(function (value) {
        console.log('set', value);
    }).catch(function (err) {
        console.log(err);
    });
}

class PortfolioItemStore {

    // Actions

    providePortfolioItem(portfolioItemSlug) {
        //var storedList = reactLocalStorage.getObject(storageKey.portfolioItems);
        var storedList = localForage.getItem(storageKey.foragePortfolioItems).then(function (value) {
            if (value != null && value[portfolioItemSlug]) {
                console.log('get', value);
                portfolioItemDetails[portfolioItemSlug] = value[portfolioItemSlug];
                return value[portfolioItemSlug];
            }
            else {
                if (portfolioItemDetailsPromises[portfolioItemSlug]) {
                    return;
                }

                portfolioItemDetailsPromises[portfolioItemSlug] = Client.getItems({
                    "system.type": "portfolio_item",
                    "elements.friendly_url": portfolioItemSlug
                }).then((response) => {
                    if (response.items.length > 0) {
                        portfolioItemDetails[portfolioItemSlug] = response.items[0];
                        notifyChange();
                        updatePortfolioItemsOfflineStore();
                    }
                });
            }
        }).catch(function (err) {
            console.log(err);
        });

    }

    providePortfolioItems(count) {
        //var storedList = reactLocalStorage.getObject(storageKey.portfolioItems);
        var storedList = localForage.getItem(storageKey.foragePortfolioItems).then(function (value) {
            if (value != null ) {
                console.log('get', value);
                portfolioItemList = value;
                return value;
            }
            else {
                if (count <= portfolioItemListCapacity) {
                    return;
                }

                portfolioItemListCapacity = count;

                Client.getItems({
                    "system.type": "portfolio_item",
                    "elements": "title,thumbnail_image,post_date,description,friendly_url",
                    "order": "elements.post_date[DESC]"
                }).then((response) => {
                    portfolioItemList = response.items;
                    notifyChange();
                    updatePortfolioItemsOfflineStore();
                });
            }
        }).catch(function (err) {
            console.log(err);
        });


    }

    // Methods

    getPortfolioItem(portfolioItemSlug) {
        return portfolioItemDetails[portfolioItemSlug];
    }

    getPortfolioItems(count) {
        return portfolioItemList.slice(0, count);
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