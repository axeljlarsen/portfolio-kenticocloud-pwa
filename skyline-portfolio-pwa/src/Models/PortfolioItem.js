import { ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class PortfolioItem extends ContentItem {
    constructor() {
        super({
            propertyResolver: ((fieldName) => {
                switch (fieldName) {
                    case 'actual_launch_date':
                        return 'actualLaunchDate';
                    case 'device_sections':
                        return 'deviceSections';
                    case 'friendly_url':
                        return 'friendlyUrl';
                    case 'large_image':
                        return 'largeImage';
                    case 'length_of_engagement':
                        return 'lengthOfEngagement';
                    case 'preview_image':
                        return 'previewImage';
                    case 'public_item':
                        return 'publicItem';
                    case 'skyline_case_study_url':
                        return 'skylineCaseStudyUrl';
                    case 'tested_platforms':
                        return 'testedPlatforms';
                    case 'thumbnail_image':
                        return 'thumbnailImage';
                    default:
                        //client, title, subtitle, description, topic, services, features, technologies
                        return fieldName;
                }

            }),
            linkResolver: (link) => resolveContentLink(link)
        })
    }
}