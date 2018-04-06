// kentico cloud
import { DeliveryClient, DeliveryClientConfig, TypeResolver } from 'kentico-cloud-delivery-typescript-sdk';
import localForage from "localforage";

// models
import { PortfolioItem } from './Models/PortfolioItem'
import { PortfolioItemFeature } from './Models/PortfolioItemFeature'
import { PortfolioItemTechnology } from './Models/PortfolioItemTechnology'
import { PortfolioItemDeviceSection } from './Models/PortfolioItemDeviceSection'
import { PortfolioItemDeviceSectionColumn } from './Models/PortfolioItemDeviceSectionColumn'
import { PortfolioItemService } from './Models/PortfolioItemService'
import { SkylineClient } from './Models/SkylineClient'
// import { PortfolioItem } from './Models/portfolio_item'
// import { PortfolioItemFeature } from './Models/portfolio_item_feature'
// import { PortfolioItemTechnology } from './Models/portfolio_item_technology'
// import { PortfolioItemDeviceSection } from './Models/portfolio_item_device_section'
// import { PortfolioItemDeviceSectionColumn } from './Models/portfolio_item_device_section_column'
// import { SkylineClient } from './Models/client';


const projectId = "85959714-35a9-4801-a0df-d6386e336d65";
const previewApiKey = "ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAidWlkIjogInVzcl8wdlF1emM0c1FPZ2FGaTExc0xYYW43IiwNCiAgImVtYWlsIjogImFsYXJzZW5Ac2t5bGluZXRlY2hub2xvZ2llcy5jb20iLA0KICAicHJvamVjdF9pZCI6ICI4NTk1OTcxNC0zNWE5LTQ4MDEtYTBkZi1kNjM4NmUzMzZkNjUiLA0KICAianRpIjogIk9udVV5am82Zlk1dGNuWnYiLA0KICAidmVyIjogIjEuMC4wIiwNCiAgImdpdmVuX25hbWUiOiAiQXhlbCIsDQogICJmYW1pbHlfbmFtZSI6ICJMYXJzZW4iLA0KICAiYXVkIjogInByZXZpZXcuZGVsaXZlci5rZW50aWNvY2xvdWQuY29tIg0KfQ.SDQWsk1fI67braexqlH1Hw5JQSsPj7RjgywS2OQPxhM";

// configure type resolvers
let typeResolvers = [
    new TypeResolver('portfolio_item', () => new PortfolioItem()),
    new TypeResolver('portfolio_item_feature', () => new PortfolioItemFeature()),
    new TypeResolver('portfolio_item_technology', () => new PortfolioItemTechnology()),
    new TypeResolver('portfolio_item_device_section', () => new PortfolioItemDeviceSection()),
    new TypeResolver('portfolio_item_device_section_column', () => new PortfolioItemDeviceSectionColumn()),
    new TypeResolver('portfolio_item_service', () => new PortfolioItemService()),
  new TypeResolver('client', ()=> new SkylineClient())
];

function isPreview() {
    var urlParams = new URLSearchParams(window.location.search);
    var previewMode = urlParams.get('preview_mode') == 1 || urlParams.get('preview_mode') == '' || urlParams.get('preview') == 1 || urlParams.get('preview') == ''; 

    return previewMode;
}

export default new DeliveryClient(
  new DeliveryClientConfig(projectId, typeResolvers,
    {
      enablePreviewMode: isPreview(),
      previewApiKey: previewApiKey
    }
  )
)