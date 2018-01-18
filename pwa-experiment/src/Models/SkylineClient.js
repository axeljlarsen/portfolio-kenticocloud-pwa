import { ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class SkylineClient extends ContentItem {

    constructor() {
        super({
            propertyResolver: ((fieldName) => {

                if (fieldName === 'name') {
                    return 'name';
                }

                if (fieldName === 'nickname') {
                    return 'nickname';
                }

                if (fieldName === 'description') {
                    return 'description';
                }

                if (fieldName === 'partnership_start_date') {
                    return 'partnershipStartDate';
                }

                if (fieldName === 'industries') {
                    return 'industries';
                }
            }),
            linkResolver: (link) => resolveContentLink(link)
        })
    }
}