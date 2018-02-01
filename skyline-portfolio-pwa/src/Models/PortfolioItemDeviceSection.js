import { ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class PortfolioItemDeviceSection extends ContentItem {

    constructor() {
        super({
            propertyResolver: ((fieldName) => {

                if (fieldName === 'columns') {
                    return 'columns';
                }
            }),
            linkResolver: (link) => resolveContentLink(link)
        })
    }
}