import { ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class PortfolioItemFeature extends ContentItem {

    constructor() {
        super({
            propertyResolver: ((fieldName) => {

                if (fieldName === 'caption') {
                    return 'caption';
                }

                if (fieldName === 'icon') {
                    return 'icon';
                }
            }),
            linkResolver: (link) => resolveContentLink(link)
        })
    }
}