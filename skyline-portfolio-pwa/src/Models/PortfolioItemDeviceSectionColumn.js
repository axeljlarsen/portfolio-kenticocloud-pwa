import { ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class PortfolioItemDeviceSectionColumn extends ContentItem {

    constructor() {
        super({
            propertyResolver: ((fieldName) => {

                if (fieldName === 'class_list') {
                    return 'classList';
                }
                
                if (fieldName === 'content') {
                    return 'content';
                }
            }),
            linkResolver: (link) => resolveContentLink(link)
        })
    }
}