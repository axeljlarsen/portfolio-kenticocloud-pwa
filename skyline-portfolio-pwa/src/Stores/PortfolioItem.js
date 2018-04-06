import { CloudError, SortOrder } from 'kentico-cloud-delivery-typescript-sdk';
import Client from "../Client.js";
import localforage from "localforage";
import { PortfolioItem } from "../Models/PortfolioItem";

let systemType = "portfolio_item";
let depth = 10;
let items = [];
let changeListeners = [];
let techAndBusSkills = [];
let services = [];
let features = [];
let notifyChange = () => {
    changeListeners.forEach((listener) => {
        listener();
    });
}

let fetchTechAndBusSkillsTaxonomyTerms = () => {
    var urlParams = new URLSearchParams(window.location.search);

    var query = Client.taxonomy('technical_and_business_skills');

    query.get()
        .subscribe(response => {
            techAndBusSkills = response.taxonomy.terms;
            notifyChange();
        }, err => {
        });
};
let fetchServiceTaxonomyTerms = () => {
    var urlParams = new URLSearchParams(window.location.search);

    var query = Client.taxonomy('services');

    query.get()
        .subscribe(response => {
            services = response.taxonomy.terms;
            notifyChange();
        }, err => {
        });
}
let fetchFeatures = () => {
    var urlParams = new URLSearchParams(window.location.search);

    var query = Client.items()
        .type('portfolio_item_feature')
        .depthParameter(depth);

    query.get()
        .subscribe(response => {
            features = response.items;
            notifyChange();
        }, err => {
        });
}
let fetchItems = (privateItems) => {
    var urlParams = new URLSearchParams(window.location.search);
    if (!privateItems) privateItems = urlParams.get('private_items') == 1 || urlParams.get('private_items') == '';

    var query = Client.items()
        .type(systemType)
        .orderParameter('elements.actual_launch_date', SortOrder.desc)
        .depthParameter(depth);

    if (privateItems) {
        //if private items should show then show everything i.e. don't apply a filter
    }
    else {
        // else if only public items should show then filter on public_item element.
        // We wrap the 'true' value in an array since public_item is a checkbox control
        // and potentially contains multiple values.
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


export class Filter {
    constructor() {
        this.techAndBusSkills = [];
        this.services = [];
        this.features = [];
    }

    matches(portfolioItem) {
        return this.matchesTechAndBusSkillsTaxonomy(portfolioItem) && this.matchesServicesTaxonomy(portfolioItem);
        //return this.matchesTechnologies(portfolioItem);
    }

    matchesTechAndBusSkillsTaxonomy(portfolioItem) {

        if (this.techAndBusSkills.length === 0) {
            return true;
        }

        // Go through each technology assigned to the portfolio item
        // and push the codename of the taxonomy term assigned to that technology
        // to an array. Use that array to determine if the portfolio item
        // matches a skill to the filter's selected criteria.
        let portItemSkills = [];
        portfolioItem.technologies.forEach(({ technicalSkill }) =>
            technicalSkill.value.forEach(({ codename }) =>
                portItemSkills.push(codename)));

        return this.techAndBusSkills.some(x => portItemSkills.includes(x));
    }

    matchesServicesTaxonomy(portfolioItem) {

        if (this.services.length === 0) {
            return true;
        }

        let terms = [];

        if (portfolioItem.services.length ) {
            portfolioItem.services.forEach(({services}) => 
               services.value.forEach(({codename}) =>
                    terms.push(codename)));
            //terms.push(portfolioItem.services[0].services.value[0].codename);
            return this.services.some(x => terms.includes(x));
        }

        return true;
    }

    matchesFeatures(portfolioItem) {

        if (this.features.length === 0) {
            return true;
        }

        // Go through each technology assigned to the portfolio item
        // and push the codename to an array. Use that array to determine if the portfolio item
        // matches a skill to the filter's selected criteria.
        let terms = [];
        portfolioItem.features.forEach(({ system }) => terms.push(system.codename));

        return this.features.some(x => terms.includes(x));
    }

    toggleTechAndBusSkills(terms, filter) {
        let that = filter || this;
        let index = that.techAndBusSkills.indexOf(terms);
        if (index < 0) {
            that.techAndBusSkills.push(terms);
        }
        else {
            that.techAndBusSkills.splice(index, 1);
        }
    }
    toggleServices(terms, filter) {
        let that = filter || this;
        let index = that.services.indexOf(terms);
        if (index < 0) {
            that.services.push(terms);
        }
        else {
            that.services.splice(index, 1);
        }
    }
    toggleFeatures(terms, filter) {
        let that = filter || this;
        let index = that.features.indexOf(terms);
        if (index < 0) {
            that.features.push(terms);
        }
        else {
            that.features.splice(index, 1);
        }
    }

}

let portfolioFilter = new Filter();
class PortfolioItemStore {

    // Actions

    provideItem(urlSlug) {
        fetchItems(true);
    }

    provideItems(count) {
        fetchItems();
    }

    provideTechAndBusSkills() {
        fetchTechAndBusSkillsTaxonomyTerms();
    }

    provideServices() {
        fetchServiceTaxonomyTerms();
    }

    provideFeatures() {
        fetchFeatures();
    }

    // Methods
 
    getItem(urlSlug) {
        return items.find((item) => item.friendlyUrl.value === urlSlug);
    }

    getItems(count) {
        return items.slice(0, count);
    }

    getTechAndBusSkills() {
        return techAndBusSkills;
    }

    getServices() {
        return services;
    }

    getFeatures() {
        return features;
    }

    getFilter() {
        return portfolioFilter;
    }

    setFilter(filter) {
        portfolioFilter = filter;
        notifyChange();
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