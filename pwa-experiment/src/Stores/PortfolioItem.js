import Client from "../Client.js";
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

class PortfolioItemStore {

    // Actions
    providePortfolioItem(portfolioItemSlug) {
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
            }
        }).catch(function (err) {
            console.log(err);
        });

    }

    providePortfolioItems(count) {
        if (count <= portfolioItemListCapacity) {
            return;
        }

        portfolioItemListCapacity = count;
        var systemtype = "portfolio_item";

        Client.getItems({
            "system.type": systemtype,
            "elements": "title,thumbnail_image,post_date,description,friendly_url",
            "order": "elements.post_date[DESC]"
        }).then((response) => {            
            if (response.items.length > 0) {
                portfolioItemList = response.items;
                notifyChange();
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