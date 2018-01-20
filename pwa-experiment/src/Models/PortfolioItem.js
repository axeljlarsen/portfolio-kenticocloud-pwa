import { ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class PortfolioItem extends ContentItem {

    constructor() {
        super({
            propertyResolver: ((fieldName) => {

                if (fieldName === 'client') {
                    return 'client';
                }

                if (fieldName === 'title') {
                    return 'title';
                }

                if (fieldName === 'subtitle') {
                    return 'subtitle';
                }

                if (fieldName === 'length_of_engagement') {
                    return 'lengthOfEngagement';
                }

                if (fieldName === 'actual_launch_date') {
                    return 'launchDate';
                }

                if (fieldName === 'description') {
                    return 'description';
                }

                if (fieldName === 'topic') {
                    return 'topic';
                }

                if (fieldName === 'service') {
                    return 'service';
                }

                if (fieldName === 'large_image') {
                    return 'largeImage';
                }

                if (fieldName === 'preview_image') {
                    return 'previewImage';
                }

                if (fieldName === 'thumbnail_image') {
                    return 'thumbnailImage';
                }

                if (fieldName === 'features') {
                    return 'features';
                }

                if (fieldName === 'technologies') {
                    return 'technologies';
                }

                if (fieldName === 'tested_platforms') {
                    return 'testedPlatforms';
                }

                if (fieldName === 'main_highlights_html') {
                    return 'mainHighlightsHtml';
                }

                if (fieldName === 'friendly_url') {
                    return 'friendlyURL';
                }

            }),
            linkResolver: (link) => resolveContentLink(link)
        })
    }

}