import { ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class PortfolioItemTechnology extends ContentItem {

    constructor() {
        super({
            propertyResolver: ((fieldName) => {
                switch (fieldName) {
                    case 'color_with_drop_shadow_icon':
                        return 'colorWithDropShadowIcon';
                    case 'color_icon':
                        return 'colorIcon';
                    case 'large_color_icon':
                        return 'largeColorIcon';
                    case 'black___white_icon':
                        return 'blackWhiteIcon';
                    case 'large_black___white_icon':
                        return 'largeBlackWhiteIcon';
                    case 'technical_and_business_skills':
                        return 'technicalSkill';                    
                    default:
                        //name
                        return fieldName;
                }
            }),
            linkResolver: (link) => resolveContentLink(link)
        })
    }
}