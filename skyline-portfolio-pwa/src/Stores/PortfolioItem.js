import { CloudError } from 'kentico-cloud-delivery-typescript-sdk';
import Client from "../Client.js";
import localforage from "localforage";
import { PortfolioItem } from "../Models/PortfolioItem";

let systemType = "portfolio_item";
let depth = 10;
let items = [];
let changeListeners = [];

let notifyChange = () => {
    changeListeners.forEach((listener) => {
        listener();
    });
}

let fetchItems = () => {    
    var urlParams = new URLSearchParams(window.location.search);
    var privateItems = urlParams.get('private_items') == 1 || urlParams.get('private_items') == ''; 

    var query = Client.items()
        .type(systemType)
        .depthParameter(depth);

    if (privateItems) {
        //if private items should show then show everything   
    }
    else {
        //else if only public items should show then filter on public_item element
        query.containsFilter('elements.public_item', ['true']); // public items
    }

    query.get()
        .subscribe(response => {
            items = response.items;
            setItemsToStorage(items);
            notifyChange();
        }, err => {
            getItemsFromStorage();
        });
}

let getItemsFromStorage = () => {
    localforage.getItem(systemType).then(function (value) {
        if (value != null) {

            //set our items object with the value stored by local forage
            items = JSON.parse(value);
        }
    }).catch(function (err) {
        //alert('failed to access items from offline storage');
        console.error('Portfolio Item Store: failed to access items from offline storage');
    });
}

let setItemsToStorage = (items) => {
    var uniqueObjs = [];
    var objectToStore = JSON.stringify(items, function (key, value) {
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

    localforage.setItem(systemType, objectToStore);
}

class PortfolioItemStore {

    // Actions

    provideItem(urlSlug) {
        fetchItems();
    }

    provideItems(count) {
        fetchItems();
    }

    // Methods

    getItem(urlSlug) {
        //return itemDetails[urlSlug];        
        return items.find((item) => item.friendlyUrl.value === urlSlug);
    }

    getItems(count) {
        return items.slice(0, count);
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