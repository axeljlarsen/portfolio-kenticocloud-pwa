import { ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class PortfolioItemService extends ContentItem {

    constructor() {
        super({
            propertyResolver: ((fieldName) => {
                switch (fieldName) {                  
                    default:
                        //name
                        return fieldName;
                }
            }),
            linkResolver: (link) => resolveContentLink(link)
        })
    }
}