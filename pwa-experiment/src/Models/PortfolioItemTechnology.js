import { ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class PortfolioItemTechnology extends ContentItem {

    constructor() {
        super({
            propertyResolver: ((fieldName) => {

                if (fieldName === 'color_with_drop_shadow_icon') {
                    return 'colorWithDropShadowIcon';
                }
                if (fieldName === 'color_icon') {
                    return 'colorIcon';
                }

                if (fieldName === 'large_color_icon') {
                    return 'largeColorIcon';
                }

                if (fieldName === 'black___white_icon') {
                    return 'blackWhiteIcon';
                }

                if (fieldName === 'large_black___white_icon') {
                    return 'largeBlackWhiteIcon';
                }

                if (fieldName === 'technical_and_business_skills') {
                    return 'technicalSkill';
                }
            }),
            linkResolver: (link) => resolveContentLink(link)
        })
    }
}