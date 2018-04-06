import React, { Component } from 'react';
import PortfolioItemStore from '../Stores/PortfolioItem';
import PortfolioFilter from '../Components/Filters/PortfolioFilter';
import Link from '../Components/LowerCaseUrlLink';
import dateFormat from 'dateformat';
import RichTextElement from '../Components/RichTextElement';

let portfolioItemCount = 10;
let bootstrapVersion = 3;

let getState = () => {
  return {
    portfolioItems: PortfolioItemStore.getItems(portfolioItemCount),
    filter: PortfolioItemStore.getFilter()
  };
};

let shorten = (str, maxLen, separator = ' ') => {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
};

class Portfolio extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PortfolioItemStore.addChangeListener(this.onChange);
    PortfolioItemStore.provideItems(portfolioItemCount);
  }

  componentWillUnmount() {
    PortfolioItemStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let formatDate = (value, format) => {
      if (!format) format = 'mmmm d';
      return dateFormat(value, format);
    };

    let counter = 0;
    let filter = (portfolioItem) => {
      return this.state.filter.matches(portfolioItem);
    };

    let portfolioItems = this.state.portfolioItems.filter(filter).reduce((result, portfolioItem, index) => {
      // if (index % 3 === 0) {
      //   result.push(
      //     <div className="w-100" key={counter++}></div>
      //   );
      // }

      let link = '/portfolio/' + portfolioItem.friendlyUrl.value;

      let title = portfolioItem.title.value;
      let imageUrl = (portfolioItem.thumbnailImage.value.length) ? portfolioItem.thumbnailImage.value[0].url : '';
      let imageDesc = (portfolioItem.thumbnailImage.value.length) ? portfolioItem.thumbnailImage.value[0].description : '';
      let launchDate = formatDate(portfolioItem.actualLaunchDate.value, 'mmmm yyyy');
      let description = {
        value: shorten(portfolioItem.description.value.replace(/(<([^>]+)>)/ig, ''), 97).concat('...')
      };
      let clientInfo = (portfolioItem.client.length) ? portfolioItem.client[0] : null;
      let clientIndustry = (clientInfo && clientInfo.industries.taxonomyTerms.length) ? clientInfo.industries.taxonomyTerms[0].name : '';
      let subtitle = portfolioItem.subtitle.value;
      let lengthOfEngagement = portfolioItem.lengthOfEngagement.value;
      let technologies = portfolioItem.technologies;

      result.push(
        <div className={bootstrapVersion == 4 ? 'col' : 'col-xs-12' + ' col-sm-6 col-md-4 col-lg-3'} key={counter++}>
          <div className="card card-portfolio-item h-100">
            <Link to={link}>
              <img alt={'PortfolioItem ' + title} className="portfolioItem-tile-image" src={imageUrl} title={'PortfolioItem ' + title} />
            </Link>
            <div className="card-body">
              <h2 className="h4">
                <Link to={link}>{title}</Link>
              </h2>
              <RichTextElement className={'portfolioItem-detail-content ' + ((description.value.length <= 3) ? 'd-none' : '')} element={description} />

            </div>
            <div className="card-footer portfolioItem-tile-features">
              {
                portfolioItem.features.map((feature, index) => {
                  if (feature) {
                    let featureImageUrl = (feature.icon.value.length) ? feature.icon.value[0].url : '';
                    let featureImageDesc = (feature.icon.value.length) ? feature.icon.value[0].description : '';
                    return (
                      <div className="align-middle text-center" key={index}>
                        <img alt={featureImageDesc} className="img-responsive icon mr-2" src={featureImageUrl} title={featureImageDesc} />
                        <span>{feature.caption.value}</span>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
      );

      return result;
    }, []);

    return (

      <div className="row bg-cube pt-5 pb-5">
        <div className={bootstrapVersion == 4 ? 'col-12' : 'col-xs-12'}>
          <div className="row portfolio-list align-items-stretch">
            {portfolioItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;