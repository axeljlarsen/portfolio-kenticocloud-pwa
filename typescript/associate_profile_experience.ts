import { ContentItem, Fields } from 'kentico-cloud-delivery-typescript-sdk';

/**
 * This class was generated by 'kentico-cloud-model-generator-utility' module.
 * You can substitute instances of 'IContentItem' with a model defined in other class
 * to get access to all properties. This is applicable only if you know what item type the field contains.
 */
export class AssociateProfileExperience extends ContentItem {
    public industry: Fields.TextField;
    public role: Fields.TextField;
    public startDate: Fields.DateTimeField;
    public endDate: Fields.DateTimeField;
    public product: Fields.TextField;
    public details: Fields.RichTextField;
    
    constructor(){
        super({
            propertyResolver: ((fieldName: string) => {
                
                if (fieldName === 'start_date'){
                    return 'startDate';
                }

                if (fieldName === 'end_date'){
                    return 'endDate';
                }

                return fieldName;
            })
        })    
    }
    
}